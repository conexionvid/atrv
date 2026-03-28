import express from "express";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";
import * as cheerio from "cheerio";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const parser = new Parser();

  app.get("/api/news", async (req, res) => {
    try {
      // Fallback: scrape homepage links
      const htmlResponse = await fetch("https://xeu.mx/");
      const html = await htmlResponse.text();
      const $ = cheerio.load(html);
      
      let articles: any[] = [];
      
      $('a').each((i, el) => {
        let title = $(el).text().replace(/\s+/g, ' ').trim();
        const link = $(el).attr('href');
        const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
        
        if (title && title.length > 20 && link && link.match(/[a-z-]+\/\d+\/[a-z0-9-]+/)) {
          // Clean up category prefix if present (e.g., "Nacional Sheinbaum...")
          const categories = ['Nacional', 'Boca del Río', 'Veracruz', 'Internacional', 'Deportes', 'Policiaca', 'Espectáculos', 'Sociedad', 'Finanzas'];
          for (const cat of categories) {
            if (title.startsWith(cat + ' ')) {
              title = title.substring(cat.length + 1).trim();
              break;
            }
          }
          
          const fullLink = link.startsWith('http') ? link : `https://xeu.mx/${link.startsWith('/') ? link.slice(1) : link}`;
          
          if (!articles.find(n => n.link === fullLink)) {
            articles.push({
              id: i.toString(),
              title,
              link: fullLink,
              summary: "Haz clic para leer más sobre esta noticia en XEU.",
              imageUrl: img && img.startsWith('http') ? img : "https://xeu.mx/images/logo.png",
              date: new Date().toISOString()
            });
          }
        }
      });
      
      res.json({ articles: articles.slice(0, 20) });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
