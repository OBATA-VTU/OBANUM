import React, { useState, useEffect } from 'react';
import { Zap, X, ArrowUpRight } from 'lucide-react';

export const OplugAd: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(true);

    useEffect(() => {
        const dismissedInSession = sessionStorage.getItem('oplugAdDismissed_v2');
        if (!dismissedInSession) {
            setIsDismissed(false);
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000); // Show after a longer 5-second delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent link click if 'x' is clicked
        setIsVisible(false);
        sessionStorage.setItem('oplugAdDismissed_v2', 'true');
        setTimeout(() => {
            setIsDismissed(true);
        }, 300);
    };

    if (isDismissed) {
        return null;
    }

    return (
        <div 
            className={`
                fixed bottom-6 right-6 z-50 w-[340px] transition-all duration-500 ease-in-out
                ${isVisible ? 'transform-none opacity-100' : 'translate-y-10 opacity-0'}
            `}
        >
            <a 
                href="https://oplug.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/40 border border-slate-700/50 overflow-hidden group"
            >
                <div 
                    className="h-32 bg-cover bg-center relative"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=600')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <button 
                        onClick={handleDismiss} 
                        className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full text-slate-300 hover:bg-black/70 hover:text-white transition-colors"
                        title="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl text-white flex-shrink-0 flex items-center justify-center shadow-lg">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-300">Sponsored</div>
                            <h4 className="font-bold text-white leading-tight">Oplug VTU Services</h4>
                        </div>
                    </div>
                </div>
                
                <div className="p-4">
                    <p className="text-sm text-slate-300 mb-4">
                        Need instant Data or Airtime? Top up any network in Nigeria securely on our sister platform.
                    </p>
                    <div
                        className="w-full text-center bg-indigo-600 group-hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        Get Started on Oplug <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </div>
                </div>
            </a>
        </div>
    );
};
