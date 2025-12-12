import React, { useEffect, useState, useRef } from 'react';
import { getGlobalOTPs } from '../services/talkDrove';
import { TalkDroveOTP } from '../types';
import { RefreshCw, Search, Clock, Copy, Terminal, Shield, Lock } from 'lucide-react';
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
    } catch (e) { } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchGlobal();
    intervalRef.current = setInterval(fetchGlobal, 4000); 
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Decrypted code copied!");
  };

  const filtered = messages.filter(m => 
    m.phone_number.includes(searchTerm) || 
    (m.platform && m.platform.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-[#050911] min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30">
        
        {/* Header Overlay */}
        <div className="sticky top-0 z-30 bg-[#050911]/90 backdrop-blur-xl border-b border-slate-800/50">
            <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                Secure Message Stream
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </h1>
                            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Live Decryption Node • AES-256</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search digits..."
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-mono"
                            />
                        </div>
                        <button 
                            onClick={() => setIsPaused(!isPaused)}
                            className={`p-2 rounded-lg border transition-all ${isPaused ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                        >
                            {isPaused ? <Lock className="w-5 h-5" /> : <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Feed Stream */}
        <div className="max-w-5xl mx-auto px-4 py-8">
            {loading && messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-40">
                    <div className="font-mono text-indigo-400 animate-pulse text-sm">INITIALIZING SECURE LINK...</div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                    <div className="text-4xl mb-4">📡</div>
                    <div className="text-slate-500 font-mono">No packets detected matching filters.</div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((msg, idx) => (
                        <div key={`${msg.id}-${idx}`} className="group relative bg-slate-900/40 border border-slate-800/60 rounded-xl p-5 hover:bg-slate-900/80 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden">
                            
                            {/* Glow Effect on Hover */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Left: Identifier */}
                                <div className="flex items-center gap-4 min-w-[200px]">
                                    <img 
                                        src={getFlagUrl(msg.country || 'International')} 
                                        alt={msg.country} 
                                        className="w-10 h-10 rounded-lg object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div>
                                        <div className="font-mono text-lg text-slate-300 group-hover:text-white font-bold tracking-wide">
                                            {msg.phone_number}
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> {msg.country || 'Unknown'}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Payload */}
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-800 text-slate-400 border border-slate-700">
                                            {msg.platform || 'SMS'}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-600 font-mono">
                                            <Clock className="w-3 h-3" />
                                            {new Date(msg.created_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    
                                    <div className="font-mono text-sm text-slate-400 leading-relaxed break-all">
                                        {msg.message || msg.sms_text}
                                    </div>

                                    {/* Extracted Code */}
                                    {msg.otp_code && (
                                        <div className="mt-4 flex items-center justify-between bg-[#0b0f19] p-3 rounded-lg border border-slate-800 group-hover:border-indigo-500/20 transition-colors">
                                            <div className="font-mono text-xl font-black text-indigo-400 tracking-widest pl-2">
                                                {msg.otp_code}
                                            </div>
                                            <button 
                                                onClick={() => copyToClipboard(msg.otp_code)}
                                                className="p-2 hover:bg-slate-800 rounded text-slate-500 hover:text-white transition-colors"
                                                title="Copy Code"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};
