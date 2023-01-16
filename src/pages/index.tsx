import type { InferGetStaticPropsType, NextPage } from 'next';
import { client } from 'src/libs/client';
import type { Blog, Tag } from 'src/types/blog';
import Header from '@/components/Header';

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blogs' });
  const tag = await client.get({ endpoint: 'tags' });

  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs, tags }: Props) => {
  console.log(blogs);
  console.log(tags);
  return <Header />;
};

export default Home;
