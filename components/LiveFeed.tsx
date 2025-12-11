import React, { useEffect, useState, useRef } from 'react';
import { getGlobalOTPs } from '../services/talkDrove';
import { TalkDroveOTP } from '../types';
import { RefreshCw, Search, Clock, Copy, Radio, MessageSquare, AlertCircle } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

export const LiveFeed: React.FC = () => {
  const [messages, setMessages] = useState<TalkDroveOTP[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchGlobal = async () => {
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
    intervalRef.current = setInterval(fetchGlobal, 5000);
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const filtered = messages.filter(m => 
    m.phone_number.includes(searchTerm) || 
    (m.platform && m.platform.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 p-6 lg:p-10">
       <div className="max-w-6xl mx-auto">
        
        {/* Header Area */}
        <div className="bg-slate-800 rounded-3xl p-8 mb-8 border border-slate-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 blur-[100px] opacity-20 rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        <Radio className="w-8 h-8 text-rose-500 animate-pulse" />
                        Global OTP Feed
                    </h1>
                    <p className="text-slate-400 max-w-lg">
                        This is the global scanning terminal. Paste the number you copied to filter the stream and find your SMS code.
                    </p>
                </div>

                <div className="w-full md:w-96 bg-slate-900 p-2 rounded-2xl border border-slate-700 flex items-center shadow-inner">
                    <Search className="w-5 h-5 text-slate-500 ml-3" />
                    <input 
                        type="text"
                        placeholder="Paste number here to search..."
                        className="bg-transparent border-none text-white placeholder-slate-500 w-full focus:ring-0 px-4 py-2 font-mono"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-slate-800 rounded-full text-slate-500">
                            <span className="sr-only">Clear</span>
                            x
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Feed List */}
        <div className="space-y-4">
            {loading && messages.length === 0 ? (
                 <div className="text-center py-20">
                     <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
                     <p className="text-slate-400">Synchronizing with global gateways...</p>
                 </div>
            ) : filtered.length === 0 ? (
                <div className="bg-slate-800/50 rounded-2xl p-12 text-center border border-slate-700 border-dashed">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No messages found</h3>
                    <p className="text-slate-500">
                        {searchTerm 
                            ? `We haven't received any new SMS for "${searchTerm}" yet.`
                            : "Waiting for incoming traffic..."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((msg) => (
                        <div key={msg.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all shadow-lg animate-fade-in-up">
                            <div className="flex flex-col lg:flex-row gap-6 items-start">
                                {/* Left: Info */}
                                <div className="flex items-center gap-4 min-w-[200px]">
                                     <img 
                                        src={getFlagUrl(msg.country || 'International')} 
                                        alt={msg.country} 
                                        className="w-12 h-12 rounded-xl object-cover border border-slate-600 bg-slate-700"
                                    />
                                    <div>
                                        <div className="font-mono font-bold text-white text-lg">{msg.phone_number}</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{msg.country}</div>
                                    </div>
                                </div>

                                {/* Center: Message */}
                                <div className="flex-1 w-full bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 relative group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{msg.platform === 'Unknown' ? 'SMS Message' : msg.platform}</span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                                            <Clock className="w-3 h-3" />
                                            {new Date(msg.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 font-mono text-sm leading-relaxed break-all pr-12">
                                        {msg.message || msg.sms_text}
                                    </p>

                                    {/* Copy Code Action */}
                                    {msg.otp_code && (
                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="bg-slate-800 text-white font-mono font-bold text-xl px-4 py-2 rounded-lg border border-slate-600 tracking-widest">
                                                {msg.otp_code}
                                            </div>
                                            <button 
                                                onClick={() => copyToClipboard(msg.otp_code)}
                                                className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                                            >
                                                <Copy className="w-4 h-4" /> Copy Code
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
    </div>
  );
};