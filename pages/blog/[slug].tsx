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

import styles from "../../styles/BlogPostPage.module.css";

function getReadingTime(text: string): number {
  text = text.replace(/[^a-zA-Z0-9.!?:;\-()\s]/g, "");
  const wordsPerMinute = 200;
  const textLength = text.split(" ").length;
  return textLength > 0 ? Math.ceil(textLength / wordsPerMinute) : 0;
}

function MetaInfo(props: { post: BlogPost }) {
  const date = new Date(Date.parse(props.post.timestamp));
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

  const readingTime = getReadingTime(props.post.content);

  return (
    <div
      className={styles.meta}
    >{`${day} ${month} ${year} | ~${readingTime} min read`}</div>
  );
}

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
      <DocHead />

      <AppLayout>
        <main className="flex-grow px-2 py-4">
          <article className={contentClass}>
            <h1 className={styles.h1}>{post.title}</h1>
            <MetaInfo post={post} />
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
