import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import type { InferGetStaticPropsType, NextPage } from 'next';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';
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
  console.log(blogs);
  console.log(tags);
  return (
    <>
      <Header />
      <Grid container>
        <Container maxWidth={'lg'} sx={{marginTop: 2}}>
          <Grid item container>
            {/* 記事の一覧 */}
            <Grid container item rowSpacing={2} columnSpacing={{ xs: 1 }}>
              <Grid item lg={4} md={6} xs={12}>
                <BlogCard />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <BlogCard />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <BlogCard />
              </Grid>
            </Grid>
            {/* 記事とサイドバーの余白 */}
            <Grid item xs={0} sm={0.5} />
          </Grid>
        </Container>
        {/* サイドバー */}
        <Grid item md={2}>
          Sidebar
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
