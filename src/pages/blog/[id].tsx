import { ParsedUrlQuery } from 'node:querystring';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import Header from '@/components/Header';
import { displayTime } from '@/libs/display';
import { client } from 'src/libs/client';
import type { Blog } from 'src/types/blog';
import 'highlight.js/styles/hybrid.css';

interface Params extends ParsedUrlQuery {
  id: string;
}

// APIリクエストを行うパスを指定
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: 'blogs' });

  // 記事のpath一覧を取得
  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context: GetStaticPropsContext<Params, PreviewData>,
) => {
  const id = context.params?.id;
  const blog = await client.get({ endpoint: 'blogs', contentId: id });

  // シンタックスハイライト有効化する
  const $ = cheerio.load(blog.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blog: blog,
      highlightedBody: $.html(),
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blog: Blog;
  highlightedBody: string;
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  highlightedBody,
}: Props) => {
  return (
    <>
      <Header />
      <h1>{blog.title}</h1>
      <p>{displayTime(blog.publishedAt)}</p>
      {blog.tags.map((tag) => (
        <li key={tag.id}>#{tag.tag}</li>
      ))}
      <div
        dangerouslySetInnerHTML={{
          __html: highlightedBody,
        }}
      />
    </>
  );
};

export default Blog;
