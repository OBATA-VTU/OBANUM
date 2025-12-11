
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';

function App() {
  const [view, setView] = useState<'home' | 'dashboard'>('home');

  const scrollToDashboard = () => {
    setView('dashboard');
    setTimeout(() => {
        const el = document.getElementById('dashboard-container');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero onStart={scrollToDashboard} />
        
        {/* We keep the dashboard mounted but potentially hidden or just below content depending on flow. 
            Here we render it below the hero/landing page content. */}
        <div id="dashboard-container" className="border-t border-slate-200 bg-slate-50">
             <Dashboard />
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-1">
                    <span className="font-bold text-xl tracking-tight text-slate-900">Obanum</span>
                    <p className="mt-4 text-sm text-slate-500">
                        Providing secure, temporary phone numbers for privacy-conscious users worldwide.
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Product</h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-blue-600">Numbers</a></li>
                        <li><a href="#features" className="hover:text-blue-600">Features</a></li>
                        <li><a href="#api" className="hover:text-blue-600">API</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Company</h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-blue-600">About</a></li>
                        <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                        <li><a href="#" className="hover:text-blue-600">Legal</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Support</h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-600">Status</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Obanum. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="text-slate-400 text-sm">Privacy Policy</span>
                    <span className="text-slate-400 text-sm">Terms of Service</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
