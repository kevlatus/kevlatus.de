import { promises as fs } from "fs";

interface ArticleList {
  readonly articles: Article[];
}

export interface Article {
  readonly title: string;
  readonly content: string;
  readonly slug: string;
  readonly timestamp: string;
}

async function fillContent(def: Article): Promise<Article> {
  return {
    ...def,
    content: await fetchArticleContent(def.content),
  };
}

async function fetchArticleContent(path: string): Promise<string> {
  const content = await fs.readFile(`${path}`);
  return content.toString();
}

async function fetchArticleList(): Promise<ArticleList> {
  const content = await fs.readFile("./public/assets/blog/articles.json");
  return JSON.parse(content.toString());
}

function sortArticles(articles: Article[]): Article[] {
  function compare(a: Article, b: Article): number {
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    return 0;
  }

  return [...articles].sort(compare);
}

export async function fetchArticlesBySlug(slug: string): Promise<Article> {
  const articleList = await fetchArticleList();
  const matchingDef = articleList.articles.find((d) => d.slug === slug);
  if (matchingDef == null) {
    return null;
  } else {
    return fillContent(matchingDef);
  }
}

export async function fetchArticles(): Promise<Article[]> {
  const defs = await fetchArticleList();
  const ret: Article[] = [];
  for (const article of defs.articles) {
    ret.push(await fillContent(article));
  }

  return sortArticles(ret);
}
