import React, { useEffect, useState, useRef } from 'react';
import { TalkDroveNumber, TalkDroveOTP } from '../types';
import { getOTPsByPhone } from '../services/talkDrove';
import { RefreshCw, Copy, Smartphone, Shield, Clock, Check, MessageSquare, AlertCircle, Radio } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

interface ActiveOrdersListProps {
    selectedNumber: TalkDroveNumber | null;
}

export const ActiveOrdersList: React.FC<ActiveOrdersListProps> = ({ selectedNumber }) => {
    const [messages, setMessages] = useState<TalkDroveOTP[]>([]);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch messages
    const fetchMessages = async (showLoading = false) => {
        if (!selectedNumber) return;
        if (showLoading) setLoading(true);
        
        try {
            const data = await getOTPsByPhone(selectedNumber.phone_number);
            setMessages(data); 
        } catch (error) {
            // Silently fail during polling
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    // Initial Load & Polling
    useEffect(() => {
        setMessages([]); 
        
        if (selectedNumber) {
            fetchMessages(true);
            
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                fetchMessages(false);
            }, 4000); 
        }
        
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [selectedNumber?.id]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Code copied!");
    };

    if (!selectedNumber) return null;

    return (
        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[700px] w-full relative">
            
            {/* Dark Mode Header */}
            <div className="bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10 shadow-lg shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600">
                        <img 
                            src={getFlagUrl(selectedNumber.country)} 
                            alt={selectedNumber.country} 
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                             <h2 className="font-mono font-bold text-2xl text-white tracking-wider shadow-black drop-shadow-md">
                                {selectedNumber.phone_number}
                            </h2>
                            <button 
                                onClick={() => copyToClipboard(selectedNumber.phone_number)}
                                className="text-slate-400 hover:text-white transition-colors bg-slate-700 p-1.5 rounded-lg"
                                title="Copy Number"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 text-sm mt-1">
                            <span className="text-slate-400 font-medium">{selectedNumber.country}</span>
                            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Live Connection</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => fetchMessages(true)}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-xl transition-all border border-slate-600 group shadow-lg"
                    title="Refresh Messages"
                >
                    <RefreshCw className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Messages Feed */}
            <div 
                ref={containerRef}
                className="flex-1 bg-slate-900 overflow-y-auto p-4 sm:p-6 space-y-4 relative scroll-smooth"
            >
                {loading && messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                         <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                            <Radio className="w-16 h-16 text-indigo-500 animate-pulse relative z-10" />
                         </div>
                        <span className="text-sm font-mono tracking-widest uppercase">Establishing Secure Link...</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-10">
                        <div className="w-32 h-32 rounded-full border border-slate-700 flex items-center justify-center mb-8 relative">
                             <div className="absolute w-full h-full border-2 border-indigo-500/30 rounded-full animate-ping"></div>
                             <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center z-10">
                                 <Radio className="w-10 h-10 text-indigo-400" />
                             </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Waiting for Signal</h3>
                        <p className="text-slate-400 text-center max-w-sm leading-relaxed text-sm">
                            System is monitoring for incoming SMS packets.<br/>
                            <span className="text-indigo-400">Send your code now.</span>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition-colors animate-fade-in-up shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                                
                                <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-slate-700 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-slate-600">
                                                {msg.platform !== 'Unknown' && msg.platform !== 'Service' ? msg.platform : 'Incoming SMS'}
                                            </span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                                                <Clock className="w-3 h-3" />
                                                {new Date(msg.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        
                                        <p className="text-slate-300 text-sm leading-relaxed font-mono">
                                            {msg.message || msg.sms_text}
                                        </p>
                                    </div>

                                    {/* Prominent OTP Box */}
                                    {msg.otp_code && (
                                        <div className="flex-shrink-0 w-full sm:w-auto">
                                            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center gap-2 min-w-[140px] group-hover:border-indigo-500/50 transition-colors">
                                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Verification Code</span>
                                                <div className="text-4xl font-mono font-black text-white tracking-widest drop-shadow-lg">
                                                    {msg.otp_code}
                                                </div>
                                                <button 
                                                    onClick={() => copyToClipboard(msg.otp_code)}
                                                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1 mt-1"
                                                >
                                                    <Copy className="w-3 h-3" /> Copy Code
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Status Bar */}
            <div className="bg-slate-800 border-t border-slate-700 px-6 py-3 text-xs text-slate-400 flex justify-between items-center shrink-0 font-mono">
                <span className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Encrypted Connection
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Live Feed Active
                </span>
            </div>
        </div>
    );
};