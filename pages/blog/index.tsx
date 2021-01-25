import { GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import AppLayout from "../../components/AppLayout";
import DocHead, { defaultDescription } from "../../components/DocHead";
import ArticleList from "../../components/blog/ArticleList";
import { Article, ArticleStatus, fetchArticles } from "../../services/blog";

interface BlogPageProps {
  readonly articles: Article[];
}

const BlogPage: FunctionComponent<BlogPageProps> = function ({ articles }) {
  return (
    <>
      <DocHead
        path="/blog"
        title="Blog"
        concatTitle={true}
        description={defaultDescription}
      />

      <AppLayout className="bg-primary-o2">
        <main className="flex-grow p-4">
          <ArticleList articles={articles} />
        </main>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  let articles = await fetchArticles();
  articles = articles.filter((a) => a.status == ArticleStatus.Final);
  return {
    props: {
      articles,
    },
  };
};

export default BlogPage;
