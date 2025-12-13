import React, { useEffect, useState, useRef } from 'react';
import { TalkDroveNumber, TalkDroveOTP } from '../types';
import { getOTPsByPhone } from '../services/talkDrove';
import { RefreshCw, Copy, Radio, Lock, MessageSquare, Search, Clock, Globe, Shield, Terminal, Hash, X } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

interface ActiveOrdersListProps {
    selectedNumber: TalkDroveNumber | null;
    onClose: () => void;
}

export const ActiveOrdersList: React.FC<ActiveOrdersListProps> = ({ selectedNumber, onClose }) => {
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

    useEffect(() => {
        setMessages([]); 
        if (selectedNumber) {
            fetchMessages(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => { fetchMessages(false); }, 5000);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [selectedNumber?.id]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const filteredMessages = messages.filter(m => {
        const content = (m.message || m.sms_text || '').toLowerCase();
        const platform = (m.platform || '').toLowerCase();
        const search = searchMsg.toLowerCase();
        return content.includes(search) || platform.includes(search);
    });

    if (!selectedNumber) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col h-[85vh] w-full max-w-4xl font-sans relative">
                
                {/* Header Area */}
                <div className="bg-slate-900 text-white p-6 border-b border-slate-800 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-red-600 transition-colors z-10"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        {/* Number Info */}
                        <div className="flex items-center gap-4">
                            <img 
                                src={getFlagUrl(selectedNumber.country)} 
                                alt={selectedNumber.country} 
                                className="w-16 h-16 rounded-2xl border-4 border-slate-800 shadow-lg object-cover"
                            />
                            <div>
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                                    {selectedNumber.country} • Secure Line
                                </div>
                                <div className="text-3xl md:text-4xl font-mono font-bold tracking-tight flex items-center gap-3">
                                    {selectedNumber.phone_number}
                                    <button 
                                        onClick={() => copyToClipboard(selectedNumber.phone_number)}
                                        className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 transition-colors"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Filter by service name, code, or content..."
                            value={searchMsg}
                            onChange={(e) => setSearchMsg(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-indigo-500 transition-all font-mono"
                        />
                    </div>
                </div>

                {/* Content Area - Data List */}
                <div className="flex-1 bg-slate-50 overflow-y-auto p-4 md:p-6 space-y-4">
                    {loading && messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                             <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                             <div className="text-sm font-bold tracking-widest uppercase">Decrypting incoming packets...</div>
                        </div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-60">
                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <Hash className="w-10 h-10" />
                            </div>
                            <h3 className="text-slate-600 font-bold">Inbox Empty</h3>
                            <p className="text-slate-400 text-sm max-w-xs text-center mt-2">
                                Waiting for SMS... <br/> Use this number on your service now.
                            </p>
                        </div>
                    ) : (
                        filteredMessages.map((msg, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up hover:shadow-md transition-all">
                                
                                {/* Card Header: Metadata */}
                                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wide border border-indigo-100">
                                            {msg.platform || 'System'}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                                            <Clock className="w-3 h-3" />
                                            {new Date(msg.created_at).toLocaleTimeString()}
                                        </span>
                                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 border-l border-slate-200 pl-3">
                                            <Globe className="w-3 h-3" />
                                            {msg.country || selectedNumber.country}
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-400">
                                        ID: #{msg.id}
                                    </div>
                                </div>

                                {/* Card Body: Content */}
                                <div className="p-5 flex flex-col md:flex-row gap-6 items-start">
                                    
                                    {/* The Code (Main Focus) */}
                                    {msg.otp_code && (
                                        <div 
                                            onClick={() => copyToClipboard(msg.otp_code)}
                                            className="bg-[#0b0f19] text-white p-4 rounded-xl min-w-[140px] text-center cursor-pointer group hover:bg-indigo-600 transition-colors relative overflow-hidden"
                                        >
                                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 group-hover:text-indigo-200">OTP Code</div>
                                            <div className="text-2xl font-mono font-bold tracking-widest">{msg.otp_code}</div>
                                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl"></div>
                                        </div>
                                    )}

                                    {/* Raw Message */}
                                    <div className="flex-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                            <Terminal className="w-3 h-3" /> Raw Message
                                        </div>
                                        <div className="font-mono text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 break-words">
                                            {msg.message || msg.sms_text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                {/* Footer */}
                <div className="bg-white border-t border-slate-200 p-3 flex justify-center">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Shield className="w-3 h-3" /> TLS 1.3 Encrypted Connection
                     </div>
                </div>
            </div>
        </div>
    );
};
