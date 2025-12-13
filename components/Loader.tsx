import React from 'react';

export const Loader: React.FC<{ text?: string }> = ({ text = "ESTABLISHING UPLINK..." }) => (
  <div className="flex flex-col items-center justify-center py-20 w-full h-full min-h-[300px]">
    <div className="relative w-16 h-16 mb-6">
      <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-4 border-4 border-indigo-400/20 rounded-full"></div>
      <div className="absolute inset-4 border-4 border-transparent border-b-indigo-400 rounded-full animate-spin-reverse"></div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <div className="text-indigo-600 font-mono text-sm font-bold animate-pulse tracking-[0.2em]">
        {text}
      </div>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-0"></div>
        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
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
