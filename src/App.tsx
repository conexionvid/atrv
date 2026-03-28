import { useState, useEffect } from 'react';
import { Radio, Newspaper, Share2, Menu, Landmark, RadioTower, Moon, Sun } from 'lucide-react';
import PlayerView from './components/PlayerView';
import NewsFeed from './components/NewsFeed';
import SocialHub from './components/SocialHub';
import MunicipioFeed from './components/MunicipioFeed';
import AtrvFeed from './components/AtrvFeed';

export default function App() {
  const [activeTab, setActiveTab] = useState('player');
  const [logoError, setLogoError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'player', icon: <Radio size={24} />, label: 'Radio' },
    { id: 'news', icon: <Newspaper size={24} />, label: 'Noticias' },
    { id: 'atrv', icon: <RadioTower size={24} />, label: 'ATRV' },
    { id: 'municipio', icon: <Landmark size={24} />, label: 'Municipio' },
    { id: 'social', icon: <Share2 size={24} />, label: 'Redes' },
  ];

  return (
    <div className="flex h-[100dvh] w-full bg-gray-100 dark:bg-gray-950 overflow-hidden flex-col md:flex-row transition-colors">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-yellow-400 dark:bg-gray-800 text-black dark:text-white p-4 flex items-center justify-center shadow-md shadow-gray-400 dark:shadow-gray-900 z-20 shrink-0 relative transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden shadow-sm shadow-gray-400 dark:shadow-gray-900 transition-colors">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="Logo Atoyac Radio" 
                className="w-full h-full object-contain p-1" 
                onError={() => setLogoError(true)} 
              />
            ) : (
              <Radio className="text-black dark:text-white" size={20} />
            )}
          </div>
          <h1 className="font-bold text-lg tracking-tight text-center text-black dark:text-white">Atoyac Radio Veracruz</h1>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:bg-white/80 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 shadow-xl shadow-gray-300 dark:shadow-gray-950 z-20 transition-colors">
        <div className="p-6 bg-yellow-400 dark:bg-gray-800 text-black dark:text-white flex flex-col items-center justify-center shadow-sm shadow-gray-300 dark:shadow-gray-900 transition-colors">
          <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden shadow-md shadow-gray-400 dark:shadow-gray-900 mb-4 transition-colors">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="Logo Atoyac Radio" 
                className="w-full h-full object-contain p-2" 
                onError={() => setLogoError(true)} 
              />
            ) : (
              <Radio className="text-black dark:text-white" size={40} />
            )}
          </div>
          <h1 className="font-bold text-xl text-center tracking-tight text-black dark:text-white">Atoyac Radio Veracruz</h1>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 font-bold shadow-sm shadow-gray-300 dark:shadow-none' 
                  : 'text-gray-800 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-700 dark:hover:text-orange-400'
              }`}
            >
              {item.icon}
              <span className="text-sm uppercase tracking-wider font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 relative w-full transition-colors">
        {/* Desktop Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="hidden md:flex absolute top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-md shadow-gray-200 dark:shadow-gray-900 text-gray-800 dark:text-yellow-400 hover:scale-105 transition-all"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {activeTab === 'player' && <PlayerView />}
        {activeTab === 'news' && <NewsFeed />}
        {activeTab === 'atrv' && <AtrvFeed />}
        {activeTab === 'municipio' && <MunicipioFeed />}
        {activeTab === 'social' && <SocialHub />}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-800 flex justify-around items-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_15px_rgba(0,0,0,0.5)] z-20 shrink-0 transition-colors">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
              activeTab === item.id ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400'
            }`}
          >
            <div className={`mb-1 transition-transform ${activeTab === item.id ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
