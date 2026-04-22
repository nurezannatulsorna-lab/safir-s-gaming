/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameViewer from './components/GameViewer';
import gamesData from './data/games.json';
import { Game } from './types';
import { TrendingUp, Sparkles, Filter, Search, Gamepad2 } from 'lucide-react';

const games = gamesData as Game[];

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(games.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        onSearch={setSearchQuery} 
        onHomeClick={() => {
          setSelectedGame(null);
          setActiveCategory('All');
        }} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-40 pb-20">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="mb-24 grid grid-cols-12 gap-8 items-end">
                 <div className="col-span-12 lg:col-span-7 flex flex-col">
                    <div className="outline-text font-display text-huge uppercase">UNBLOCKED</div>
                    <div className="font-display text-huge uppercase text-gaming-accent">ARCADE</div>
                    <div className="mt-8 max-w-lg">
                       <p className="text-white/40 text-xs leading-relaxed uppercase font-black tracking-[0.1em]">
                          Hyper-speed gaming portal. Zero restrictions. 100% bypass. Select a title below to initiate the interface.
                       </p>
                    </div>
                    <div className="mt-12 flex flex-wrap gap-4">
                       <button 
                        onClick={() => setSelectedGame(games[0])}
                        className="bg-white text-black font-black px-10 py-5 uppercase text-[10px] tracking-widest hover:bg-gaming-accent transition-all hover:scale-105 active:scale-95"
                       >
                         Explore Library
                       </button>
                       <button className="border border-white/20 text-white font-black px-10 py-5 uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">
                         Submit Game
                       </button>
                    </div>
                 </div>
                 
                 <div className="hidden lg:grid col-span-5 grid-cols-2 gap-4 h-full">
                    {games.slice(1, 4).map((game, idx) => (
                      <div key={game.id} className={`game-card-brutal bg-zinc-900 overflow-hidden relative ${idx === 2 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                         <img src={game.thumbnail} className="w-full h-full object-cover grayscale opacity-40" referrerPolicy="no-referrer" />
                         <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <div className="text-[10px] font-black uppercase text-gaming-accent tracking-widest mb-1">{game.title}</div>
                            <div className="text-[8px] font-bold text-white/30 uppercase">Active Status: Stable</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Filters */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 sticky top-20 z-40 py-6 bg-gaming-bg/95 backdrop-blur-md -mx-4 px-4 border-b border-white/5">
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
                  <div className="flex items-center gap-2 mr-4 text-white/20 whitespace-nowrap">
                    <Filter className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Filter_Node</span>
                  </div>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${
                        activeCategory === cat 
                        ? 'border-gaming-accent text-white' 
                        : 'border-transparent text-white/20 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                  Total_Units: {filteredGames.length}
                </div>
              </div>

              {/* Grid */}
              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onClick={() => setSelectedGame(game)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <Search className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No missions found.</h3>
                  <p className="text-gray-400">Try adjusting your search or category filters.</p>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedGame && (
          <GameViewer 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto px-4 mt-24 pt-12 border-t border-white/5 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
              <Gamepad2 className="w-5 h-5" />
              <span className="font-display font-bold tracking-tighter">NEXUS GMS</span>
           </div>
           
           <div className="flex gap-8 text-xs font-medium text-gray-500 uppercase tracking-widest">
              <a href="#" className="hover:text-gaming-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gaming-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gaming-accent transition-colors">DMCA</a>
           </div>

           <p className="text-[10px] text-gray-600 font-mono">
             SYSTEM_ID: NEXUS_CORE_V1.0.0 // PROTOCOL_READY
           </p>
        </div>
      </footer>
    </div>
  );
}
