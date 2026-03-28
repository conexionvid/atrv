import { useState, useEffect } from 'react';
import { ExternalLink, Clock, RefreshCw } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  link: string;
  imageUrl: string;
  date?: string;
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      // Lista de proxies CORS gratuitos como respaldo
      const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent('https://xeu.mx/')}`,
        `https://api.codetabs.com/v1/proxy?quest=https://xeu.mx/`
      ];
      
      let html = '';
      let success = false;
      
      // Intentar con cada proxy hasta que uno funcione
      for (const proxyUrl of proxies) {
        try {
          const response = await fetch(proxyUrl);
          if (response.ok) {
            const text = await response.text();
            // Verificar que obtuvimos un HTML válido y no un mensaje de error del proxy
            if (text && text.toLowerCase().includes('<html')) {
              html = text;
              success = true;
              break;
            }
          }
        } catch (e) {
          console.warn(`Falló el proxy ${proxyUrl}:`, e);
        }
      }
      
      if (!success || !html) {
        throw new Error('No se pudo obtener el contenido de las noticias');
      }
      
      // Parsear el HTML directamente en el navegador
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      let parsedArticles: Article[] = [];
      const links = doc.querySelectorAll('a');
      
      links.forEach((el, i) => {
        let title = el.textContent?.replace(/\s+/g, ' ').trim() || '';
        const link = el.getAttribute('href') || '';
        const imgEl = el.querySelector('img');
        const img = imgEl?.getAttribute('src') || imgEl?.getAttribute('data-src') || '';
        
        if (title && title.length > 20 && link && link.match(/[a-z-]+\/\d+\/[a-z0-9-]+/)) {
          const categories = ['Nacional', 'Boca del Río', 'Veracruz', 'Internacional', 'Deportes', 'Policiaca', 'Espectáculos', 'Sociedad', 'Finanzas'];
          for (const cat of categories) {
            if (title.startsWith(cat + ' ')) {
              title = title.substring(cat.length + 1).trim();
              break;
            }
          }
          
          const fullLink = link.startsWith('http') ? link : `https://xeu.mx/${link.startsWith('/') ? link.slice(1) : link}`;
          
          if (!parsedArticles.find(n => n.link === fullLink)) {
            parsedArticles.push({
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
      
      setArticles(parsedArticles.slice(0, 20));
    } catch (err) {
      setError('No se pudieron cargar las noticias. Intenta de nuevo más tarde.');
      console.error('Error en fetchNews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-full pb-8 transition-colors">
      <div className="bg-white dark:bg-gray-900 px-4 py-6 shadow-md shadow-gray-200 dark:shadow-gray-950 mb-6 sticky top-0 z-10 flex justify-center border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-5xl w-full flex flex-col items-center relative">
          <h2 className="text-2xl font-bold text-black dark:text-white text-center">Últimas Noticias</h2>
          <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center mt-1 justify-center font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-sm shadow-gray-300 dark:shadow-none"></span>
            Actualizado desde XEU
          </p>
          <button 
            onClick={fetchNews} 
            disabled={loading}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 shadow-sm shadow-gray-300 dark:shadow-none"
          >
            <RefreshCw size={20} className={`text-black dark:text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {loading && articles.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-md shadow-gray-200 dark:shadow-none animate-pulse">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-300 dark:shadow-none max-w-md mx-auto mt-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4 shadow-sm shadow-gray-200 dark:shadow-none">
              <ExternalLink size={32} />
            </div>
            <p className="text-black dark:text-white font-medium">{error}</p>
            <button 
              onClick={fetchNews}
              className="mt-4 px-6 py-2 bg-orange-500 text-black rounded-full font-bold hover:bg-orange-600 transition-colors shadow-md shadow-gray-300 dark:shadow-none"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a 
                key={article.id} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md shadow-gray-200 dark:shadow-none hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-gray-800 transition-shadow h-full border border-gray-100 dark:border-gray-800"
              >
                {article.imageUrl && article.imageUrl !== "https://xeu.mx/images/logo.png" && (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 relative shrink-0">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-black dark:text-white leading-tight mb-2 line-clamp-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300 text-sm line-clamp-2 mb-4 flex-1">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-bold mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-orange-500 dark:text-orange-400" />
                      {article.date ? new Date(article.date).toLocaleDateString() : 'Reciente'}
                    </div>
                    <div className="flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                      Leer más <ExternalLink size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
            
            {articles.length === 0 && !loading && (
              <div className="col-span-full text-center p-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-2xl shadow-sm dark:shadow-none">
                No se encontraron noticias en este momento.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
