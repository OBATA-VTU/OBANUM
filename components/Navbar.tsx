import React from 'react';
import { Smartphone, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export type PageType = 'home' | 'dashboard' | 'numbers' | 'feed' | 'about' | 'terms' | 'privacy' | 'status' | 'contact';

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
    <nav className="bg-white/90 backdrop-blur-md border-b border-indigo-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <button 
              onClick={() => nav('home')}
              className="flex-shrink-0 flex items-center gap-2 group cursor-pointer outline-none"
            >
              <div className="relative">
                 <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-1.5 rounded-lg shadow-sm">
                    <Smartphone className="h-6 w-6" />
                 </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">
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
              <button onClick={() => nav('contact')} className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === 'contact' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>
                Contact
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-1 text-sm text-slate-500 mr-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="hidden xl:inline">Secure & Anonymous</span>
             </div>
             
             {/* Desktop CTA */}
             <div className="hidden md:block">
                <button 
                  onClick={() => nav('dashboard')} 
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                  Launch App
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
            <button onClick={() => nav('contact')} className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">Contact</button>
            <button onClick={() => nav('dashboard')} className="block w-full text-left px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-md">Launch App</button>
        </div>
      )}
    </nav>
  );
};