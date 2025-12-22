import React from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export type PageType = 'home' | 'dashboard' | 'numbers' | 'feed' | 'about' | 'terms' | 'privacy' | 'status' | 'contact' | 'docs';

interface NavbarProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = (page: PageType) => {
      onNavigate(page);
      setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <button 
              onClick={() => nav('home')}
              className="flex-shrink-0 flex items-center gap-2 group cursor-pointer outline-none"
            >
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600 drop-shadow-sm">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor" stroke="none" />
                    <path d="M12 18.5V12M12 12V5.5M12 12L17.5 15M12 12L6.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Obanum
              </span>
            </button>
            
            {/* Nav Links Desktop */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <button onClick={() => nav('home')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>
                Home
              </button>
              <button onClick={() => nav('about')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>
                About
              </button>
              <button onClick={() => nav('docs')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'docs' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>
                API
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-1 text-sm text-slate-500 mr-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="hidden xl:inline">Secure</span>
             </div>
             
             {/* Desktop CTA */}
             <div className="hidden md:block">
                <button 
                  onClick={() => nav('dashboard')} 
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
                >
                  Dashboard
                </button>
             </div>

             {/* Mobile Menu Button */}
             <button 
                className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-3 shadow-xl">
            <button onClick={() => nav('home')} className="block w-full text-left px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium">Home</button>
            <button onClick={() => nav('about')} className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">About</button>
            <button onClick={() => nav('docs')} className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">API</button>
            <button onClick={() => nav('dashboard')} className="block w-full text-left px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-md">Dashboard</button>
        </div>
      )}
    </nav>
  );
};