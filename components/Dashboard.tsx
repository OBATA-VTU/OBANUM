import React, { useEffect, useState } from 'react';
import { getNumbers, getHealth, getStats } from '../services/talkDrove';
import { TalkDroveNumber } from '../types';
import { Loader2, Search, Smartphone, Globe, RefreshCcw, Filter, Signal, Activity, Server, AlertCircle, CheckCircle } from 'lucide-react';
import { ActiveOrdersList } from './ActiveOrdersList'; // We will use this as the Inbox view
import toast, { Toaster } from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const [numbers, setNumbers] = useState<TalkDroveNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState<TalkDroveNumber | null>(null);
  
  // Diagnostics State
  const [health, setHealth] = useState<{status: string; message?: string} | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [diagLoading, setDiagLoading] = useState(true);
  
  // Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  
  // Derive unique countries from the fetched numbers
  const countries = ['All', ...Array.from(new Set(numbers.map(n => n.country))).filter(Boolean).sort()];

  const fetchNumbersData = async () => {
    setLoading(true);
    try {
      // Fetch numbers. 
      const data = await getNumbers(selectedCountry === 'All' ? undefined : selectedCountry);
      setNumbers(data);
    } catch (error) {
      toast.error("Failed to load numbers.");
    } finally {
      setLoading(false);
    }
  };

  const runDiagnostics = async () => {
    setDiagLoading(true);
    try {
        // 1. Check Health
        try {
            const h = await getHealth();
            setHealth({ status: 'ok', message: h.message || 'Server reachable' });
        } catch (e: any) {
            setHealth({ status: 'error', message: e.message || 'Unreachable' });
        }

        // 2. Check Stats (Auth check)
        try {
            const s = await getStats();
            setStats(s);
        } catch (e) {
            setStats(null);
        }

    } finally {
        setDiagLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbersData();
    runDiagnostics();
  }, [selectedCountry]);

  // Filter numbers client-side for search term
  const filteredNumbers = numbers.filter(n => 
    n.phone_number.includes(searchTerm) || 
    n.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="dashboard">
      <Toaster position="top-right" />
      
      {/* System Diagnostics Panel */}
      <div className="mb-8 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm animate-fade-in-up">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> System Diagnostics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Health Check */}
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${health?.status === 'ok' ? 'bg-green-100 text-green-600' : health?.status === 'error' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Server className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs text-slate-400 font-medium">API Health</div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {diagLoading ? 'Checking...' : health?.status === 'ok' ? <span className="text-green-600">Online</span> : <span className="text-red-600">Offline</span>}
                    </div>
                </div>
            </div>

            {/* Stats Check */}
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stats ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Signal className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs text-slate-400 font-medium">Total Messages</div>
                    <div className="text-sm font-bold text-slate-900">
                         {diagLoading ? '...' : stats ? (stats.total_messages || stats.messages_count || 'Active') : 'Unavailable'}
                    </div>
                </div>
            </div>

             {/* Connection Status */}
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${numbers.length > 0 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    {numbers.length > 0 ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
                <div>
                    <div className="text-xs text-slate-400 font-medium">Number Pool</div>
                    <div className="text-sm font-bold text-slate-900">
                         {loading ? 'Loading...' : `${numbers.length} Available`}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 animate-fade-in-up delay-100">
        <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h2>
            <p className="text-slate-500 mt-1">Select a number below to receive SMS instantly.</p>
        </div>
        <button 
            onClick={() => { fetchNumbersData(); runDiagnostics(); }}
            className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-white border border-indigo-100 px-5 py-2.5 rounded-full hover:bg-indigo-50 transition-colors shadow-sm hover:shadow-md"
        >
            <RefreshCcw className={`h-4 w-4 ${loading || diagLoading ? 'animate-spin' : ''}`} />
            Refresh All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Number List */}
        <div className="lg:col-span-2 space-y-6">
            
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-100">
            <div className="flex-1 relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search number or country..." 
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="relative min-w-[200px]">
                <Globe className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                    className="w-full pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-slate-50 focus:bg-white cursor-pointer"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Filter className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Number Grid */}
          {loading ? (
             <div className="flex h-64 items-center justify-center bg-white rounded-2xl border border-slate-100">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                    <span className="text-slate-400 text-sm">Loading numbers...</span>
                </div>
             </div>
          ) : filteredNumbers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up delay-200">
                {filteredNumbers.map(num => (
                    <button
                        key={num.id}
                        onClick={() => setSelectedNumber(num)}
                        className={`group relative flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 ${
                            selectedNumber?.id === num.id 
                            ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-white ring-1 ring-indigo-500 shadow-md transform scale-[1.02]' 
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1'
                        }`}
                    >
                        <div className="z-10 relative">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedNumber?.id === num.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>{num.country}</span>
                            </div>
                            <div className="font-mono text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                                {num.phone_number}
                            </div>
                            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-green-600 font-medium">Online & Receiving</span>
                            </div>
                        </div>
                        <div className={`p-3.5 rounded-full transition-all duration-300 ${selectedNumber?.id === num.id ? 'bg-indigo-600 shadow-lg shadow-indigo-200' : 'bg-slate-50 group-hover:bg-indigo-50'}`}>
                            <Smartphone className={`h-6 w-6 ${selectedNumber?.id === num.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                        </div>
                    </button>
                ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No numbers found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
                <div className="mt-4 text-xs text-red-400 bg-red-50 p-2 rounded border border-red-100 inline-block">
                    Status: {health?.status === 'error' ? 'API Unreachable (404/Network Error)' : 'Connected but list empty'}
                </div>
                <br/>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCountry('All'); fetchNumbersData();}}
                    className="text-indigo-600 font-bold mt-4 hover:text-indigo-800 transition-colors"
                >
                    Clear filters & Retry
                </button>
            </div>
          )}
        </div>

        {/* Right Column: Inbox */}
        <div className="lg:col-span-1 animate-fade-in-up delay-300">
            <div className="sticky top-24">
                <ActiveOrdersList selectedNumber={selectedNumber} />
            </div>
        </div>
      </div>
    </div>
  );
};
