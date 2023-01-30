import { ParsedUrlQuery } from 'node:querystring';
import CopyClipboardButton from '@/components/CopyClipboardButton';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Footer from '@/components/Footer';
import { Grid, Box, Paper, Typography } from '@mui/material';
import Header from '@/components/Header';
import cheerio from 'cheerio';
import SnsShareButtons from '@/components/SnsShareButtons';
import hljs from 'highlight.js';
import TableOfContents from '@/components/TableOfContents';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import { bgColor } from '@/libs/color';
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
      <Grid container>
        {/* 左側 */}
        <Grid item lg={2} md={2} sm={2} xs={2} sx={{ backgroundColor: bgColor }}>
          {/* SNSシェアボタン追従 */}
          <Box sx={{ position: 'sticky', top: '20%' }}>
            <center>
              <SnsShareButtons />
              <CopyClipboardButton />
            </center>
          </Box>
        </Grid>
        {/* 中央 */}
        <Grid item lg={8} md={8} sm={10} xs={10}>
          <Grid xs={12}>
            <center>
              <img src={`/images/thumbnails/${blog.thumbnail}`} alt={`${blog.thumbnail}`} width={'80%'} height={'80%'} />
            </center>
          </Grid>
          <Grid xs={10} sx={{ margin: 'auto' }}>
            <Typography sx={{ fontFamily: 'Kiwi Maru' }}>
              <h1>{blog.title}</h1>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                height: 70,
                borderRadius: 1,
              }}
            >
              {blog.tags.map((tag) => (
                <Paper key={tag.tag} sx={{ margin: 1, padding: 1, fontFamily: 'Kiwi Maru' }}>
                  # {tag.tag}
                </Paper>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#7C7D7F' }}>
              <AccessTimeOutlinedIcon sx={{ margin: 0.5 }} />
              <Box sx={{ margin: 0.5, fontFamily: 'Kiwi Maru' }}>{displayTime(blog.createdAt)}</Box>
            </Box>
            {/* Microcmsからブログ記事を受け取る */}
            <div
              dangerouslySetInnerHTML={{
                __html: highlightedBody,
              }}
              className={'article'}
              style={{ fontFamily: 'Kiwi Maru' }}
            />
          </Grid>
        </Grid>
        {/* 右側 */}
        <Grid item lg={2} md={2} sm={12} xs={12} sx={{ backgroundColor: bgColor }}>
          {/* 広告と関連記事入れる */}
          <Box sx={{ position: 'sticky', top: '10%' }}>
            <TableOfContents />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Blog;
