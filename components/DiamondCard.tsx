
import React, { useState } from 'react';
import { Diamond } from '../types';
import { analyzeDiamondDeal } from '../services/geminiService';
import { ShieldCheck, Sparkles, TrendingUp, TrendingDown, Eye, ArrowUpRight, Maximize2, Zap } from 'lucide-react';

interface Props {
  diamond: Diamond;
}

export const DiamondCard: React.FC<Props> = ({ diamond }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeDiamondDeal(diamond);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[40px] overflow-hidden border border-slate-200/50 hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.14)] transition-all duration-700 group flex flex-col h-full relative">
      {/* Visual Header */}
      <div className="relative aspect-[1/1] overflow-hidden bg-[#F8F9FB]">
        <img 
          src={diamond.image} 
          alt={`${diamond.shape} Diamond`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
        />
        
        {/* Diamond ID Badge */}
        <div className="absolute top-6 left-6">
             <div className="bg-white/90 backdrop-blur-md text-slate-900 px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white shadow-lg">
                Lot #{diamond.id.padStart(6, '0')}
             </div>
        </div>

        {/* Certificate Badge */}
        <div className="absolute top-6 right-6">
            <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black shadow-xl border border-indigo-500/20">
              <ShieldCheck className="w-4 h-4" />
              {diamond.lab}
            </div>
        </div>

        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 translate-y-4 group-hover:translate-y-0">
            <button className="bg-white text-slate-900 w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
                <Maximize2 className="w-6 h-6" />
            </button>
            <button 
                onClick={handleAnalyze}
                className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
            >
                <Sparkles className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="p-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <h3 className="text-4xl font-black text-slate-900 font-serif tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                {diamond.carat}ct <span className="text-slate-400 font-light italic">{diamond.shape}</span>
            </h3>
            <div className="flex gap-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{diamond.color} Color</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full my-auto"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{diamond.clarity} Clarity</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">${diamond.price.toLocaleString()}</p>
            <div className={`text-[9px] font-black uppercase flex items-center gap-1 justify-end tracking-[0.1em] ${diamond.growth > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {diamond.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(diamond.growth)}% vs Market
            </div>
          </div>
        </div>

        {/* Technical Specification Terminal */}
        <div className="grid grid-cols-4 gap-4 py-6 border-y border-slate-100 mb-8 bg-slate-50/50 px-4 rounded-3xl">
            <div className="text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Cut</p>
                <p className="text-[11px] font-black text-slate-900">{diamond.cut}</p>
            </div>
            <div className="text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Pol.</p>
                <p className="text-[11px] font-black text-slate-900">{diamond.polish}</p>
            </div>
            <div className="text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Sym.</p>
                <p className="text-[11px] font-black text-slate-900">{diamond.symmetry}</p>
            </div>
            <div className="text-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Fluor.</p>
                <p className="text-[11px] font-black text-slate-900">{diamond.fluorescence}</p>
            </div>
        </div>

        {/* AI Valuation Drawer */}
        {analysis ? (
          <div className="bg-slate-900 p-6 rounded-[28px] mb-8 text-[11px] leading-relaxed text-indigo-100 relative border border-slate-800 animate-in slide-in-from-top-4">
            <button onClick={() => setAnalysis(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">✕</button>
            <p className="font-black flex items-center gap-2 mb-3 text-indigo-400 uppercase tracking-[0.2em]">
                <Zap className="w-4 h-4" /> Bourse Intelligence
            </p>
            {analysis}
          </div>
        ) : loading ? (
           <div className="w-full py-4 mb-8 bg-slate-50 rounded-[24px] flex items-center justify-center gap-3">
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Consulting Indices...</span>
           </div>
        ) : null}

        {/* Action Controls */}
        <div className="mt-auto flex gap-4">
            <button className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black text-[11px] tracking-widest uppercase hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-2 group/btn">
                Reserve Item <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
            <button className="w-16 bg-white border border-slate-200 flex items-center justify-center rounded-[24px] hover:bg-slate-50 transition-all hover:border-slate-300">
                <Eye className="w-5 h-5 text-slate-400" />
            </button>
        </div>
      </div>
    </div>
  );
};
