import React, { useEffect, useState } from 'react';
import { getNumbers, getGlobalOTPs } from '../services/talkDrove';
import { Smartphone, Globe, Activity, Radio, ChevronRight, Zap } from 'lucide-react';

interface DashboardProps {
    onNavigate: (page: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({ numbers: 0, countries: 0, lastMsg: 'Loading...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
        try {
            const [nums, msgs] = await Promise.all([getNumbers(), getGlobalOTPs()]);
            const uniqueC = new Set(nums.map(n => n.country)).size;
            setStats({
                numbers: nums.length,
                countries: uniqueC,
                lastMsg: msgs[0] ? `${new Date(msgs[0].created_at).toLocaleTimeString()}` : 'No recent activity'
            });
        } catch (e) {
            // silent fallback
        } finally {
            setLoading(false);
        }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8 font-sans">
       <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Overview of available resources.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Numbers */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-slate-500">Active Numbers</div>
                            <div className="text-3xl font-bold text-slate-900 mt-1">
                                {loading ? '...' : stats.numbers}
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                            <Smartphone className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Countries */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-slate-500">Countries Available</div>
                            <div className="text-3xl font-bold text-slate-900 mt-1">
                                {loading ? '...' : stats.countries}
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                            <Globe className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Last Activity */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-slate-500">Last Message</div>
                            <div className="text-xl font-bold text-slate-900 mt-1 truncate">
                                {loading ? '...' : stats.lastMsg}
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                            <Radio className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Get a Number</h2>
                    <p className="text-slate-500 mb-6">Browse our inventory of temporary phone numbers for SMS verification.</p>
                    <button 
                        onClick={() => onNavigate('numbers')}
                        className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Browse Inventory <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Live Activity</h2>
                    <p className="text-slate-500 mb-6">Monitor global SMS traffic and recently received verification codes.</p>
                    <button 
                        onClick={() => onNavigate('feed')}
                        className="inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        View Feed <Activity className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Service Status List */}
            <div>
                <h3 className="text-sm font-bold text-slate-900 mb-4">Platform Availability</h3>
                <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                    {[
                        { name: 'WhatsApp', status: 'Online' },
                        { name: 'Telegram', status: 'Online' },
                        { name: 'Google', status: 'Online' },
                        { name: 'OpenAI', status: 'Online' },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="font-medium text-slate-700">{s.name}</span>
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{s.status}</span>
                        </div>
                    ))}
                </div>
            </div>

       </div>
    </div>
  );
};
