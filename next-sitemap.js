/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './public',
};
