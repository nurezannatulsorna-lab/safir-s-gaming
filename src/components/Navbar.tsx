import { Search, Gamepad2, LayoutGrid, Flame } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
}

export default function Navbar({ onSearch, onHomeClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={onHomeClick}
        >
          <span className="font-sans text-2xl font-black tracking-tighter italic uppercase text-white group-hover:text-gaming-accent transition-colors">
            X-ZONE
          </span>
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 border-l border-white/10 pl-6">
            <button onClick={onHomeClick} className="text-white">Library</button>
            <button className="hover:text-white transition-colors">Popular</button>
            <button className="hover:text-white transition-colors">Retro</button>
            <button className="hover:text-white transition-colors">Proxy</button>
          </div>
        </div>

        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
          <input
            type="text"
            placeholder="INITIATING SEARCH..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-none py-2.5 pl-10 pr-4 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-gaming-accent/50 transition-all placeholder:text-white/20"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono font-bold tracking-wider">
             <span className="text-gaming-accent">● 14,202 ONLINE</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black border border-white/5">
            JS
          </div>
        </div>
      </div>
    </nav>
  );
}
