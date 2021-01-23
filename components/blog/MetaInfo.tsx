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

const MetaInfo: FunctionComponent<MetaInfoProps> = function ({
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

  const readingTime = computeReadingTime(article.content);

  return (
    <div
      className={className}
    >{`${day} ${month} ${year} | ~${readingTime} min read`}</div>
  );
};

export default MetaInfo;
