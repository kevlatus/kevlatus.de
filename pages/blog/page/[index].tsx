import { GetStaticPaths, GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import AppLayout from "@components/AppLayout";
import DocHead, { defaultDescription } from "@components/DocHead";
import ArticleList from "@components/blog/ArticleList";
import { Article, blogConfig } from "@models/blog";
import { articleApi } from "@services/blog-api";
import Pagination from "@components/Pagination";

interface BlogIndexPageProps {
  readonly articles: Article[];
  readonly currentPage: number;
  readonly totalPages: number;
}

const BlogIndexPage: FunctionComponent<BlogIndexPageProps> = function (props) {
  const { articles, currentPage, totalPages } = props;
  return (
    <>
      <DocHead
        path={"/blog/page/" + currentPage}
        title={"Blog - Page " + (currentPage + 1)}
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

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async ({
  params,
}) => {
  const currentPage = parseInt(params.index as string, 10);
  const articlePage = await articleApi.getArticlePage(currentPage);
  const totalPages = Math.ceil(
    articlePage.total / blogConfig.pagination.pageSize
  );

  return {
    props: {
      articles: articlePage.items,
      totalPages,
      currentPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await articleApi.getTotalPostCount();
  const totalPages = Math.ceil(totalPosts / blogConfig.pagination.pageSize);

  const paths = [];

  /**
   * Start from page 2, so we don't replicate /blog, which is page 1.
   */
  for (let page = 1; page < totalPages; page++) {
    paths.push({ params: { index: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export default BlogIndexPage;
