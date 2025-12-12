import React, { useEffect, useState, useRef } from 'react';
import { getGlobalOTPs } from '../services/talkDrove';
import { TalkDroveOTP } from '../types';
import { 
    RefreshCw, Search, Clock, Copy, Radio, 
    MessageSquare, Shield, Zap, Hash, CheckCircle2,
    Activity, Globe
} from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

export const LiveFeed: React.FC = () => {
  const [messages, setMessages] = useState<TalkDroveOTP[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchGlobal = async () => {
    if (isPaused) return;
    try {
      const data = await getGlobalOTPs();
      setMessages(data);
    } catch (e) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobal();
    intervalRef.current = setInterval(fetchGlobal, 4000); // 4s refresh
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!", {
        icon: '📋',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    });
  };

  const getTimeAgo = (dateStr: string) => {
      const diff = (new Date().getTime() - new Date(dateStr).getTime()) / 1000;
      if (diff < 10) return 'Just now';
      if (diff < 60) return `${Math.floor(diff)}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filtered = messages.filter(m => 
    m.phone_number.includes(searchTerm) || 
    (m.platform && m.platform.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-[#0b1120] min-h-screen text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
       <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12 relative">
            {/* Background Glow */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-500 font-mono text-xs font-bold tracking-widest uppercase bg-emerald-500/10 px-2 py-1 rounded">
                                System Live
                            </span>
                            {loading && <span className="text-slate-500 text-xs font-mono animate-pulse">Syncing...</span>}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Interception</span> Feed
                        </h1>
                        <p className="text-slate-400 text-lg mt-4 max-w-2xl leading-relaxed">
                            Real-time monitoring of incoming SMS traffic across our global network.
                            Paste your number below to filter the stream.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                        <div className="text-right px-2 hidden sm:block">
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Messages Parsed</div>
                            <div className="text-xl font-mono font-bold text-white">{messages.length > 0 ? messages.length : '...'}</div>
                        </div>
                        <div className="h-8 w-px bg-slate-700 mx-2 hidden sm:block"></div>
                         <button 
                            onClick={() => setIsPaused(!isPaused)}
                            className={`p-3 rounded-lg transition-all ${isPaused ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                            title={isPaused ? "Resume Feed" : "Pause Feed"}
                        >
                            {isPaused ? <Activity className="w-5 h-5" /> : <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />}
                        </button>
                    </div>
                </div>

                {/* SEARCH BAR HERO */}
                <div className="relative group z-20 max-w-3xl">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-slate-900 rounded-2xl p-2 flex items-center shadow-2xl">
                        <div className="pl-4 pr-3 text-slate-500">
                             <Search className="w-6 h-6" />
                        </div>
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Paste your number here to find SMS..."
                            className="w-full bg-transparent border-none text-white text-lg md:text-xl placeholder-slate-600 focus:ring-0 px-2 font-mono h-12"
                            // autoFocus removed
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="mr-2 p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* FEED CONTENT */}
        <div className="relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-slate-800 via-slate-800 to-transparent z-0"></div>

            {loading && messages.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-32 relative z-10">
                     <div className="relative mb-6">
                        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                        <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin relative z-10" />
                     </div>
                     <p className="text-slate-400 font-mono animate-pulse">Establishing Secure Socket Layer...</p>
                 </div>
            ) : filtered.length === 0 ? (
                // EMPTY STATE / ACTIVE LISTENING
                <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up relative z-10 pl-8 md:pl-0">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 animate-pulse rounded-full"></div>
                        <div className="relative w-24 h-24 bg-slate-900 rounded-3xl border border-slate-700 flex items-center justify-center shadow-xl">
                             {searchTerm ? (
                                 <Radio className="w-10 h-10 text-rose-500 animate-pulse" />
                             ) : (
                                 <Hash className="w-10 h-10 text-slate-600" />
                             )}
                        </div>
                        {searchTerm && (
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 rounded-full border border-slate-700 flex items-center justify-center">
                                <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
                            </div>
                        )}
                    </div>
                    
                    {searchTerm ? (
                        <div className="text-center max-w-lg">
                            <h3 className="text-2xl font-bold text-white mb-3">Listening for {searchTerm}</h3>
                            <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-4 py-2 rounded-full mb-4">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Connection Active
                            </div>
                            <p className="text-slate-400">
                                The system is scanning global gateways for packets directed to this number. 
                                <br/><span className="text-indigo-400 font-bold mt-2 block animate-pulse">Send the code now.</span>
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-300 mb-2">Feed Empty or Filtered</h3>
                            <p className="text-slate-500">Waiting for incoming traffic...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-8 relative z-10 pb-20">
                    {filtered.map((msg, idx) => {
                        const isNew = idx === 0 && !isPaused;
                        return (
                            <div key={`${msg.id}-${idx}`} className={`relative pl-12 md:pl-20 group ${isNew ? 'animate-fade-in-up' : ''}`}>
                                
                                {/* Timeline Dot */}
                                <div className="absolute left-1.5 md:left-[27px] top-6 md:top-8 w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10 group-hover:border-indigo-500/30 transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${isNew ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600 group-hover:bg-indigo-400'}`}></div>
                                </div>

                                {/* Card */}
                                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                                        
                                        {/* Phone Info */}
                                        <div className="flex items-center gap-4 min-w-[220px]">
                                             <div className="relative">
                                                <img 
                                                    src={getFlagUrl(msg.country || 'International')} 
                                                    alt={msg.country} 
                                                    className="w-14 h-14 rounded-2xl object-cover border border-slate-600/50 shadow-lg"
                                                />
                                                <div className="absolute -bottom-2 -right-2 bg-slate-900 text-xs font-bold text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                                                    {msg.country ? msg.country.slice(0,2).toUpperCase() : 'INT'}
                                                </div>
                                             </div>
                                            <div>
                                                <div className="font-mono font-bold text-white text-lg tracking-wide group-hover:text-indigo-400 transition-colors">
                                                    {msg.phone_number}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Globe className="w-3 h-3 text-slate-500" />
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{msg.country || 'Unknown'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message Content */}
                                        <div className="flex-1 w-full relative">
                                            {/* Meta Header */}
                                            <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${msg.platform && msg.platform !== 'Service' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-slate-700/50 text-slate-400 border-slate-600'}`}>
                                                        {msg.platform === 'Unknown' ? 'SMS Message' : msg.platform}
                                                    </span>
                                                    {isNew && (
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-900 uppercase">New</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-900/50 px-2 py-1 rounded">
                                                    <Clock className="w-3 h-3" />
                                                    {getTimeAgo(msg.created_at)}
                                                </div>
                                            </div>

                                            {/* Message Body */}
                                            <div className="relative bg-slate-900/50 rounded-xl p-4 border border-slate-800 group-hover:border-slate-700 transition-colors">
                                                <p className="text-slate-300 font-mono text-sm leading-relaxed break-all">
                                                    {msg.message || msg.sms_text}
                                                </p>
                                                
                                                {/* Smart OTP Detection / Display */}
                                                {msg.otp_code && (
                                                    <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Verification Code</span>
                                                            <div className="font-mono font-black text-3xl text-white tracking-widest drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                                                                {msg.otp_code}
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => copyToClipboard(msg.otp_code)}
                                                            className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/25 transform active:scale-95"
                                                        >
                                                            <Copy className="w-4 h-4" /> Copy
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

       </div>
    </div>
  );
};
