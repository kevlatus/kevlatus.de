export interface Article {
  readonly title: string;
  readonly description: string;
  readonly slug: string;
  readonly content: string;
  readonly date: string;
  readonly tags: string[];
}

export const blogConfig = {
  pagination: {
    pageSize: 10,
  },
};
