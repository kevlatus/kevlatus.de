import { GetStaticProps } from "next";
import React, { FunctionComponent } from "react";

import AppLayout from "../../components/AppLayout";
import DocHead from "../../components/DocHead";
import BlogPostList from "../../components/blog/BlogPostList";
import { BlogPost, fetchBlogPosts } from "../../services/blog";

interface BlogPageProps {
  readonly posts: BlogPost[];
}

const BlogPage: FunctionComponent<BlogPageProps> = function ({ posts }) {
  return (
    <>
      <DocHead path="/blog" />

      <AppLayout className="bg-primary-o2">
        <main className="flex-grow p-4">
          <BlogPostList posts={posts} />
        </main>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  return {
    props: {
      posts: await fetchBlogPosts(),
    },
  };
};

export default BlogPage;
