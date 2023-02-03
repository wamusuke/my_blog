import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { client } from '../libs/client';

type PostData = {
  id: string;
  updatedAt: string;
  is_dev: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await client.get({
    endpoint: 'blogs',
    queries: { fields: 'id,updatedAt,is_dev' },
  });
  const postsData = data.contents;

  // xmlの形式を作成する
  const fields: ISitemapField[] = [];
  // トップページ
  fields.push({
    loc: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    lastmod: format(new Date('2023-01-30T06:44:46.183Z'), 'yyyy-MM-dd'),
    priority: 0.7,
    changefreq: 'daily',
  });
  // プロフィールベージ
  fields.push({
    loc: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/profile`,
    lastmod: format(new Date('2023-01-30T06:44:46.183Z'), 'yyyy-MM-dd'),
    priority: 0.7,
    changefreq: 'daily',
  });
  // ブログページ
  postsData.forEach((data: PostData) => {
    // 本番用のデータのみ格納する
    if (!data.is_dev) {
      fields.push({
        loc: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blogs/${data.id}`,
        lastmod: format(new Date(data.updatedAt), 'yyyy-MM-dd'),
        priority: 1,
        changefreq: 'daily',
      });
    }
  });
  context.res.setHeader('Cache-Control', 'max-age=86400');
  console.log(context);
  return getServerSideSitemap(context, fields);
};

const Sitemap = () => null;
export default Sitemap;
