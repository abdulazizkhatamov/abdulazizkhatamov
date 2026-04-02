import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published?: boolean;
};

export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date;
};

export type PostFull = PostPreview & {
  content: string; // rendered HTML
  readingTime: number; // minutes
};

function slugsFromDisk(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostPreview[] {
  return slugsFromDisk()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      const fm = data as PostFrontmatter;
      if (fm.published === false) return null;
      return {
        slug,
        title: fm.title,
        date: fm.date,
        excerpt: fm.excerpt,
        tags: fm.tags ?? [],
        publishedAt: new Date(fm.date),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b!.publishedAt.getTime() - a!.publishedAt.getTime()) as PostPreview[];
}

export function getAllSlugs(): string[] {
  return slugsFromDisk().filter((slug) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
    const { data } = matter(raw);
    return (data as PostFrontmatter).published !== false;
  });
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (fm.published === false) return null;

  // Dynamic imports — all ESM packages
  const { unified } = await import("unified");
  const { default: remarkParse } = await import("remark-parse");
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: remarkRehype } = await import("remark-rehype");
  const { default: rehypeSlug } = await import("rehype-slug");
  const { default: rehypeHighlight } = await import("rehype-highlight");
  const { default: rehypeStringify } = await import("rehype-stringify");

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const wordCount = content.split(/\s+/).length;

  return {
    slug,
    title: fm.title,
    date: fm.date,
    excerpt: fm.excerpt,
    tags: fm.tags ?? [],
    publishedAt: new Date(fm.date),
    content: String(result),
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
  };
}
