export default function PlayerView() {
  return (
    <div className="w-full min-h-full flex flex-col bg-gray-100 dark:bg-gray-950 transition-colors">
      <div className="p-6 bg-gradient-to-b from-yellow-400 to-orange-400 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white text-center shadow-md shadow-gray-300 dark:shadow-gray-900 z-10 shrink-0 transition-colors">
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">En Vivo</h2>
        <p className="text-gray-900 dark:text-gray-300 font-medium">Escucha la mejor programación de Atoyac Radio Veracruz</p>
      </div>
      <div className="flex-1 w-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl h-[75vh] min-h-[500px] md:h-[85vh] md:min-h-[800px] bg-black rounded-2xl shadow-2xl shadow-gray-400 dark:shadow-black overflow-hidden relative border-4 border-gray-800 dark:border-gray-700 transition-shadow">
          <iframe 
            src="https://conexionvid.github.io/atoyac-radio-veracruz/" 
            className="absolute inset-0 w-full h-full border-0"
            title="Atoyac Radio Player"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
