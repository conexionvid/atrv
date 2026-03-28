import * as cheerio from 'cheerio';

async function test() {
  const res = await fetch('https://xeu.mx/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const articles = [];
  $('a').each((i, el) => {
    let title = $(el).text().replace(/\s+/g, ' ').trim();
    const link = $(el).attr('href');
    const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
    
    if (title && title.length > 20 && link && link.match(/[a-z-]+\/\d+\/[a-z0-9-]+/)) {
      // Remove category prefix if it exists (e.g., "Nacional Sheinbaum...")
      const parts = title.split(' ');
      if (parts.length > 3) {
        articles.push({ title, link, img });
      }
    }
  });
  console.log(articles.slice(0, 5));
}
test();
