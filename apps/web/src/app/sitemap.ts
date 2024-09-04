/*
 * Go to https://github.com/leerob/leerob.io/blob/main/app/sitemap.ts to see details
 */

export default async function sitemap() {

  let routes = ['', '/resume', '/portfolio', '/blog', '/contact'].map((route) => ({
    url: `https://1chooo.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
