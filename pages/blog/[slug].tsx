import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { FunctionComponent } from "react";

import AppLayout from "@components/AppLayout";
import DocHead, { buildPageUrl, PageType } from "@components/DocHead";
import Markdown from "@components/Markdown";
import JoinDiscussionButton from "@components/blog/JoinDiscussionButton";
import ArticleMetaInfo from "@components/blog/MetaInfo";
import SaveToPocket from "@components/blog/SaveToPocket";
import { Article } from "@models/blog";
import { articleApi } from "@services/blog-api";

import styles from "../../styles/ArticlePage.module.css";

interface ArticlePageProps {
  readonly article: Article;
}

const ArticlePage: FunctionComponent<ArticlePageProps> = function ({
  article,
}) {
  const contentClass = classNames(
    "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto",
    styles.article
  );
  const path = `/blog/${article.slug}`;

  return (
    <>
      <DocHead
        path={path}
        title={article.title}
        description={article.description}
        pageType={PageType.Article}
      />

      <AppLayout>
        <main className="flex-grow px-2 py-4">
          <article className={contentClass}>
            <h2 className={styles.heading}>{article.title}</h2>
            <div className="flex">
              <ArticleMetaInfo article={article} className="text-xs" />
              <div className="flex-grow" />
              <SaveToPocket
                className="text-xs"
                articleUrl={`https://www.kevlatus.de/blog/${article.slug}`}
              />
            </div>
            <Markdown className={contentClass} markdown={article.content} />

            <div className="flex">
              <div className="flex-grow" />
              <JoinDiscussionButton url={buildPageUrl(path)} />
              <div className="flex-grow" />
            </div>
          </article>
        </main>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (ctx) => {
  const slug = ctx.params.slug as string;
  return {
    props: {
      article: await articleApi.getArticleBySlug(slug),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await articleApi.getSlugs();
  const paths = slugs.map((it) => ({ params: { slug: it } }));
  return {
    paths,
    fallback: false,
  };
};

export default ArticlePage;
