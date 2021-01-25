import { FunctionComponent } from "react";

import { Article } from "../../services/blog";

function computeReadingTime(text: string): number {
  text = text.replace(/[^a-zA-Z0-9.!?:;\-()\s]/g, "");
  const wordsPerMinute = 200;
  const textLength = text.split(" ").length;
  return textLength > 0 ? Math.ceil(textLength / wordsPerMinute) : 0;
}

interface MetaInfoProps {
  readonly className?: string;
  readonly article: Article;
}

export const ArticleReadingTime: FunctionComponent<MetaInfoProps> = function ({
  className,
  article,
}) {
  const readingTime = computeReadingTime(article.content);
  return <span className={className}>~{readingTime} min read</span>;
};

export const ArticleTimestamp: FunctionComponent<MetaInfoProps> = function ({
  className,
  article,
}) {
  const date = new Date(Date.parse(article.timestamp));
  const day = date.getDate().toString().padStart(2, "0");
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  const year = date.getFullYear();
  return (
    <span className={className}>
      {day} {month} {year}
    </span>
  );
};

const ArticleMetaInfo: FunctionComponent<MetaInfoProps> = function ({
  className,
  article,
}) {
  return (
    <div className={className}>
      <ArticleTimestamp article={article} />
      <span> | </span>
      <ArticleReadingTime article={article} />
    </div>
  );
};

export default ArticleMetaInfo;
