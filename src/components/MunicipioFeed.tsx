import { Landmark } from 'lucide-react';

export default function MunicipioFeed() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-full pb-8 flex flex-col items-center transition-colors">
      <div className="bg-white dark:bg-gray-900 px-4 py-6 shadow-md shadow-gray-200 dark:shadow-gray-950 mb-6 sticky top-0 z-10 w-full flex justify-center border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-lg w-full flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3 text-green-700 dark:text-green-400 shadow-sm shadow-gray-300 dark:shadow-none shrink-0">
            <Landmark size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white leading-tight">Municipio de Atoyac</h2>
            <p className="text-sm text-gray-700 dark:text-gray-400 font-medium mt-1">Avisos y noticias oficiales</p>
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center px-4 mb-6">
        <div className="w-full max-w-[340px] bg-white dark:bg-gray-900 flex justify-center overflow-hidden rounded-2xl shadow-md shadow-gray-300 dark:shadow-none border border-gray-200 dark:border-gray-800">
          <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAtoyacMunicipio%2F&tabs=timeline&width=340&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
            width="100%" 
            height="700" 
            style={{ border: 'none', overflow: 'hidden', maxWidth: '340px' }} 
            scrolling="no" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook Municipio de Atoyac"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
