import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Phone, Radio, Activity, LogOut, Menu, X, Smartphone, Shield, Wifi, UserCircle2 } from 'lucide-react';
import { PageType } from './Navbar';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');

  // Generate a fake session ID for the privacy aesthetic
  useEffect(() => {
    setSessionId(`ANON-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'numbers', label: 'Active Lines', icon: Phone },
    { id: 'feed', label: 'Global Intercept', icon: Radio },
    { id: 'status', label: 'System Health', icon: Activity },
  ];

  const handleNav = (page: string) => {
      onNavigate(page as PageType);
      setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900/90 backdrop-blur-md text-white rounded-xl shadow-2xl border border-slate-700"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-[#0b0f19] text-white z-40 transform transition-transform duration-300 ease-out border-r border-slate-800/50 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* 1. Brand / Logo Area */}
        <div className="h-24 flex items-center px-6 relative overflow-hidden">
             {/* Subtle glow effect behind logo */}
             <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full pointer-events-none"></div>
             
             <div className="flex items-center gap-4 relative z-10 cursor-pointer" onClick={() => handleNav('home')}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/30">
                    <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                    <span className="block text-2xl font-black tracking-tighter text-white">Obanum</span>
                    <span className="block text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase">Secure Gateway</span>
                </div>
             </div>
        </div>

        {/* 2. User / Session Card */}
        <div className="px-6 mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <UserCircle2 className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Guest Session</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 truncate">{sessionId}</div>
                </div>
            </div>
        </div>

        {/* 3. Navigation */}
        <div className="px-4 space-y-2">
            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 px-4">Navigation</div>
            
            {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`
                            w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                            ${isActive 
                                ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/10 text-white border border-indigo-500/30' 
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}
                        `}
                    >
                        {/* Active Indicator Bar */}
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_10px_#6366f1]"></div>}

                        <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span className={`font-medium relative z-10 ${isActive ? 'text-indigo-100 font-bold' : ''}`}>{item.label}</span>
                        
                        {item.id === 'feed' && (
                            <div className="ml-auto relative flex h-2 w-2 z-10">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </div>
                        )}
                        
                        {/* Hover Glow */}
                        <div className={`absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                    </button>
                );
            })}
        </div>

        {/* 4. Bottom Status Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-800 bg-[#0b0f19]">
            
            {/* Signal Strength Indicator */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Wifi className="w-4 h-4 text-emerald-500" />
                    Signal Strength
                </div>
                <div className="flex gap-1">
                    <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="w-1 h-3 bg-emerald-500/30 rounded-full"></div>
                </div>
            </div>

            {/* Connection Status Box */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                     <Shield className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Connection</div>
                    <div className="text-xs font-bold text-white">AES-256 Encrypted</div>
                </div>
            </div>
            
            <button 
                onClick={() => handleNav('home')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all text-sm font-bold group"
            >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                Disconnect
            </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};
