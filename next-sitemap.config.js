/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://olegario.dev',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
