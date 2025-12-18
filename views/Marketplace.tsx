import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DiamondCard } from '../components/DiamondCard';
import { DiamondRow } from '../components/DiamondRow';
import { MOCK_DIAMONDS, SHAPES, COLORS, CLARITIES, SIEVE_SIZES } from '../constants';
import { InventoryCategory } from '../types';
import { 
  Search as SearchIcon, 
  ChevronDown, 
  Filter, 
  X, 
  LayoutGrid, 
  List, 
  Activity,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  Gem,
  Diamond as DiamondIcon,
  Droplets,
  Star,
  Watch,
  Coins,
  Gavel,
  History,
  TrendingUp,
  Globe
} from 'lucide-react';

export const Marketplace: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = (queryParams.get('type') || 'single') as InventoryCategory;

    const [viewMode, setViewMode] = useState<'grid' | 'list'>(['melee', 'melee-lab', 'gemstones', 'auctions', 'bullions'].includes(category) ? 'list' : 'grid');
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedClarities, setSelectedClarities] = useState<string[]>([]);
    const [selectedSieves, setSelectedSieves] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(2500000);
    const [caratRange, setCaratRange] = useState(1000.0);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

    const filteredDiamonds = useMemo(() => {
        return MOCK_DIAMONDS.filter(d => {
            if (d.category !== category) return false;
            if (selectedShape && d.shape !== selectedShape) return false;
            if (selectedColors.length > 0 && !selectedColors.includes(d.color)) return false;
            if (selectedClarities.length > 0 && !selectedClarities.includes(d.clarity)) return false;
            if (['melee', 'melee-lab'].includes(category) && selectedSieves.length > 0 && d.sieveSize && !selectedSieves.includes(d.sieveSize)) return false;
            
            const currentPrice = d.price;
            if (currentPrice > priceRange) return false;
            if (d.carat > caratRange) return false;
            return true;
        });
    }, [category, selectedShape, selectedColors, selectedClarities, selectedSieves, priceRange, caratRange]);

    const getHeroConfig = () => {
        switch(category) {
            case 'jewelry':
                return { 
                    title: 'High Jewelry', 
                    subtitle: 'Wholesale Ateliers', 
                    desc: 'Masterfully crafted heritage pieces and contemporary high jewelry. Direct access to elite manufacturing catalogs.',
                    bg: 'bg-rose-950',
                    icon: <Sparkles className="w-5 h-5" />
                };
            case 'gemstones':
                return { 
                    title: 'Exotic Gemstones', 
                    subtitle: 'Investment Grade', 
                    desc: 'A global vault of rubies, sapphires, and emeralds. Sourced from ethically verified mines with full certification.',
                    bg: 'bg-emerald-950',
                    icon: <Gem className="w-5 h-5" />
                };
            case 'watches':
                return { 
                    title: 'Luxury Watches', 
                    subtitle: 'Horology Reserve', 
                    desc: 'Exquisite timepieces from the world\'s most prestigious watchmakers. Authenticated luxury heritage stock.',
                    bg: 'bg-slate-900',
                    icon: <Watch className="w-5 h-5" />
                };
            case 'bullions':
                return { 
                    title: 'Bullion Exchange', 
                    subtitle: 'Hard Assets', 
                    desc: 'Institutional grade gold and silver bullions. Sourced from LBMA certified refineries with global insurance.',
                    bg: 'bg-amber-950',
                    icon: <Coins className="w-5 h-5" />
                };
            case 'auctions':
                return { 
                    title: 'The Gavel', 
                    subtitle: 'Live Bidding', 
                    desc: 'Our ultra-high stakes bidding floor for the rarest stones in existence. Connect to global liquidity pools.',
                    bg: 'bg-indigo-950',
                    icon: <Gavel className="w-5 h-5" />
                };
            case 'lab-grown':
                return { 
                    title: 'CVD / HPHT Lab', 
                    subtitle: 'Future Diamonds', 
                    desc: 'Precision engineered diamonds with identical chemical properties to earth-mined stones. Direct lab pricing.',
                    bg: 'bg-cyan-950',
                    icon: <Droplets className="w-5 h-5" />
                };
            case 'melee-lab':
                return { 
                    title: 'Melee Lab', 
                    subtitle: 'Precision Parcels', 
                    desc: 'High-purity lab-grown melee parcels for manufacturers. Consistent grading and sieve-calibrated accuracy.',
                    bg: 'bg-teal-900',
                    icon: <Layers className="w-5 h-5" />
                };
            case 'melee':
                return { 
                    title: 'Natural Melee', 
                    subtitle: 'Volume Parcels', 
                    desc: 'Direct-from-source natural melee parcels. Consistent batches for luxury manufacturing demands.',
                    bg: 'bg-indigo-900',
                    icon: <Layers className="w-5 h-5" />
                };
            default:
                return { 
                    title: 'Earth Mined', 
                    subtitle: 'GIA Certified', 
                    desc: 'Premium natural stones from the world\'s leading bourses. Verified inventory with real-time availability.',
                    bg: 'bg-slate-900',
                    icon: <Star className="w-5 h-5" />
                };
        }
    };

    const hero = getHeroConfig();

    return (
        <div className="bg-[#FBFCFD] min-h-screen relative overflow-x-hidden">
            <div className="bg-slate-900 text-white py-3.5 px-10 flex items-center gap-16 overflow-hidden whitespace-nowrap border-b border-slate-800">
                <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 shrink-0">
                    <Activity className="w-5 h-5" /> Real-Time Bourse Index
                </div>
                <div className="flex gap-16 animate-marquee">
                    {[1,2,3,4,5,6,7,8].map((i) => (
                        <div key={i} className="flex items-center gap-4 text-[11px] font-bold">
                            <span className="text-slate-500 uppercase tracking-widest">{category.toUpperCase().replace('-', ' ')}</span>
                            <span className="text-slate-100 font-black tracking-tighter">${(Math.random() * 50000 + 10000).toFixed(0)}</span>
                            <span className={i % 2 === 0 ? "text-emerald-400" : "text-rose-400"}>
                                {i % 2 === 0 ? '▲' : '▼'} { (Math.random() * 2.5).toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="max-w-[1900px] mx-auto p-8 lg:p-16">
                <header className={`mb-20 relative rounded-[64px] overflow-hidden py-32 px-20 group transition-all duration-1000 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ${hero.bg}`}>
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-white/5 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 max-w-4xl">
                        <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-8 py-3 rounded-full text-[11px] font-black tracking-[0.3em] uppercase text-white mb-12 backdrop-blur-xl">
                            {hero.icon} Institutional Exchange
                        </div>
                        <h1 className="text-7xl lg:text-9xl font-black text-white font-serif leading-[1] mb-12 tracking-tight">
                            {hero.title} <br />
                            <span className="text-indigo-300 italic opacity-80">{hero.subtitle}</span>
                        </h1>
                        <p className="text-2xl text-slate-300 font-light leading-relaxed mb-16 max-w-2xl opacity-90">{hero.desc}</p>
                        <div className="flex gap-6">
                            <button className="bg-white text-slate-900 px-14 py-6.5 rounded-[28px] font-black text-[12px] uppercase tracking-[0.3em] hover:bg-indigo-400 hover:text-white hover:translate-y-[-4px] transition-all duration-500 flex items-center gap-4 shadow-[0_25px_50px_-12px_rgba(255,255,255,0.2)]">
                                Enter Vault <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="bg-white/5 border border-white/10 text-white px-14 py-6.5 rounded-[28px] font-black text-[12px] uppercase tracking-[0.3em] hover:bg-white/20 transition-all duration-500 backdrop-blur-sm">
                                Market Insights
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 bg-white/80 backdrop-blur-3xl p-9 rounded-[48px] border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] sticky top-6 z-40">
                    <div className="flex items-center gap-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 font-serif leading-none mb-2">Inventory Stock</h2>
                            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em]">{filteredDiamonds.length} Verified Global Lots</p>
                        </div>
                        <div className="h-12 w-px bg-slate-200 hidden lg:block"></div>
                        <div className="flex items-center bg-slate-100/50 p-2 rounded-[22px] border border-slate-200/30">
                            <button onClick={() => setViewMode('grid')} className={`p-4 rounded-[18px] transition-all duration-500 ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xl border border-slate-200' : 'text-slate-300 hover:text-slate-500'}`}>
                                <LayoutGrid className="w-6 h-6" />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-4 rounded-[18px] transition-all duration-500 ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xl border border-slate-200' : 'text-slate-300 hover:text-slate-500'}`}>
                                <List className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <button className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-10 py-6 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all group">
                             <Globe className="w-5 h-5 text-slate-400 group-hover:rotate-180 transition-transform duration-700" /> Region: GLOBAL
                        </button>
                        <button onClick={() => setIsFilterDrawerOpen(true)} className="flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 hover:translate-y-[-4px] transition-all shadow-2xl shadow-slate-300">
                            <Filter className="w-5 h-5" /> Refine Marketplace
                        </button>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    {filteredDiamonds.length > 0 ? (
                        viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                                {filteredDiamonds.map(diamond => (
                                    <DiamondCard key={diamond.id} diamond={diamond} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-200 rounded-[56px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.02)]">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[1200px]">
                                        <thead className="bg-slate-50/50 border-b border-slate-100">
                                            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                                                <th className="px-14 py-10">Institutional Lot ID</th>
                                                <th className="px-10 py-10">Grade Metrics</th>
                                                <th className="px-10 py-10">Specifications</th>
                                                <th className="px-10 py-10">Origin / Lab</th>
                                                <th className="px-10 py-10 text-right">Bourse Valuation</th>
                                                <th className="px-14 py-10 text-right">Purchase Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {filteredDiamonds.map(diamond => (
                                                <DiamondRow key={diamond.id} diamond={diamond} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-72 bg-white border border-slate-100 rounded-[72px] shadow-sm">
                            <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-slate-100">
                                <Package className="w-12 h-12 text-slate-200" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 font-serif">Vault Queries Returned 0 Results</h3>
                            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">The requested institutional {category.replace('-', ' ')} lots are not available in current global liquidity pools. Please adjust your criteria.</p>
                            <button onClick={() => {
                                setPriceRange(2500000);
                                setCaratRange(1000.0);
                                setSelectedShape(null);
                            }} className="mt-12 bg-indigo-600 text-white px-12 py-5.5 rounded-full text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-105">
                                Full Reset of Filter Matrix
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Filter Drawer */}
            <div className={`fixed inset-0 z-[100] transition-all duration-700 ${isFilterDrawerOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-slate-900/70 backdrop-blur-2xl transition-opacity duration-700 ${isFilterDrawerOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterDrawerOpen(false)} />
                <div className={`absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-[0_0_150px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full p-16 lg:p-20">
                        <div className="flex justify-between items-start mb-20">
                            <div>
                                <h2 className="text-5xl font-black text-slate-900 font-serif leading-none mb-4 tracking-tight">Market Filters</h2>
                                <p className="text-[12px] text-slate-400 font-black uppercase tracking-[0.4em]">{category.toUpperCase()} PROTOCOL</p>
                            </div>
                            <button onClick={() => setIsFilterDrawerOpen(false)} className="p-5 bg-slate-50 hover:bg-slate-100 rounded-[28px] text-slate-400 hover:text-slate-900 transition-all"><X className="w-8 h-8" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-6 scrollbar-hide">
                            <div className="space-y-16">
                                <div>
                                    <label className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 block">Inventory Category</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['single', 'melee', 'lab-grown', 'melee-lab', 'fancy-color', 'jewelry', 'gemstones', 'watches', 'bullions', 'auctions'].map(cat => (
                                            <Link 
                                                key={cat} 
                                                to={`/?type=${cat}`}
                                                className={`px-6 py-4.5 rounded-[22px] border text-[11px] font-black uppercase tracking-[0.15em] transition-all text-center ${category === cat ? 'bg-slate-900 text-white border-slate-900 shadow-2xl' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
                                            >
                                                {cat.replace('-', ' ')}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-12 pt-12 border-t border-slate-100">
                                    <div>
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Institutional Weight</span>
                                            <span className="text-base font-black text-slate-900">{caratRange}ct/pts</span>
                                        </div>
                                        <input type="range" min="0.1" max="1000" step="0.1" value={caratRange} onChange={(e) => setCaratRange(parseFloat(e.target.value))} className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Valuation Cap</span>
                                            <span className="text-base font-black text-slate-900">${priceRange.toLocaleString()}</span>
                                        </div>
                                        <input type="range" min="100" max="2500000" step="1000" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20 pt-12 border-t border-slate-100">
                            <button onClick={() => setIsFilterDrawerOpen(false)} className="w-full bg-slate-900 text-white py-8 rounded-[36px] font-black text-[13px] tracking-[0.3em] uppercase shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:bg-indigo-600 transition-all active:scale-95">Update Liquidity View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};