
import React from 'react';
import { MarketChart } from '../components/MarketChart';
import { TrendingUp, Package, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Inventory', value: '142', sub: '+12 this month', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Sales Volume', value: '$842,500', sub: '+5.4% vs last mo', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Network Views', value: '3,842', sub: 'High buyer interest', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Market Position', value: 'Top 5%', sub: 'Premium Wholesaler', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
        <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Merchant Dashboard</h1>
            <p className="text-slate-500">Welcome back, Arjun. Your inventory performance is up <span className="text-emerald-600 font-bold">12.5%</span> this week.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-xs font-semibold text-slate-500">{stat.sub}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <MarketChart />
                
                <div className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Recent Inquiries</h3>
                        <button className="text-indigo-600 text-sm font-bold">View All</button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                                        KB
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Karl Benz Jewels Inc.</p>
                                        <p className="text-xs text-slate-500">Interested in: 2.0ct Round Brilliant (SKU: 9422)</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900">$22,400 Offer</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 justify-end">
                                        <Clock className="w-3 h-3" /> 2h ago
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-4">GemVault Gold Member</h3>
                        <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                            Upgrade to Platinum to unlock AI-powered negotiation bots and global shipping insurance.
                        </p>
                        <button className="w-full bg-white text-indigo-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
                            Upgrade Now <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 text-white/10" />
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-8">
                    <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Market Alerts</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start p-3 rounded-2xl bg-rose-50 border border-rose-100">
                            <ArrowDownRight className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Lab-Grown Surplus</p>
                                <p className="text-xs text-slate-500">Expect 2-3% drop in 1-2ct range next week.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                            <ArrowUpRight className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Natural Blue Sapphire Rally</p>
                                <p className="text-xs text-slate-500">Unheated stones from Ceylon seeing record demand.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
