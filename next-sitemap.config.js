/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com',
  exclude: ['/api', '/404', '/fr/404'],
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  changefreq: 'monthly',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        userAgent: '*',
        disallow: ['/api', '/404', '/fr/404']
      }
    ]
  },
  transform: async (config, path) => {
    // Since you removed next-translate-routes, 
    // just return the path as loc without translation
    return {
      loc: path, // simply use the path as-is
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    };
  }
};
