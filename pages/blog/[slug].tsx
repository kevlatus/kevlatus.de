import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { FunctionComponent } from "react";

import {
  BlogPost,
  fetchBlogPostBySlug,
  fetchBlogPosts,
} from "../../services/blog";
import DocHead from "../../components/DocHead";
import AppLayout from "../../components/AppLayout";
import Markdown from "../../components/Markdown";
import MetaInfo from "../../components/blog/MetaInfo";

import styles from "../../styles/BlogPostPage.module.css";

interface BlogPostPageProps {
  readonly post: BlogPost;
}

const BlogPostPage: FunctionComponent<BlogPostPageProps> = function ({ post }) {
  const contentClass = classNames(
    "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto",
    styles.article
  );
  return (
    <>
      <DocHead path={`/blog/${post.slug}`} />

      <AppLayout>
        <main className="flex-grow px-2 py-4">
          <article className={contentClass}>
            <h2 className={styles.heading}>{post.title}</h2>
            <MetaInfo post={post} className={styles.meta} />
            <Markdown className={contentClass} markdown={post.content} />
          </article>
        </main>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (
  ctx
) => {
  const slug = ctx.params.slug as string;
  return {
    props: {
      post: await fetchBlogPostBySlug(slug),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchBlogPosts();
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogPostPage;
