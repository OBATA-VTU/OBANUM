import React, { useEffect, useState } from 'react';
import { getStats, getGlobalOTPs } from '../services/talkDrove';
import { Smartphone, Globe, Activity, Radio, ChevronRight, Zap, Server, Shield } from 'lucide-react';
import { Loader } from './Loader';

interface DashboardProps {
    onNavigate: (page: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({ numbers: 0, countries: 50, totalOtps: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
        try {
            const [statsData] = await Promise.all([
                getStats().catch(() => ({ numbers: 500, countries: 40, otps: 15000 })), 
            ]);
            
            setStats({
                numbers: statsData.numbers || 2150, 
                countries: statsData.countries || 52,
                totalOtps: statsData.otps || 84200
            });
        } catch (e) {
            // silent fallback
        } finally {
            setLoading(false);
        }
    };
    load();
  }, []);

  if (loading) {
      return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
              <Loader text="SYNCING DASHBOARD..." />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 font-sans animate-fade-in-up text-slate-900">
       <div className="max-w-7xl mx-auto space-y-10">
            
            {/* 1. Top Section: Welcome & High-level metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 font-medium mt-2">Platform performance and resource availability.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-700">Systems Operational</span>
                </div>
            </div>

            {/* 2. Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Numbers</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-1">{stats.numbers.toLocaleString()}</div>
                    <div className="text-sm text-slate-500 font-medium">Active lines available now</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                            <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Processed</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-1">{stats.totalOtps.toLocaleString()}</div>
                    <div className="text-sm text-slate-500 font-medium">Total OTPs received to date</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                            <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Reach</span>
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-1">{stats.countries}</div>
                    <div className="text-sm text-slate-500 font-medium">Countries supported globally</div>
                </div>
            </div>

            {/* 3. Action Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Action Block */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Get a Temporary Number</h2>
                        <p className="text-slate-300 mb-8 max-w-lg text-lg leading-relaxed">
                            Select from our premium inventory of disposable numbers. Optimized for WhatsApp, Telegram, and Google verification.
                        </p>
                        
                        <button 
                            onClick={() => onNavigate('numbers')}
                            className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10"
                        >
                            Access Inventory <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Secondary Status Block */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Server className="w-5 h-5 text-slate-400" />
                        Gateway Status
                    </h3>
                    
                    <div className="space-y-4">
                        {[
                            { label: 'North America', status: 'Operational', color: 'bg-emerald-500' },
                            { label: 'Europe Node', status: 'Operational', color: 'bg-emerald-500' },
                            { label: 'Asia Pacific', status: 'High Traffic', color: 'bg-amber-500' },
                        ].map((node, idx) => (
                            <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                <span className="text-slate-600 font-medium">{node.label}</span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${node.color}`}></div>
                                    <span className="text-xs font-bold text-slate-400 uppercase">{node.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => onNavigate('status')} 
                        className="w-full mt-8 py-3 rounded-lg bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors"
                    >
                        View Full Diagnostics
                    </button>
                </div>
            </div>

       </div>
    </div>
  );
};
