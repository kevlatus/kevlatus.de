import { GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import AppLayout from "../../components/AppLayout";
import DocHead from "../../components/DocHead";
import ArticleList from "../../components/blog/ArticleList";
import { Article, fetchArticles } from "../../services/blog";

interface BlogPageProps {
  readonly articles: Article[];
}

const BlogPage: FunctionComponent<BlogPageProps> = function ({ articles }) {
  return (
    <>
      <DocHead path="/blog" />

      <AppLayout className="bg-primary-o2">
        <main className="flex-grow p-4">
          <ArticleList articles={articles} />
        </main>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  return {
    props: {
      articles: await fetchArticles(),
    },
  };
};

export default BlogPage;
