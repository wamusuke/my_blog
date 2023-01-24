import Grid from '@mui/material/Grid';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';
import TagBar from '@/components/TagBar';
import { client } from 'src/libs/client';
import type { Blog, Tag } from 'src/types/blog';

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
  const allTagList = Array.from(new Set(tags.map((tag) => tag.tag)));
  const [selectedTag, setSelectedTag] = useState<string[]>(allTagList);

  return (
    <>
      <Header />
      <Grid container>
        <Grid item container lg={9} md={9} sm={9} xs={12}>
          <Grid item container sx={{ marginTop: 3, marginLeft: 3 }}>
            {/* 記事の一覧 */}
            <Grid
              container
              item
              rowSpacing={4}
              columnSpacing={{ xs: 4 }}
              sx={{ justifyContent: 'center' }}
            >
              {blogs.map((blog) => (
                <Grid item lg={4} md={6} sm={8} xs={12} key={blog.id}>
                  <BlogCard key={blog.id} blog={blog} tags={blog.tags} />
                </Grid>
              ))}
            </Grid>
            {/* 記事とサイドバーの余白 */}
            <Grid item xs={0} sm={0.5} />
          </Grid>
        </Grid>
        {/* サイドバー */}
        <Grid item lg={3} md={3} sm={3} xs={12}>
          <TagBar
            allTagList={allTagList}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
