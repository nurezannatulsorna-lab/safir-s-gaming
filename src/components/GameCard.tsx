import { motion } from 'motion/react';
import { Game } from '../types';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <motion.div
      layoutId={`game-${game.id}`}
      onClick={onClick}
      className="group relative cursor-pointer bg-gaming-card rounded-none overflow-hidden game-card-brutal flex flex-col aspect-square"
    >
      <div className="flex-1 relative overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-4 py-2">Launch Mission</span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-gaming-accent text-black text-[9px] font-black uppercase tracking-widest px-2 py-1">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 bg-zinc-900/50 border-t border-white/5">
        <h3 className="font-sans text-lg font-black uppercase tracking-tighter text-white group-hover:text-gaming-accent transition-colors truncate">
          {game.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
           <span className="text-[9px] text-white/30 uppercase font-black tracking-widest truncate max-w-[70%]">
             Node_{game.id.padStart(2, '0')}
           </span>
           <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-gaming-accent" />
              <div className="w-1 h-1 bg-gaming-accent/40" />
              <div className="w-1 h-1 bg-gaming-accent/10" />
           </div>
        </div>
      </div>
    </motion.div>
  );
}
