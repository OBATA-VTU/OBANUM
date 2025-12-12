import React from 'react';
import { LayoutDashboard, Phone, Radio, Activity, LogOut } from 'lucide-react';
import { PageType } from './Navbar';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'numbers', label: 'Numbers', icon: Phone },
    { id: 'feed', label: 'Live Feed', icon: Radio },
    { id: 'status', label: 'Status', icon: Activity },
  ];

  const handleNav = (page: string) => {
      onNavigate(page as PageType);
  };

  return (
    <>
      {/* Sidebar Container - Hidden on Mobile, Visible on LG+ */}
      <div className={`
        hidden lg:block fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-40
      `}>
        {/* 1. Brand / Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
             <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xl font-bold text-slate-900 tracking-tight">Obanum</span>
             </div>
        </div>

        {/* 3. Navigation */}
        <div className="p-4 space-y-1 mt-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Menu</div>
            
            {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium
                            ${isActive 
                                ? 'bg-indigo-50 text-indigo-700' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                        `}
                    >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>

        {/* 4. Bottom Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-100 bg-slate-50/50">
            <button 
                onClick={() => handleNav('home')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 transition-all text-sm font-medium shadow-sm"
            >
                <LogOut className="w-4 h-4" /> 
                Exit to Home
            </button>
        </div>
      </div>
    </>
  );
};