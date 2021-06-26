import classNames from "classnames";
import Link from "next/link";
import { FunctionComponent } from "react";

interface PaginationProps {
  readonly className?: string;
  readonly totalPages: number;
  readonly currentPage: number;
}

const Pagination: FunctionComponent<PaginationProps> = function (props) {
  const { className, totalPages, currentPage } = props;
  const rootClass = classNames("", className);

  if (totalPages === 1) {
    return null;
  }

  const prevPageUrl =
    currentPage === 1 ? "/blog" : `/blog/page/${currentPage - 1}`;

  const nextPageUrl = `/blog/page/${currentPage + 1}`;

  return (
    <>
      <Link href={prevPageUrl}>
        <a>Previous page</a>
      </Link>

      <span>
        Page {currentPage + 1} of {totalPages}
      </span>

      <Link href={nextPageUrl}>
        <a>Next page</a>
      </Link>
    </>
  );
};

export default Pagination;
