import React, { useState, useEffect } from 'react';
import { Navbar, PageType } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { NumbersPage } from './components/NumbersPage';
import { LiveFeed } from './components/LiveFeed';
import { About } from './components/About';
import { PrivacyPolicy, TermsOfService } from './components/Legal';
import { Contact } from './components/Contact';
import { StatusPage } from './components/StatusPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) setCurrentPage(event.state.page);
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: PageType) => {
    setCurrentPage(page);
    window.history.pushState({ page }, '', page === 'home' ? '/' : `#${page}`);
    window.scrollTo(0, 0);
  };

  // Determine Layout
  const isAppLayout = ['dashboard', 'numbers', 'feed'].includes(currentPage);

  if (isAppLayout) {
      return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <Toaster position="top-right" />
            <Sidebar currentPage={currentPage} onNavigate={navigate} />
            <main className="flex-1 lg:ml-72 transition-all duration-300">
                {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
                {currentPage === 'numbers' && <NumbersPage onNavigate={navigate} />}
                {currentPage === 'feed' && <LiveFeed />}
            </main>
        </div>
      );
  }

  // Website Layout
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar onNavigate={navigate} currentPage={currentPage} />
      
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && <Hero onStart={() => navigate('dashboard')} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsOfService />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'status' && <StatusPage />}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-1">
                    <span className="font-bold text-xl tracking-tight text-slate-900">Obanum</span>
                    <p className="mt-4 text-sm text-slate-500">Secure, temporary phone numbers for privacy.</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Product</h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><button onClick={() => navigate('numbers')} className="hover:text-indigo-600 transition-colors text-left">Numbers</button></li>
                        <li><button onClick={() => navigate('feed')} className="hover:text-indigo-600 transition-colors text-left">Live Feed</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Company</h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><button onClick={() => navigate('about')} className="hover:text-indigo-600 transition-colors text-left">About</button></li>
                        <li><button onClick={() => navigate('terms')} className="hover:text-indigo-600 transition-colors text-left">Terms</button></li>
                        <li><button onClick={() => navigate('privacy')} className="hover:text-indigo-600 transition-colors text-left">Privacy</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Support</h3>
                    <ul className="space-y-3 text-sm text-slate-500">
                        <li><button onClick={() => navigate('status')} className="hover:text-indigo-600 transition-colors text-left">System Status</button></li>
                        <li><button onClick={() => navigate('contact')} className="hover:text-indigo-600 transition-colors text-left">Contact Us</button></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Obanum. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;