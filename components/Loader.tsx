import React from 'react';

interface LoaderProps {
    text?: string;
    progress?: number;
}

export const Loader: React.FC<LoaderProps> = ({ text = "SYSTEM INITIALIZING...", progress }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm">
    <div className="w-full max-w-sm px-8">
        
        {/* Spinner Icon */}
        <div className="relative w-16 h-16 mb-8 mx-auto">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-indigo-400/20 rounded-full"></div>
            <div className="absolute inset-4 border-4 border-transparent border-b-indigo-400 rounded-full animate-spin-reverse"></div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col items-center gap-2 mb-6">
            <div className="text-indigo-900 font-black text-xl tracking-tight">
                {progress !== undefined ? `${Math.round(progress)}%` : ''}
            </div>
            <div className="text-indigo-600 font-mono text-xs font-bold animate-pulse tracking-[0.2em] uppercase text-center">
                {text}
            </div>
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 animate-pulse"></div>
                </div>
            </div>
        )}

        {/* Deco dots */}
        <div className="flex gap-1 justify-center mt-4 opacity-50">
            <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-0"></div>
            <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
        </div>
    </div>

    <style>{`
      @keyframes spin-reverse {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      .animate-spin-reverse {
        animation: spin-reverse 1s linear infinite;
      }
    `}</style>
  </div>
);
