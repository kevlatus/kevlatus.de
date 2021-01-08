import { promises as fs } from "fs";

interface BlogPostList {
  readonly posts: BlogPost[];
}

export interface BlogPost {
  readonly title: string;
  readonly content: string;
  readonly slug: string;
  readonly timestamp: string;
}

async function fillContent(def: BlogPost): Promise<BlogPost> {
  return {
    ...def,
    content: await fetchBlogPostContent(def.content),
  };
}

async function fetchBlogPostContent(path: string): Promise<string> {
  const content = await fs.readFile(`./public/${path}`);
  return content.toString();
}

async function fetchBlogPostList(): Promise<BlogPostList> {
  const content = await fs.readFile("./public/assets/blog/articles.json");
  return JSON.parse(content.toString());
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost> {
  const postList = await fetchBlogPostList();
  const matchingDef = postList.posts.find((d) => d.slug === slug);
  if (matchingDef == null) {
    return null;
  } else {
    return fillContent(matchingDef);
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const defs = await fetchBlogPostList();
  const ret: BlogPost[] = [];
  for (const post of defs.posts) {
    ret.push(await fillContent(post));
  }
  return ret;
}
