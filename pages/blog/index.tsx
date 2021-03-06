import { GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import AppLayout from "@components/AppLayout";
import DocHead, { defaultDescription } from "@components/DocHead";
import ArticleList from "@components/blog/ArticleList";
import { Article, blogConfig } from "@models/blog";
import { articleApi } from "@services/blog-api";
import Pagination from "@components/Pagination";

interface BlogIndexProps {
  readonly articles: Article[];
  readonly currentPage: number;
  readonly totalPages: number;
}

const BlogIndex: FunctionComponent<BlogIndexProps> = function (props) {
  const { articles, currentPage, totalPages } = props;
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
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </main>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const articlePage = await articleApi.getArticlePage(0);
  const totalPages = Math.ceil(
    articlePage.total / blogConfig.pagination.pageSize
  );

  return {
    props: {
      articles: articlePage.items,
      totalPages,
      currentPage: 0,
    },
  };
};

export default BlogIndex;
