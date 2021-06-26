import { blogConfig, Article } from "@models/blog";

export interface IArticleApi {
  getTotalPostCount(): Promise<number>;

  getArticlePage(page: number): Promise<{ total: number; items: Article[] }>;

  getSlugs(): Promise<string[]>;

  getArticleBySlug(slug: string): Promise<Article>;
}

class ContentfulArticleApi implements IArticleApi {
  private static async callContentful(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      return await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json()
      );
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  public async getTotalPostCount(): Promise<number> {
    const query = `
      {
        articleCollection {
          total
        }
      }
    `;

    const response = await ContentfulArticleApi.callContentful(query);
    return response.data.articleCollection.total
      ? response.data.articleCollection.total
      : 0;
  }

  public async getArticlePage(page: number) {
    const skipMultiplier = page === 0 ? 0 : page;
    const skip =
      skipMultiplier > 0 ? blogConfig.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        articleCollection(limit: ${blogConfig.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            content
            tags
          }
        }
      }`;

    const response = await ContentfulArticleApi.callContentful(query);
    return response.data.articleCollection
      ? response.data.articleCollection
      : { total: 0, items: [] };
  }

  public async getSlugs(): Promise<string[]> {
    const query = `{
        articleCollection(order: date_DESC) {
          items {
            slug
          }
        }
      }`;

    const response = await ContentfulArticleApi.callContentful(query);
    return response.data.articleCollection
      ? response.data.articleCollection.items.map((it) => it.slug)
      : [];
  }

  public async getArticleBySlug(slug: string): Promise<Article> {
    const query = `{
        articleCollection(where: {
          slug: "${slug}" 
        }) {
          items {
            sys {
              id
            }
            date
            title
            slug
            content
            tags
          }
        }
      }`;

    const response = await ContentfulArticleApi.callContentful(query);
    return response.data.articleCollection
      ? response.data.articleCollection.items[0]
      : [];
  }
}

export const articleApi: IArticleApi = new ContentfulArticleApi();
