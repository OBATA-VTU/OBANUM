import React, { useEffect, useState, useRef } from 'react';
import { TalkDroveNumber, TalkDroveOTP } from '../types';
import { getOTPsByPhone } from '../services/talkDrove';
import { RefreshCw, Copy, Radio, Lock, MessageSquare, Search } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

interface ActiveOrdersListProps {
    selectedNumber: TalkDroveNumber | null;
}

export const ActiveOrdersList: React.FC<ActiveOrdersListProps> = ({ selectedNumber }) => {
    const [messages, setMessages] = useState<TalkDroveOTP[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchMsg, setSearchMsg] = useState('');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchMessages = async (showLoading = false) => {
        if (!selectedNumber) return;
        if (showLoading) setLoading(true);
        try {
            const data = await getOTPsByPhone(selectedNumber.phone_number);
            setMessages(data); 
        } catch (error) { } finally { if (showLoading) setLoading(false); }
    };

    // Auto-refresh logic
    useEffect(() => {
        setMessages([]); 
        
        if (selectedNumber) {
            fetchMessages(true);
            
            // Interval for data fetch
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                fetchMessages(false);
            }, 5000);
        }
        
        return () => { 
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [selectedNumber?.id]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Code copied!");
    };

    const filteredMessages = messages.filter(m => {
        const content = (m.message || m.sms_text || '').toLowerCase();
        const platform = (m.platform || '').toLowerCase();
        const search = searchMsg.toLowerCase();
        return content.includes(search) || platform.includes(search);
    });

    if (!selectedNumber) return null;

    return (
        <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[650px] w-full max-w-2xl mx-auto font-sans relative">
            
            {/* Header: Chat Info */}
            <div className="bg-slate-900 pt-6 pb-4 px-6 border-b border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                    <img 
                        src={getFlagUrl(selectedNumber.country)} 
                        alt={selectedNumber.country} 
                        className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover"
                    />
                    <div>
                        <div className="font-mono font-bold text-white text-xl tracking-wide flex items-center gap-2">
                            {selectedNumber.phone_number}
                            <button onClick={() => copyToClipboard(selectedNumber.phone_number)} className="text-slate-500 hover:text-white transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold mt-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            Online
                        </div>
                    </div>
                </div>

                {/* Message Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search messages..."
                        value={searchMsg}
                        onChange={(e) => setSearchMsg(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0f172a] scroll-smooth">
                {loading && messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-3">
                        <Radio className="w-8 h-8 animate-pulse text-indigo-500" />
                        <span className="text-xs font-mono uppercase tracking-widest">Checking for messages...</span>
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 text-slate-600 border border-slate-800">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h3 className="text-slate-400 font-bold mb-1">
                            {searchMsg ? 'No matches found' : 'Inbox Empty'}
                        </h3>
                        <p className="text-slate-600 text-xs font-mono max-w-xs">
                            {searchMsg ? `No SMS contains "${searchMsg}"` : 'New messages will appear here automatically.'}
                        </p>
                    </div>
                ) : (
                    filteredMessages.map((msg, idx) => (
                        <div key={idx} className="flex flex-col items-start max-w-[95%] animate-fade-in-up">
                            <div className="bg-slate-800 p-4 rounded-xl rounded-tl-none border border-slate-700 text-slate-300 text-sm shadow-sm w-full">
                                <div className="flex justify-between items-start mb-2 border-b border-slate-700/50 pb-2">
                                     <div className="font-bold text-indigo-400 text-xs uppercase tracking-wider flex items-center gap-2">
                                        {msg.platform || 'SMS'}
                                     </div>
                                     <span className="text-slate-600 font-mono text-[10px]">{new Date(msg.created_at).toLocaleTimeString()}</span>
                                </div>
                                
                                <div className="font-mono leading-relaxed mb-3 text-slate-300 break-words">
                                    {msg.message || msg.sms_text}
                                </div>
                                
                                {msg.otp_code && (
                                    <div 
                                        onClick={() => copyToClipboard(msg.otp_code)}
                                        className="bg-[#050911] border border-slate-700 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-0.5">Code</span>
                                            <span className="font-mono text-xl font-bold text-white tracking-widest">{msg.otp_code}</span>
                                        </div>
                                        <Copy className="w-4 h-4 text-slate-600 hover:text-white transition-colors" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-center text-[10px] text-slate-600 font-mono gap-2 uppercase tracking-wider">
                <Lock className="w-3 h-3" /> Secure Connection
            </div>
        </div>
    );
};