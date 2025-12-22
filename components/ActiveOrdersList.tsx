import React, { useEffect, useState, useRef } from 'react';
import { TalkDroveNumber, TalkDroveOTP } from '../types';
import { getOTPsByPhone } from '../services/talkDrove';
import { RefreshCw, Copy, ArrowLeft, MessageSquare, Search, Clock, Shield, CheckCheck, X } from 'lucide-react';
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
            if(showLoading) toast.success("Inbox Updated");
        } catch (error) { 
            toast.error("Sync Error");
        } finally { 
            if (showLoading) setLoading(false); 
        }
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
        toast.success("Copied");
    };

    const filteredMessages = messages.filter(m => {
        const content = (m.message || m.sms_text || '').toLowerCase();
        const platform = (m.platform || '').toLowerCase();
        const search = searchMsg.toLowerCase();
        return content.includes(search) || platform.includes(search);
    });

    if (!selectedNumber) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full sm:h-[90vh] w-full max-w-4xl font-sans relative">
                
                {/* 1. Header (Chat App Style) */}
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img 
                                    src={getFlagUrl(selectedNumber.country)} 
                                    alt="flag" 
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                    {selectedNumber.phone_number}
                                    <button onClick={() => copyToClipboard(selectedNumber.phone_number)} className="text-slate-400 hover:text-indigo-600">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">Online • Auto-refreshing</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                         <button 
                            onClick={() => fetchMessages(true)}
                            className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                            title="Force Refresh"
                         >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                         </button>
                    </div>
                </div>

                {/* 2. Message Area */}
                <div className="flex-1 bg-[#e5ddd5] overflow-y-auto p-4 relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                        
                        {/* Empty State */}
                        {messages.length === 0 && !loading && (
                            <div className="flex flex-col items-center justify-center py-20 opacity-60">
                                <div className="bg-white/50 p-4 rounded-full mb-4">
                                    <MessageSquare className="w-8 h-8 text-slate-600" />
                                </div>
                                <p className="text-slate-600 font-medium">No messages received yet.</p>
                                <p className="text-slate-500 text-xs">Waiting for incoming SMS...</p>
                            </div>
                        )}

                        {loading && messages.length === 0 && (
                            <div className="flex justify-center py-10">
                                <div className="bg-white px-4 py-2 rounded-full shadow-sm text-xs font-bold text-slate-500 flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin"></div>
                                    Syncing History...
                                </div>
                            </div>
                        )}

                        {/* Message Bubbles */}
                        {filteredMessages.map((msg, idx) => (
                            <div key={idx} className="flex flex-col items-start animate-fade-in-up">
                                <div className="max-w-[85%] sm:max-w-[70%] bg-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.1)] relative group">
                                    {/* Triangle */}
                                    <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>

                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-50 gap-4">
                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                                            {msg.platform || 'Service'}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            {new Date(msg.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <p className="text-sm text-slate-800 leading-relaxed font-sans mb-3 break-words">
                                        {msg.message || msg.sms_text}
                                    </p>

                                    {/* OTP Highlight */}
                                    {msg.otp_code && (
                                        <div 
                                            onClick={() => copyToClipboard(msg.otp_code)}
                                            className="bg-slate-50 border-l-4 border-indigo-500 p-3 rounded-r-lg cursor-pointer hover:bg-indigo-50 transition-colors group/otp"
                                        >
                                            <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Verification Code</div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-mono font-bold text-slate-900 tracking-widest">{msg.otp_code}</span>
                                                <Copy className="w-4 h-4 text-slate-400 group-hover/otp:text-indigo-600" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Footer Info */}
                                    <div className="mt-2 flex items-center justify-end gap-1 opacity-50">
                                         <span className="text-[10px] text-slate-400">Read</span>
                                         <CheckCheck className="w-3 h-3 text-blue-500" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Search Footer */}
                <div className="bg-white p-3 border-t border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Filter messages..." 
                            className="w-full bg-slate-100 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={searchMsg}
                            onChange={e => setSearchMsg(e.target.value)}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};