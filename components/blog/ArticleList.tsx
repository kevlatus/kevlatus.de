import Link from "next/link";
import { FunctionComponent } from "react";

import { Article } from "../../services/blog";
import MetaInfo from "./MetaInfo";

interface ArticleListItemProps {
  readonly article: Article;
}

const ArticleListItem: FunctionComponent<ArticleListItemProps> = function ({
  article,
}) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <a>
        <h3 className="type-display text-xl text-accent text-lg">
          {article.title}
        </h3>
        <MetaInfo className="text-xs" article={article} />
        <div className="text-sm truncate">{article.content}</div>
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
    <div className="flex flex-col p-1 max-w-md mx-auto space-y-8">
      {articles.map((article, index) => {
        return <ArticleListItem key={index} article={article} />;
      })}
    </div>
  );
};

export default ArticleList;
