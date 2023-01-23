import type { InferGetStaticPropsType, NextPage } from 'next';
import { client } from 'src/libs/client';
import type { Blog } from 'src/types/blog';

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blogs' });

  return {
    props: {
      blogs: blog.contents
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
};

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs }: Props) => {
  return <>ブログの詳細だよん</>;
};

export default Blog;
