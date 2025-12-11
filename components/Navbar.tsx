import React from 'react';
import { Smartphone, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
              <div className="relative">
                 <div className="absolute inset-0 bg-indigo-600 blur opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                 <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-1.5 rounded-lg shadow-sm">
                    <Smartphone className="h-6 w-6" />
                 </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">
                Obanum
              </span>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="text-slate-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#features" className="text-slate-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                How it Works
              </a>
              <a href="#faq" className="text-slate-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                FAQ
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-1 text-sm text-slate-500 mr-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure & Anonymous</span>
             </div>
             <button onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })} className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">
                Go to Dashboard
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};