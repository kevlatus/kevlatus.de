import Link from "next/link";
import { FunctionComponent } from "react";

import { BlogPost } from "../../services/blog";
import MetaInfo from "./MetaInfo";

interface BlogPostListItemProps {
  readonly post: BlogPost;
}

const BlogPostListItem: FunctionComponent<BlogPostListItemProps> = function ({
  post,
}) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <h3 className="text-accent text-lg">{post.title}</h3>
        <MetaInfo className="text-xs" post={post} />
        <div className="text-sm truncate">{post.content}</div>
      </a>
    </Link>
  );
};

interface BlogPostListProps {
  readonly posts: BlogPost[];
}

const BlogPostList: FunctionComponent<BlogPostListProps> = function ({
  posts,
}) {
  return (
    <div className="flex flex-col max-w-sm mx-auto space-y-8">
      {posts.map((post, index) => {
        return <BlogPostListItem key={index} post={post} />;
      })}
    </div>
  );
};

export default BlogPostList;
