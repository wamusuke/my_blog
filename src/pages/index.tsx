import { Box } from '@mui/material';
import BlogCard from '@/components/BlogCard';
import Grid from '@mui/material/Grid';
import Footer from '@/components/Footer';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Header from '@/components/Header';
import PaginationControlled from '@/components/Pagination';
import Head from 'next/head';
import Script from 'next/script';
import TagBar from '@/components/TagBar';
import { useState } from 'react';
import { bgColor } from '@/libs/color';
import { client, getBlogs } from 'src/libs/client';
import type { Blog, Tag } from 'src/types/blog';

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const all_blog = await getBlogs(100, 'blogs', 'GET');
  const tag = await client.get({ endpoint: 'tags' });

  let dev_blog: any;

  // 本番環境用
  if (process.env.NODE_ENV == 'production') {
    dev_blog = all_blog.contents.filter((content: Blog) => !content.is_dev);
  }
  // 開発環境デモ用処理
  else {
    dev_blog = all_blog.contents.filter((content: Blog) => content.is_dev);
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
  // paginationのページ
  const [page, setPage] = useState<number>(1);
  const perPage = 9;

  console.log(selectedBlog.length);

  return (
    <>
      <Head>
        <title>{"waml's blog"}</title>
        <meta property='og:locale' content='ja_JP' />
        <meta
          name='description'
          content={
            'Atcoderや基本情報技術者試験，応用情報技術者試験，プログラミングなど技術的なブログです.自分が学んだことをアウトプットしていきます．'
          }
        />
        <meta property='og:title' content={"waml's blog"} />
        <meta property='og:url' content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`} />
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4715488375633917'
          crossOrigin='anonymous'
        ></script>
      </Head>
      <Box sx={{ backgroundColor: bgColor }}>
        <Header />
        <Grid container>
          <Grid item={true} container lg={9} md={9} sm={9} xs={12}>
            <Grid item={true} container sx={{ marginTop: 3, marginLeft: 3 }}>
              {/* 記事の一覧 */}
              {!selectedBlog.length && <p>現在記事作成中です...</p>}
              <Grid container item={true} rowSpacing={4} columnSpacing={{ xs: 4 }}>
                {selectedBlog
                  .slice(
                    (page - 1) * perPage,
                    Math.min((page - 1) * perPage + perPage, selectedBlog.length),
                  )
                  .map((blog) => (
                    <Grid item={true} lg={4} md={6} sm={8} xs={12} key={blog.id}>
                      <BlogCard key={blog.id} blog={blog} tags={blog.tags} />
                    </Grid>
                  ))}
              </Grid>
              <Grid item={true} xs={12} sx={{ marginTop: 10 }}>
                <PaginationControlled
                  page={page}
                  setPage={setPage}
                  totalItemSize={selectedBlog.length}
                  sizePerPage={perPage}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* サイドバー */}
          <Grid item={true} lg={3} md={3} sm={3} xs={12} sx={{ marginTop: 3 }}>
            <TagBar allTagList={allTagList} setSelectedBlog={setSelectedBlog} allBlogs={blogs} />
            {/* admax */}
            <div className="admax-ads" data-admax-id="a442ea427d72f6dc94824623fdc91c6e" style={{ display: 'inline-block', width: '160px', height: '600px' }}></div>
            <Script
              id="admax-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(admaxads = window.admaxads || []).push({admax_id: "a442ea427d72f6dc94824623fdc91c6e",type: "banner"});`,
              }}
            />
            <Script
              src="https://adm.shinobi.jp/st/t.js"
              strategy="afterInteractive"
              type="text/javascript"
              async
            />
            {/* admax */}
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
