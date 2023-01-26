import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import BlogCard from '@/components/BlogCard';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Footer from '@/components/Footer';
import { useState } from 'react';
import Header from '@/components/Header';
import TagBar from '@/components/TagBar';
import { bgColor } from '@/libs/color';
import { client } from 'src/libs/client';
import type { Blog, Tag } from 'src/types/blog';

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const all_blog = await client.get({ endpoint: 'blogs' });
  const tag = await client.get({ endpoint: 'tags' });

  function isDevBlog(content: any) {
    return content.is_dev;
  }
  let dev_blog: any;
  // 開発環境デモ用処理
  if (process.env.NEXT_PUBLIC_IS_DEV) {
    dev_blog = all_blog.contents.filter(isDevBlog);
  } else {
    dev_blog = all_blog.contents.filter(!isDevBlog);
  }

  return {
    props: {
      blogs: dev_blog,
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
  const [selectedBlog, setSelectedBlog] = useState<Blog[]>(blogs);
  return (
    <Box sx={{ backgroundColor: bgColor }}>
      <Header />
      <Grid container>
        <Grid item container lg={9} md={9} sm={9} xs={12}>
          <Grid item container sx={{ marginTop: 3, marginLeft: 3 }}>
            {/* 記事の一覧 */}
            <Grid container item rowSpacing={4} columnSpacing={{ xs: 4 }}>
              {selectedBlog.map((blog) => (
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
        <Grid item lg={3} md={3} sm={3} xs={12} sx={{ marginTop: 3 }}>
          <TagBar allTagList={allTagList} setSelectedBlog={setSelectedBlog} allBlogs={blogs} />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Home;
