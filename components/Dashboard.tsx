import React, { useEffect, useState } from 'react';
import { getNumbers, getGlobalOTPs } from '../services/talkDrove';
import { Smartphone, Globe, Activity, Radio, ArrowRight } from 'lucide-react';

interface DashboardProps {
    onNavigate: (page: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({ numbers: 0, countries: 0, lastMsg: 'Scanning...' });

  useEffect(() => {
    const load = async () => {
        try {
            const [nums, msgs] = await Promise.all([getNumbers(), getGlobalOTPs()]);
            const uniqueC = new Set(nums.map(n => n.country)).size;
            setStats({
                numbers: nums.length,
                countries: uniqueC,
                lastMsg: msgs[0] ? `${new Date(msgs[0].created_at).toLocaleTimeString()} - ${msgs[0].platform}` : 'No recent activity'
            });
        } catch (e) {}
    };
    load();
  }, []);

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-slate-50">
       <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 mb-10">Here is what is happening on the Obanum network today.</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Smartphone className="w-32 h-32 text-indigo-600 transform -rotate-12" />
                    </div>
                    <div className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-2">Active Lines</div>
                    <div className="text-5xl font-black text-slate-900 mb-4">{stats.numbers || '...'}</div>
                    <button onClick={() => onNavigate('numbers')} className="text-sm font-bold text-slate-900 flex items-center gap-1 hover:gap-2 transition-all">
                        View All Numbers <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe className="w-32 h-32 text-purple-600 transform rotate-12" />
                    </div>
                    <div className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-2">Countries</div>
                    <div className="text-5xl font-black text-slate-900 mb-4">{stats.countries || '...'}</div>
                    <div className="text-sm text-slate-400">Global Coverage</div>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden text-white">
                     <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Activity className="w-32 h-32 text-emerald-400" />
                    </div>
                    <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">System Status</div>
                    <div className="text-5xl font-black mb-4">99.9%</div>
                    <div className="text-sm text-slate-400">Operational</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white flex flex-col justify-between items-start shadow-2xl shadow-indigo-500/20">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Need a number now?</h3>
                        <p className="text-indigo-100 mb-8 max-w-sm">Select from our list of free numbers to bypass verification instantly.</p>
                    </div>
                    <button 
                        onClick={() => onNavigate('numbers')}
                        className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                        Pick a Number
                    </button>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900">Live Traffic</h3>
                        </div>
                        <p className="text-slate-500 mb-8">
                            Latest activity: <span className="font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded">{stats.lastMsg}</span>
                        </p>
                    </div>
                    <button 
                        onClick={() => onNavigate('feed')}
                        className="w-full bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                        Go to Global Feed
                    </button>
                </div>
            </div>
       </div>
    </div>
  );
};