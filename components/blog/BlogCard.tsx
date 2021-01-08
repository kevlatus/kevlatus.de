import Link from "next/link";
import { FunctionComponent } from "react";

import { BlogPost } from "../../services/blog";

interface BlogCardProps {
  readonly post: BlogPost;
}

const BlogCard: FunctionComponent<BlogCardProps> = function ({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="w-1/4 p-2 m-1 transition-transform transform shadow-md bg-primary text-text-primary rounded-sm cursor-pointer hover:shadow-xl hover:scale-105">
        <h3>{post.title}</h3>
      </article>
    </Link>
  );
};

export default BlogCard;
