---
title: "Building a Type-Safe REST API with NestJS and Prisma"
date: "2024-11-20"
excerpt: "A practical walkthrough of structuring a NestJS backend with Prisma ORM — from schema design to request validation and error handling."
tags: ["NestJS", "Prisma", "Node.js", "TypeScript", "Backend"]
published: true
---

NestJS and Prisma are a natural pair. NestJS gives you opinionated structure and dependency injection; Prisma gives you a type-safe database layer that generates its own types from your schema. Together, they eliminate a huge amount of boilerplate while keeping everything typed end-to-end.

Here's how I structure a production-ready REST API with this stack.

## Schema First

Everything starts with `schema.prisma`. Design the data model before writing any application code:

```prisma
model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  techStack   String[]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Running `prisma generate` produces a fully-typed client. Every query, every result, every relation — all typed without writing a single interface.

## Module Structure

Each resource gets its own module:

```
src/
  projects/
    projects.module.ts
    projects.controller.ts
    projects.service.ts
    dto/
      create-project.dto.ts
      update-project.dto.ts
```

This is NestJS's standard structure and it scales well. Don't get clever with it.

## DTOs with class-validator

Data Transfer Objects validate incoming requests. Use `class-validator` decorators:

```ts
import { IsString, IsOptional, IsBoolean, IsArray, IsUrl, MinLength, MaxLength } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
```

Wire the `ValidationPipe` globally in `main.ts`:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,        // Strip unknown properties
    forbidNonWhitelisted: true, // Error on unknown properties
    transform: true,        // Auto-transform payloads to DTO classes
  }),
);
```

Now invalid requests are rejected before they touch your service layer.

## The Service Layer

Keep all Prisma queries in the service. The controller should do nothing but call the service and return the result:

```ts
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll(featured?: boolean) {
    return this.prisma.project.findMany({
      where: featured !== undefined ? { featured } : undefined,
      orderBy: { order: "asc" },
    });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({ where: { slug } });
    if (!project) throw new NotFoundException(`Project '${slug}' not found`);
    return project;
  }

  create(dto: CreateProjectDto) {
    const slug = dto.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    return this.prisma.project.create({
      data: { ...dto, slug },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findById(id); // Throws 404 if not found
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
```

## PrismaService

Create a singleton service that extends `PrismaClient`:

```ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

Register it in a shared `PrismaModule` with `global: true` so you don't have to import it everywhere:

```ts
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

## Error Handling

NestJS has built-in HTTP exceptions, but Prisma errors need translation. Use a global exception filter:

```ts
@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case "P2002":
        response.status(409).json({ message: "Resource already exists", field: exception.meta?.target });
        break;
      case "P2025":
        response.status(404).json({ message: "Record not found" });
        break;
      default:
        response.status(500).json({ message: "Database error" });
    }
  }
}
```

## Guards for Protected Endpoints

For admin routes, use a guard that checks `better-auth` session tokens:

```ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !!request.user; // Set by auth middleware
  }
}

// In the controller:
@UseGuards(AuthGuard)
@Post()
create(@Body() dto: CreateProjectDto) {
  return this.projectsService.create(dto);
}
```

## A Note on Performance

Two things that bite most NestJS + Prisma APIs in production:

**Select only what you need.** The generated client types make it tempting to fetch everything. Use `select` to cut down payload size and query time.

**Use transactions for multi-step writes.** Never do two Prisma writes in sequence without a transaction if both need to succeed together:

```ts
await this.prisma.$transaction([
  this.prisma.project.create({ data: projectData }),
  this.prisma.auditLog.create({ data: { action: "CREATE_PROJECT", ... } }),
]);
```

## Wrapping Up

NestJS's module system forces you into patterns that scale. Prisma eliminates the raw SQL and the manual typing. The combination lets you focus on domain logic rather than infrastructure — which is where the real work should be.
