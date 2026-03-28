import { Youtube, Facebook, Music2, Users, MessageCircle } from 'lucide-react';

export default function SocialHub() {
  const socialLinks = [
    {
      id: 'whatsapp',
      title: 'WhatsApp (Publicidad)',
      description: 'Audio Publicidad Comercial Atoyac Radio Veracruz',
      icon: <MessageCircle size={32} className="text-green-600" />,
      url: 'https://wa.me/522731235643?text=Hola,%20me%20interesa%20información%20sobre%20Audio%20Publicidad%20Comercial%20en%20Atoyac%20Radio%20Veracruz',
      color: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border-green-200 dark:border-green-900/50',
      textColor: 'text-green-900 dark:text-green-400'
    },
    {
      id: 'youtube',
      title: 'YouTube',
      description: 'Videos, entrevistas y programas en vivo',
      icon: <Youtube size={32} className="text-red-600" />,
      url: 'https://www.youtube.com/@atoyacradioveracruz/featured',
      color: 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border-red-200 dark:border-red-900/50',
      textColor: 'text-red-900 dark:text-red-400'
    },
    {
      id: 'facebook',
      title: 'Página de Facebook',
      description: 'Síguenos para las últimas novedades',
      icon: <Facebook size={32} className="text-blue-600" />,
      url: 'https://www.facebook.com/p/Atoyac-Radio-Veracruz-100063440811923/?locale=es_LA',
      color: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-900/50',
      textColor: 'text-blue-900 dark:text-blue-400'
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      description: 'Contenido corto y divertido',
      icon: <Music2 size={32} className="text-black dark:text-white" />,
      url: 'https://www.tiktok.com/@atoyacradioveracruz2',
      color: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700',
      textColor: 'text-black dark:text-white'
    },
    {
      id: 'fb-group',
      title: 'Grupo de Facebook',
      description: 'Únete a la comunidad y participa',
      icon: <Users size={32} className="text-indigo-600" />,
      url: 'https://www.facebook.com/groups/723883178113987/',
      color: 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border-indigo-200 dark:border-indigo-900/50',
      textColor: 'text-indigo-900 dark:text-indigo-400'
    }
  ];

  return (
    <div className="p-4 pb-8 max-w-5xl mx-auto w-full transition-colors">
      <div className="mb-8 mt-4 text-center">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">Comunidad</h2>
        <p className="text-gray-800 dark:text-gray-300 font-medium text-lg">Conecta con nosotros en todas nuestras plataformas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialLinks.map((link) => (
          <a 
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-6 rounded-2xl border transition-all transform hover:-translate-y-1 hover:shadow-lg active:scale-95 shadow-md shadow-gray-200 dark:shadow-none ${link.color}`}
          >
            <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-sm shadow-gray-300 dark:shadow-none mr-4 shrink-0">
              {link.icon}
            </div>
            <div>
              <h3 className={`font-bold text-lg ${link.textColor}`}>{link.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-400 font-medium mt-1 leading-tight">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
