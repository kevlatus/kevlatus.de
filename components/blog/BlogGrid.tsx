import { FunctionComponent } from "react";

import BlogCard from "./BlogCard";
import { BlogPost } from "../../services/blog";

interface BlogGridProps {
  readonly posts: BlogPost[];
}

const BlogGrid: FunctionComponent<BlogGridProps> = function ({ posts = [] }) {
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {posts.map((post, index) => {
        return <BlogCard key={index} post={post} />;
      })}
    </div>
  );
};

export default BlogGrid;
