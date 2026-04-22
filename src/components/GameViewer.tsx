import { motion } from 'motion/react';
import { Game } from '../types';
import { X, Maximize2, RotateCcw, Info } from 'lucide-react';

interface GameViewerProps {
  game: Game;
  onClose: () => void;
}

export default function GameViewer({ game, onClose }: GameViewerProps) {
  const refreshGame = () => {
    const iframe = document.getElementById('game-frame') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-gaming-bg pt-20"
    >
      <div className="h-16 bg-black border-y border-white/5 px-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gaming-accent flex items-center justify-center font-black text-black text-xs">
               0{game.id}
            </div>
            <div>
              <h2 className="font-sans font-black uppercase text-white leading-tight tracking-tight">{game.title}</h2>
              <div className="flex items-center gap-2">
                 <span className="text-[9px] uppercase font-bold text-gaming-accent tracking-widest">{game.category}</span>
                 <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest flex items-center gap-1">
                   Mission_Status: Stable
                 </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={refreshGame}
            className="text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reload
          </button>
          <div className="w-px h-4 bg-white/10" />
          <button 
            onClick={onClose}
            className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 hover:bg-gaming-accent transition-colors"
          >
            Abort Mission
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-black">
        <iframe
          id="game-frame"
          src={game.url}
          className="w-full h-full border-none"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
        />
        
        <div className="absolute top-4 right-4 pointer-events-none">
           <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gaming-accent animate-pulse" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">System_Link_Active</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
