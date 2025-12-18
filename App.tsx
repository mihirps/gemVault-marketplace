
import React, { useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Gem, 
  LayoutDashboard, 
  LineChart as ChartIcon, 
  Bell, 
  Menu, 
  Sparkles,
  ShoppingBag,
  Command,
  Layers,
  Diamond as DiamondIcon,
  ChevronRight,
  Box,
  Droplets,
  Star,
  Watch,
  Coins,
  Gavel,
  Activity,
  Globe,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Marketplace } from './views/Marketplace';
import { Dashboard } from './views/Dashboard';
import { Pricing } from './views/Pricing';

/**
 * A recursive component for nested flyout items.
 * Handles hovering and positioning of second-level menus.
 */
const FlyoutItem: React.FC<{ item: any; level: number; parentTop: number }> = ({ item, level, parentTop }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  return (
    <div 
      ref={itemRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={item.path || '#'}
        className={`px-5 py-3 text-[11px] font-bold transition-all flex items-center justify-between group/link ${isHovered ? 'bg-slate-50 text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
      >
        <span>{item.label}</span>
        {item.submenu && <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isHovered ? 'translate-x-1' : 'text-slate-300'}`} />}
      </Link>

      {/* Level 2 Flyout */}
      {item.submenu && isHovered && (
        <div 
          className="fixed z-[400] animate-in fade-in slide-in-from-left-2 duration-200"
          style={{ 
            left: `${88 + (level * 220)}px`, 
            top: itemRef.current ? itemRef.current.getBoundingClientRect().top - 4 : parentTop 
          }}
        >
          {/* Bridge connector between menu levels */}
          <div className="absolute -left-4 top-0 bottom-0 w-4 bg-transparent" />
          
          <div className="bg-white border border-slate-200 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-xl py-3 min-w-[220px] overflow-hidden">
             {item.submenu.map((sub: any) => (
                <Link 
                  key={sub.label}
                  to={sub.path || '#'}
                  className="block px-6 py-2.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  {sub.label}
                </Link>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem: React.FC<{ 
  item: any, 
  isActive: boolean 
}> = ({ item, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<number | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  return (
    <div 
      ref={itemRef}
      className="relative flex flex-col items-center w-full px-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={item.path || '#'}
        className={`w-full h-14 flex items-center justify-center rounded-2xl transition-all duration-300 relative group/icon ${isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}
      >
        <item.icon className={`w-5.5 h-5.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/icon:scale-110'}`} />
        
        {/* Tooltip for items without flyout */}
        {isHovered && !item.submenu && (
          <div className="absolute left-[calc(100%+16px)] px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-xl animate-in fade-in slide-in-from-left-2 duration-200 whitespace-nowrap z-[250]">
            {item.label}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
          </div>
        )}

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1 h-6 bg-slate-900 rounded-r-full" />
        )}
      </Link>

      {/* LEVEL 1 FLYOUT */}
      {item.submenu && isHovered && (
        <div 
          className="fixed left-[88px] lg:left-[104px] z-[300] animate-in fade-in slide-in-from-left-4 zoom-in-95 duration-200"
          style={{ top: itemRef.current ? itemRef.current.getBoundingClientRect().top - 8 : 0 }}
        >
          {/* Bridge connector */}
          <div className="absolute -left-10 top-0 bottom-0 w-10 bg-transparent" />
          
          <div className="bg-white border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-2xl py-4 min-w-[220px] overflow-visible">
            <div className="px-6 py-2 mb-2 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">{item.label}</span>
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            
            <div className="flex flex-col">
              {item.submenu.map((sub: any) => (
                <FlyoutItem 
                  key={sub.label} 
                  item={sub} 
                  level={1} 
                  parentTop={itemRef.current?.getBoundingClientRect().top || 0}
                />
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-50 px-6">
               <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2">
                 Market Protocols <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const location = useLocation();

  // Defined Nested Menu Data
  const menuItems = [
    { 
      icon: DiamondIcon, 
      label: 'Diamonds', 
      path: '/?type=single',
      submenu: [
        { 
          label: 'Single Stones', 
          path: '/?type=single',
          submenu: [
            { label: 'Natural', path: '/?type=single' },
            { label: 'Lab-Grown', path: '/?type=lab-grown' }
          ]
        },
        { 
          label: 'Melee Stones', 
          path: '/?type=melee',
          submenu: [
            { label: 'Natural', path: '/?type=melee' },
            { label: 'Lab-Grown', path: '/?type=melee-lab' }
          ]
        }
      ]
    },
    { 
      icon: Sparkles, 
      label: 'Jewelry', 
      path: '/?type=jewelry',
      submenu: [
        { label: 'High Jewelry', path: '/?type=jewelry' },
        { label: 'Bridal Sets', path: '/?type=jewelry' },
        { label: 'Designer Watch Charms', path: '/?type=jewelry' }
      ]
    },
    { 
      icon: Gem, 
      label: 'Gemstones', 
      path: '/?type=gemstones',
      submenu: [
        { label: 'Precious Stones', path: '/?type=gemstones' },
        { label: 'Semi-Precious', path: '/?type=gemstones' }
      ]
    },
    { icon: Watch, label: 'Watches', path: '/?type=watches' },
    { icon: Coins, label: 'Bullions', path: '/?type=bullions' },
    { icon: Gavel, label: 'Auctions', path: '/?type=auctions' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ChartIcon, label: 'Analytics', path: '/pricing' }
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] lg:hidden transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggle}
      />
      <aside className={`fixed top-0 left-0 z-[160] h-screen w-20 lg:w-24 bg-white border-r border-slate-100 flex flex-col items-center py-8 transition-transform duration-500 shadow-[20px_0_60px_rgba(0,0,0,0.02)] ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-12">
          <Link to="/" className="w-12 h-12 bg-slate-900 rounded-[18px] flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform">
            <Gem className="w-6 h-6" />
          </Link>
        </div>

        <nav className="flex-1 w-full space-y-5 flex flex-col items-center px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname + location.search === item.path || (item.path === '/' && location.pathname === '/');
            return (
              <SidebarItem 
                key={item.label} 
                item={item} 
                isActive={isActive} 
              />
            );
          })}
        </nav>

        <div className="mt-auto pt-8 flex flex-col items-center gap-6 w-full px-4 border-t border-slate-50">
          <button className="text-slate-300 hover:text-slate-900 transition-all group relative py-1">
            <Settings className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            <div className="absolute left-[calc(100%+16px)] px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0 whitespace-nowrap z-[250]">
              Settings
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            </div>
          </button>
          
          <div className="w-11 h-11 rounded-[16px] overflow-hidden border-2 border-slate-50 shadow-sm hover:border-indigo-100 transition-all cursor-pointer mb-2 relative group grayscale hover:grayscale-0">
            <img src="https://i.pravatar.cc/150?u=merchant" alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="sticky top-0 z-[50] w-full px-8 lg:px-12 py-5 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="flex items-center gap-8">
        <button onClick={toggleSidebar} className="lg:hidden p-2.5 bg-slate-50 rounded-xl text-slate-600">
          <Menu className="w-5.5 h-5.5" />
        </button>
        
        <div className="hidden lg:flex items-center bg-slate-100/50 rounded-xl px-4 py-2.5 w-[420px] border border-transparent focus-within:bg-white focus-within:border-slate-200 focus-within:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
          <Search className="w-4.5 h-4.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Global Bourse Stock..." 
            className="bg-transparent border-none focus:ring-0 text-[12px] font-bold ml-3 w-full text-slate-700 placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest"
          />
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-100 text-slate-300 text-[10px] font-black">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex flex-col items-end mr-4">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Stock Liquidity</p>
          <p className="text-xl font-black text-slate-900 tracking-tight leading-none">$1,240,400</p>
        </div>
        <button className="w-11 h-11 flex items-center justify-center bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-slate-900 transition-all relative group shadow-sm">
          <Bell className="w-5.5 h-5.5" />
          <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
        </button>
        <button className="bg-slate-900 text-white px-8 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-100 hover:bg-indigo-600 hover:translate-y-[-2px] transition-all flex items-center gap-2 active:scale-95">
          <ShoppingBag className="w-4.5 h-4.5" />
          List Stock
        </button>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#FBFCFD]">
        <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 lg:ml-20 flex flex-col min-w-0">
          <Header toggleSidebar={() => setSidebarOpen(true)} />
          <div className="p-0">
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </div>
          <footer className="mt-auto px-12 py-20 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-8">
              <Gem className="w-10 h-10 text-slate-900" />
              <div className="flex flex-col">
                <span className="text-[16px] font-black text-slate-900 uppercase tracking-[0.4em] leading-none mb-1">GemVault</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Global Institutional Marketplace</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-900 transition-colors">Rules</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Compliance</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Market Index</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            </div>
            <div className="flex gap-8 text-slate-300">
                <Globe className="w-6 h-6 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Settings className="w-6 h-6 hover:text-indigo-600 cursor-pointer transition-colors" />
            </div>
          </footer>
        </main>
      </div>
    </Router>
  );
};

export default App;
