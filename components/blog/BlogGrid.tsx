import { FunctionComponent } from "react";

import BlogCard from "./BlogCard";
import { Article } from "../../services/blog";

interface BlogGridProps {
  readonly posts: Article[];
}

const BlogGrid: FunctionComponent<BlogGridProps> = function ({ posts = [] }) {
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {posts.map((post, index) => {
        return <BlogCard key={index} article={post} />;
      })}
    </div>
  );
};

export default BlogGrid;
