import React, { useEffect, useState, useRef } from 'react';
import { TalkDroveNumber, TalkDroveOTP } from '../types';
import { getOTPsByPhone } from '../services/talkDrove';
import { RefreshCw, Copy, MessageSquare, Clock, Smartphone, Inbox, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface ActiveOrdersListProps {
    selectedNumber: TalkDroveNumber | null;
}

export const ActiveOrdersList: React.FC<ActiveOrdersListProps> = ({ selectedNumber }) => {
    const [messages, setMessages] = useState<TalkDroveOTP[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchMessages = async (showLoading = false) => {
        if (!selectedNumber) return;
        if (showLoading) setLoading(true);
        
        try {
            const data = await getOTPsByPhone(selectedNumber.phone_number);
            setMessages(data);
            setLastUpdated(new Date());
        } catch (error) {
            // Silently fail during polling
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    // Effect to handle number selection change
    useEffect(() => {
        setMessages([]); // Clear previous messages
        if (selectedNumber) {
            fetchMessages(true);
            
            // Start polling
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                fetchMessages(false);
            }, 5000); // Poll every 5 seconds
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [selectedNumber?.id]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    if (!selectedNumber) {
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 h-[600px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white z-0"></div>
                <div className="relative z-10">
                    <div className="bg-white p-6 rounded-full shadow-md mb-6 inline-block animate-float">
                        <Smartphone className="h-10 w-10 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Number Selected</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">Click on any number from the list to view its real-time SMS inbox.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 h-[600px] flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="p-5 border-b border-indigo-50 bg-gradient-to-r from-indigo-50 to-white z-10">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Live Inbox</span>
                        </div>
                        <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">{selectedNumber.phone_number}</h2>
                    </div>
                    <button 
                        onClick={() => copyToClipboard(selectedNumber.phone_number)}
                        className="p-2.5 bg-white hover:bg-indigo-50 rounded-xl transition-all border border-slate-200 hover:border-indigo-200 shadow-sm text-slate-500 hover:text-indigo-600"
                        title="Copy Number"
                    >
                        <Copy className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
                    <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Auto-updating
                    </span>
                    {lastUpdated && (
                        <span>Last check: {lastUpdated.toLocaleTimeString()}</span>
                    )}
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
                {loading && messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                        <RefreshCw className="h-8 w-8 animate-spin text-indigo-500" />
                        <span className="text-sm font-medium">Fetching messages...</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Inbox className="h-8 w-8 text-slate-300" />
                        </div>
                        <h4 className="text-slate-900 font-medium mb-1">Inbox is empty</h4>
                        <p className="text-xs text-slate-500 max-w-[200px]">Send an SMS to this number and it will appear here instantly.</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all animate-fade-in-up hover:border-indigo-200 group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-indigo-500 to-violet-500 text-white capitalize shadow-sm">
                                    {msg.platform !== 'Unknown' ? msg.platform : 'New Message'}
                                </span>
                                <div className="flex items-center text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            
                            {msg.otp_code && (
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-3 font-mono text-center text-2xl font-bold tracking-[0.2em] text-indigo-600 group-hover:scale-105 transition-transform">
                                    {msg.otp_code}
                                </div>
                            )}
                            
                            <div className="flex gap-3">
                                <div className="w-1 bg-slate-200 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    {msg.message || msg.sms_text}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Refresh Button (Manual) */}
            <div className="p-4 border-t border-slate-200 bg-white z-10">
                <button 
                    onClick={() => fetchMessages(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200 text-sm font-bold active:scale-[0.98]"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Check for new messages
                </button>
            </div>
        </div>
    );
};