---
title: "PostgreSQL Indexing: A Practical Guide for Application Developers"
date: "2024-10-08"
excerpt: "Indexes are the most impactful performance tool in your database, and most developers use them wrong. Here's how to think about them correctly."
tags: ["PostgreSQL", "Database", "Performance", "Backend"]
published: true
---

Most application developers treat PostgreSQL indexes as an afterthought — something to add when a query gets slow. That's the wrong mental model. Understanding indexing upfront changes how you design your schema and write your queries.

## What an Index Actually Is

An index is a separate data structure (usually a B-tree) that PostgreSQL maintains alongside your table. When you query with a `WHERE` clause, PostgreSQL can either:

1. **Sequential scan** — read every row and check the condition
2. **Index scan** — jump directly to matching rows via the index

For a table with 1,000,000 rows, a sequential scan reads all 1,000,000 rows. An index scan on a selective column reads maybe 50.

The tradeoff: indexes cost space and slow down writes slightly because the index structure must be updated alongside the table.

## The Columns to Always Index

**Primary keys** are indexed automatically. **Unique constraints** create an index automatically. Beyond those, there are patterns worth knowing:

### Foreign keys

Prisma generates foreign keys but doesn't automatically index them. If you filter or join on a foreign key, index it:

```sql
-- Without this, deleting a user does a sequential scan of all sessions
CREATE INDEX idx_sessions_user_id ON "Session"("userId");
```

In Prisma schema, add `@@index([userId])` to do this declaratively.

### Columns in WHERE clauses

Any column you frequently filter on is a candidate:

```sql
-- You query this constantly
SELECT * FROM "Project" WHERE featured = true ORDER BY order ASC;

-- Index the filter column
CREATE INDEX idx_projects_featured ON "Project"(featured) WHERE featured = true;
```

The `WHERE featured = true` part creates a **partial index** — only indexed rows where the condition is true. For a boolean column where most rows are `false`, this is far smaller and faster than a full index.

### Columns in ORDER BY

Sorting without an index does a full scan plus an in-memory sort. If you always order by `createdAt DESC`:

```sql
CREATE INDEX idx_posts_created_at ON "BlogPost"("createdAt" DESC);
```

## Composite Indexes

When you filter on multiple columns together, a composite index is more efficient than separate single-column indexes:

```sql
-- Query: WHERE category = 'tools' AND published = true ORDER BY publishedAt DESC
CREATE INDEX idx_posts_category_published ON "BlogPost"(category, published, "publishedAt" DESC);
```

The column order matters. PostgreSQL can use this index for:
- `WHERE category = 'tools'`
- `WHERE category = 'tools' AND published = true`
- `WHERE category = 'tools' AND published = true ORDER BY publishedAt`

But NOT for:
- `WHERE published = true` (doesn't start from the left)

The leftmost prefix rule: a composite index is useful from left to right but can't skip columns.

## How to Know if Your Indexes Are Working

Use `EXPLAIN ANALYZE`:

```sql
EXPLAIN ANALYZE
SELECT * FROM "Project" WHERE featured = true ORDER BY "order" ASC;
```

Look for:
- `Index Scan` or `Bitmap Index Scan` — index is being used ✅
- `Seq Scan` — full table scan, possibly missing an index ⚠️
- `Sort` step — ordering not covered by index ⚠️

The `actual time` values show you where the time is actually spent.

## Prisma-Specific Patterns

In Prisma schema, declare indexes explicitly:

```prisma
model Project {
  id       String  @id @default(cuid())
  slug     String  @unique  // Creates index automatically
  featured Boolean @default(false)
  order    Int     @default(0)

  @@index([featured, order])  // Composite for featured list queries
}

model Message {
  id        String   @id @default(cuid())
  read      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([read, createdAt(sort: Desc)])  // For unread messages sorted by date
}
```

Running `prisma migrate dev` will create these in the database.

## When Indexes Hurt

Indexes aren't free:

- **Write-heavy tables** — every `INSERT`, `UPDATE`, and `DELETE` must update all indexes. A table with 10 indexes takes ~10x the write time.
- **Low-cardinality columns** — indexing a boolean column in a large table where 80% of rows have the same value is often worse than a sequential scan (use partial indexes instead).
- **Small tables** — PostgreSQL will choose a sequential scan for very small tables even if an index exists because the overhead isn't worth it.

## Connection Pooling

Unrelated to indexes but equally important: PostgreSQL has a hard limit on concurrent connections (typically 100). In a serverless environment like Vercel, every function invocation can open a new connection. Use PgBouncer or Prisma Accelerate to pool connections:

```
# .env
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=..."
```

Without this, you'll hit `too many connections` errors under load even with a perfectly indexed schema.

## The Practical Checklist

Before shipping a new feature with database queries:

- [ ] Every foreign key column has an index
- [ ] Columns in frequent `WHERE` clauses are indexed
- [ ] `EXPLAIN ANALYZE` on your slowest queries shows index scans
- [ ] Write-heavy tables don't have unnecessary indexes
- [ ] Connection pooling is configured for production
