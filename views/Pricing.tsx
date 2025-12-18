
import React, { useState, useEffect } from 'react';
import { MarketChart } from '../components/MarketChart';
import { getMarketInsights } from '../services/geminiService';
import { Info, Sparkles, TrendingUp, Search } from 'lucide-react';

export const Pricing: React.FC = () => {
    const [insights, setInsights] = useState<any[]>([]);
    const [query, setQuery] = useState('Round Brilliant');
    const [loading, setLoading] = useState(false);

    const fetchInsights = async () => {
        setLoading(true);
        const data = await getMarketInsights(query);
        setInsights(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-black text-slate-900 mb-4 font-serif">Price Analytics & Market Trends</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Global real-time market data aggregated from RapNet, VDB, and leading regional bourses.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="space-y-10">
                    <MarketChart />
                    
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">AI Market Oracle</h3>
                                <p className="text-xs text-slate-500">Predictive insights for specific categories</p>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-8">
                            <input 
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                                placeholder="e.g. 2ct Oval D VVS1"
                            />
                            <button 
                                onClick={fetchInsights}
                                disabled={loading}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Analyzing...' : 'Analyze'}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {insights.length > 0 ? insights.map((item, idx) => (
                                <div key={idx} className="border-l-4 border-indigo-500 pl-6 py-2">
                                    <h4 className="font-bold text-slate-900 mb-1">{item.trend}</h4>
                                    <p className="text-sm text-slate-600 mb-2">{item.impact}</p>
                                    <div className="bg-indigo-50 px-3 py-1 rounded-lg inline-block text-[10px] font-bold text-indigo-700 uppercase">
                                        Action: {item.recommendation}
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-slate-400 py-10 italic">No insights found. Try a different category.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-400" /> Rapaport Price Sheet
                        </h3>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold">UPDATED: MAY 24, 2024</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-widest">CLARITY / COLOR</th>
                                    {['D', 'E', 'F', 'G'].map(c => <th key={c} className="pb-4 text-center">{c}</th>)}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {['IF', 'VVS1', 'VVS2', 'VS1', 'VS2'].map(clarity => (
                                    <tr key={clarity}>
                                        <td className="py-4 font-bold text-slate-400">{clarity}</td>
                                        {[12.5, 11.2, 10.4, 9.8].map((price, idx) => (
                                            <td key={idx} className="py-4 text-center">
                                                <div className="font-mono text-sm">{price}k</div>
                                                <div className="text-[8px] text-emerald-400 font-bold">+{idx * 0.2}%</div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-indigo-400 shrink-0" />
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Prices are shown in USD per carat ($100s). This list represents the asking prices of major wholesalers and is a benchmark for negotiation only. Real-time market discounts typically range from 2% to 15% depending on cut quality and lab certification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
