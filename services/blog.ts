const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://kevlatus.de"
    : "http://localhost:3000";

function getURL(path: string): string {
  return new URL(path, baseURL).toString();
}

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
    content: await fetchBlogPostContent(getURL(def.content)),
  };
}

async function fetchBlogPostContent(path: string): Promise<string> {
  const response = await fetch(path);
  return await response.text();
}

async function fetchBlogPostList(): Promise<BlogPostList> {
  const response = await fetch(getURL("/assets/blog/articles.json"));
  return await response.json();
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
  for (const def of defs.posts) {
    ret.push(await fillContent(def));
  }
  return ret;
}
