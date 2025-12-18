
import React, { useState } from 'react';
import { Diamond } from '../types';
import { analyzeDiamondDeal } from '../services/geminiService';
import { ShieldCheck, Sparkles, TrendingUp, TrendingDown, Zap, Eye, ChevronRight, Layers, Package } from 'lucide-react';

interface Props {
  diamond: Diamond;
}

export const DiamondRow: React.FC<Props> = ({ diamond }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (analysis) {
        setAnalysis(null);
        return;
    }
    setLoading(true);
    const result = await analyzeDiamondDeal(diamond);
    setAnalysis(result);
    setLoading(false);
  };

  const isMelee = diamond.category === 'melee';

  return (
    <>
        <tr className={`group transition-all hover:bg-slate-50 cursor-pointer ${analysis ? 'bg-indigo-50/30' : ''}`}>
            {/* Lot ID / Spec */}
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                        {isMelee ? <Layers className="w-6 h-6 text-slate-400" /> : <img src={diamond.image} alt="Lot" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">#{diamond.id}</p>
                        <p className="text-sm font-black text-slate-900">
                          {isMelee ? `Sieve: ${diamond.sieveSize}` : `${diamond.carat.toFixed(2)}ct ${diamond.shape}`}
                        </p>
                    </div>
                </div>
            </td>

            {/* Col/Cla/Cut */}
            <td className="px-6 py-6">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black text-slate-900">{diamond.color}</div>
                    <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black text-slate-900">{diamond.clarity}</div>
                    <div className="bg-slate-900 px-2 py-1 rounded text-[10px] font-black text-white">{diamond.cut[0]}</div>
                </div>
            </td>

            {/* Pol/Sym/Fluor or Melee Weight */}
            <td className="px-6 py-6">
                {isMelee ? (
                   <p className="text-sm font-black text-slate-900">{diamond.carat}ct Total</p>
                ) : (
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                      <span title="Polish">{diamond.polish}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span title="Symmetry">{diamond.symmetry}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span title="Fluorescence" className={diamond.fluorescence === 'None' ? 'text-slate-300' : 'text-indigo-600'}>{diamond.fluorescence[0]}</span>
                  </div>
                )}
            </td>

            {/* Lab Cert or Origin */}
            <td className="px-6 py-6">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 uppercase">
                    {diamond.lab !== 'None' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5 text-slate-400" />}
                    {diamond.lab !== 'None' ? diamond.lab : 'Verified Stock'}
                </div>
            </td>

            {/* Market Val */}
            <td className="px-6 py-6 text-right">
                <p className="text-sm font-black text-slate-900">
                  ${diamond.price.toLocaleString()}{isMelee ? '/ct' : ''}
                </p>
                <div className={`text-[9px] font-bold flex items-center gap-1 justify-end ${diamond.growth > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {diamond.growth > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {Math.abs(diamond.growth)}% vs Index
                </div>
            </td>

            {/* Actions */}
            <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={handleAnalyze}
                        className={`p-2 rounded-xl transition-all ${analysis ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-400 hover:text-indigo-600'}`}
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
                    </button>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                        {isMelee ? 'Quote' : 'Reserve'}
                    </button>
                </div>
            </td>
        </tr>
        
        {analysis && (
            <tr className="bg-slate-900 text-indigo-100">
                <td colSpan={6} className="px-10 py-8 relative overflow-hidden">
                    <div className="max-w-4xl relative z-10 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-3 mb-4 text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">
                            <Sparkles className="w-4 h-4" /> GemVault Market Insight
                        </div>
                        <p className="text-sm leading-relaxed font-medium mb-4">{analysis}</p>
                    </div>
                    <button onClick={() => setAnalysis(null)} className="absolute top-8 right-10 text-slate-500 hover:text-white text-sm font-bold">DISMISS</button>
                </td>
            </tr>
        )}
    </>
  );
};
