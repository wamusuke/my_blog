import { ParsedUrlQuery } from 'node:querystring';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import { client } from 'src/libs/client';
import type { Blog } from 'src/types/blog';

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
  const data = await client.get({ endpoint: 'blogs', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blog: Blog;
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blog }: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      {blog.tags.map((tag) => (
        <li key={tag.id}>#{tag.tag}</li>
      ))}
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
    </main>
  );
};

export default Blog;
