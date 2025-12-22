import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Zap } from 'lucide-react';

export const OplugModalAd: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const adShown = sessionStorage.getItem('oplugModalAdShown');
        if (!adShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('oplugModalAdShown', 'true');
            }, 15000); // Show after 15 seconds of page activity

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-700/50 text-white relative overflow-hidden p-8 text-center"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-slate-800/50 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    title="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
                    <Zap className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                    Need a Quick Top-Up?
                </h2>
                <p className="text-slate-300 mb-8 max-w-sm mx-auto">
                    Get instant Data & Airtime for all Nigerian networks on our sister platform, Oplug. Fast, secure, and reliable.
                </p>

                <a
                    href="https://oplug.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all group"
                >
                    Visit Oplug Now <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
                 <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-300 mt-6 transition-colors"
                >
                    Maybe later
                </button>
            </div>
        </div>
    );
};
