import { ParsedUrlQuery } from 'node:querystring';
import BreadCrumb from '@/components/BreadCrumb';
import CopyClipboardButton from '@/components/CopyClipboardButton';
import CustomHead from '@/components/CustomHead';
import Footer from '@/components/Footer';
import CachedIcon from '@mui/icons-material/Cached';
import Header from '@/components/Header';
import CreateIcon from '@mui/icons-material/Create';
import MyProfileCard from '@/components/MyProfileCard';
import { Grid, Box, Paper, Typography } from '@mui/material';
import SnsShareButtons from '@/components/SnsShareButtons';
import cheerio from 'cheerio';
import TableOfContents from '@/components/TableOfContents';
import hljs from 'highlight.js';
import { bgColor } from '@/libs/color';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
  GetStaticPropsContext,
  PreviewData,
} from 'next';
import { displayTime } from '@/libs/display';
import { client, getBlogs } from 'src/libs/client';
import type { Blog, content } from 'src/types/blog';
import 'highlight.js/styles/hybrid.css';

interface Params extends ParsedUrlQuery {
  id: string;
}

// APIリクエストを行うパスを指定
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getBlogs(100, 'blogs', 'GET');

  let dev_data: any;
  // 本番環境用
  if (process.env.NODE_ENV == 'production') {
    dev_data = data.contents.filter((content: Blog) => !content.is_dev);
  }
  // 開発環境用
  else {
    dev_data = data.contents.filter((content: Blog) => content.is_dev);
  }

  // 記事のpath一覧を取得
  const paths = dev_data.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context: GetStaticPropsContext<Params, PreviewData>,
) => {
  const id = context.params?.id;
  const blog = await client.get({ endpoint: 'blogs', contentId: id });

  // custom Contentの文字列を全て結合
  let all_content: string = '';

  blog.content.map((content: content) => {
    all_content += content.richEditor;
    all_content += content.html;
  });

  // microcmsの画像データのサイズをレスポンシブ対応
  // サイズを80%にする
  const resizeImgblog = all_content.replace(
    /"(https?:\/\/images\.microcms-assets\.io\/assets\/.+?\.(jpe?g|gif|png))(.+?alt=")(.*?)"/g,
    '"$1" width="80%" height="80%" alt="$4"',
  );

  // h1タグのスタイル変更
  const header1StyleBlog = resizeImgblog.replace(
    /(<h1 id=".*?")(>)/g,
    '$1 style="border-top: solid 4px #918C9C; border-bottom:solid 4px #918C9C;" $2',
  );

  // h2タグのスタイル変更
  const header2StyleBlog = header1StyleBlog.replace(
    /(<h2 id=".*?")(>)/g,
    '$1 style="border-left: solid 5px #CAE8CE; border-bottom:solid 3px #CAE8CE; padding-left: 10px" $2',
  );

  // シンタックスハイライト有効化する
  const $ = cheerio.load(header2StyleBlog);
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
      <CustomHead blog={blog} />
      <Header />
      <Grid container>
        {/* 左側 */}
        <Grid item={true} lg={9} md={9} sm={11} xs={11} sx={{ marginTop: 3 }}>
          <Box sx={{ padding: 1 }}>
            <BreadCrumb overview={blog.overview} />
          </Box>
          <Grid item={true} xs={12}>
            <center>
              <img
                src={`/images/thumbnails/${blog.thumbnail}`}
                alt={`${blog.thumbnail}`}
                width={'80%'}
                height={'80%'}
              />
            </center>
          </Grid>
          <Grid item={true} xs={10} sx={{ margin: 'auto' }}>
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
              <CreateIcon sx={{ margin: 0.7 }} />
              <Box sx={{ margin: 0.7, fontFamily: 'Kiwi Maru' }}>{displayTime(blog.createdAt)}</Box>
              <CachedIcon sx={{ margin: 0.7 }} />
              <Box sx={{ margin: 0.7, fontFamily: 'Kiwi Maru' }}>{displayTime(blog.updatedAt)}</Box>
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
        <Grid item={true} lg={3} md={3} sm={12} xs={12} sx={{ backgroundColor: bgColor }}>
          {/* 広告と関連記事入れる */}
          <Box sx={{ position: 'sticky', top: '0%' }}>
            <MyProfileCard />
          </Box>
          <Box sx={{ position: 'sticky', top: '40%' }}>
            <TableOfContents />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SnsShareButtons />
        <CopyClipboardButton />
      </Box>
      <Footer />
    </>
  );
};

export default Blog;
