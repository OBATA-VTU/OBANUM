import React from 'react';
import { LayoutDashboard, Phone, Radio, Activity } from 'lucide-react';
import { PageType } from './Navbar';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'numbers', label: 'Numbers', icon: Phone },
    { id: 'feed', label: 'Feed', icon: Radio },
    { id: 'status', label: 'Status', icon: Activity },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 lg:hidden px-4 pb-4 pt-2 pointer-events-none">
      <div className="bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex justify-around items-center px-2 py-3 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageType)}
              className={`
                relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300
                ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              {/* Active Background Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-2xl animate-pulse"></div>
              )}
              
              {/* Icon Container */}
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] -translate-y-1' : ''}`}>
                <item.icon className="w-6 h-6" />
              </div>
              
              {/* Label */}
              <span className={`text-[10px] font-bold mt-1 tracking-wide transition-opacity duration-300 ${isActive ? 'opacity-100 text-indigo-300' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>

              {/* Live Dot for Feed */}
              {item.id === 'feed' && !isActive && (
                 <span className="absolute top-2 right-3 w-2 h-2 bg-rose-500 rounded-full animate-pulse border border-[#0b0f19]"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
