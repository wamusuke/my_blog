import Head from 'next/head';
import type { Blog } from 'src/types/blog';

export type CustomHeadProps = {
  blog: Blog;
}

const CustomHead = ({ blog }: CustomHeadProps) => {
  return (
    <Head>
      <title>{blog.title}</title>
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:title" content={blog.title} />
      <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/${blog.id}`} />
      <meta name="description" content={`${blog.title}の記事です。`} />
      <meta property="og:description" content={`${blog.title}の記事です。`} />
      <meta property="og:image" content={blog.thumbnail} />
    </Head>
  )
}

export default CustomHead;