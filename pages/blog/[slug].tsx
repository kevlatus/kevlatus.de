import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { FunctionComponent } from "react";

import {
  Article,
  fetchArticles,
  fetchArticlesBySlug,
} from "../../services/blog";
import DocHead, { PageType } from "../../components/DocHead";
import AppLayout from "../../components/AppLayout";
import Markdown from "../../components/Markdown";
import ArticleMetaInfo from "../../components/blog/MetaInfo";

import styles from "../../styles/ArticlePage.module.css";
import SaveToPocket from "../../components/blog/SaveToPocket";

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
  return (
    <>
      <DocHead
        path={`/blog/${article.slug}`}
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
      article: await fetchArticlesBySlug(slug),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchArticles();
  const paths = articles.map((p) => ({ params: { slug: p.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default ArticlePage;
