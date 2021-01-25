import Link from "next/link";
import { FunctionComponent } from "react";

import { Article } from "../../services/blog";
import { ArticleReadingTime, ArticleTimestamp } from "./MetaInfo";

interface ArticleListItemProps {
  readonly article: Article;
}

const ArticleListItem: FunctionComponent<ArticleListItemProps> = function ({
  article,
}) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <a className="shadow-md p-2 rounded bg-background transition-all transform hover:scale-105 hover:shadow-xl">
        <h3 className="type-display text-xl text-primary">{article.title}</h3>
        <div className="text-sm truncate">{article.content}</div>
        <div className="flex pt-3 text-xs">
          <ArticleReadingTime article={article} />
          <div className="flex-grow" />
          <ArticleTimestamp article={article} />
        </div>
      </a>
    </Link>
  );
};

interface ArticleListProps {
  readonly articles: Article[];
}

const ArticleList: FunctionComponent<ArticleListProps> = function ({
  articles,
}) {
  return (
    <div className="flex flex-col p-1 max-w-md mx-auto space-y-4">
      {articles.map((article, index) => {
        return <ArticleListItem key={index} article={article} />;
      })}
    </div>
  );
};

export default ArticleList;
