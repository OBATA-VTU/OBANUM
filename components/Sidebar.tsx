import React, { useState } from 'react';
import { LayoutDashboard, Phone, Radio, Activity, LogOut, Menu, X, Smartphone, Shield } from 'lucide-react';
import { PageType } from './Navbar';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'numbers', label: 'All Numbers', icon: Phone },
    { id: 'feed', label: 'Global OTP Feed', icon: Radio },
    { id: 'status', label: 'System Status', icon: Activity },
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-slate-900 text-white z-40 transform transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">Obanum<span className="text-indigo-500">App</span></span>
             </div>
        </div>

        {/* Navigation */}
        <div className="p-6 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Menu</div>
            
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`
                        w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group
                        ${currentPage === item.id 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                    `}
                >
                    <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'feed' && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    )}
                </button>
            ))}
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Shield className="w-8 h-8 text-emerald-500" />
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Connection</div>
                    <div className="text-sm font-bold text-emerald-400">Encrypted</div>
                </div>
            </div>
            
            <button 
                onClick={() => handleNav('home')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-bold"
            >
                <LogOut className="w-4 h-4" /> Exit to Website
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