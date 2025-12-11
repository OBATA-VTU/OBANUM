import React from 'react';
import { ShieldCheck, Zap, Globe, MessageSquare, UserCheck, CheckCircle2, Lock, Smartphone, Star } from 'lucide-react';

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero Section with 3D Mockup and Gradient Blobs */}
      <div className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 bg-slate-50">
        
        {/* Background Gradients/Blobs with Animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-100"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-200"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mx-auto max-w-4xl">
             <div className="animate-fade-in-up">
                 <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-8 backdrop-blur-sm shadow-sm">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live System Status: Online
                 </span>
             </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-8 animate-fade-in-up delay-100 drop-shadow-sm">
              Privacy Protection <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">Made Simple.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed animate-fade-in-up delay-200">
              Obanum gives you instant access to temporary phone numbers for SMS verification. Keep your personal number private from apps and services.
            </p>
            <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center gap-4 animate-fade-in-up delay-300">
              <button
                onClick={onStart}
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 md:text-xl transition-all shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1"
              >
                Get Free Number
              </button>
              <a href="#how-it-works" className="mt-3 w-full flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-medium rounded-full text-slate-700 bg-white/80 backdrop-blur-sm hover:bg-white md:mt-0 md:text-xl transition-all shadow-sm hover:shadow-md">
                View Features
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-x-8 gap-y-4 flex-wrap text-sm text-slate-500 font-medium animate-fade-in-up delay-300">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-100 shadow-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> No Registration</span>
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-100 shadow-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> Instant SMS</span>
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-100 shadow-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> 100% Free</span>
            </div>
          </div>
          
          {/* CSS Mockup of the App */}
          <div className="mt-20 relative animate-fade-in-up delay-300 perspective-1000">
             <div className="relative mx-auto max-w-5xl rounded-2xl shadow-2xl bg-white border border-slate-200 p-2 transform rotate-x-12 rotate-y-0 hover:rotate-0 transition-transform duration-1000 ease-out z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-6 bg-slate-800 rounded-b-xl flex justify-center items-center gap-2 z-20 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                    <div className="w-8 h-1 rounded-full bg-slate-700"></div>
                </div>
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 h-[400px] flex flex-col">
                    {/* Mock Browser Header */}
                    <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex-1 text-center text-xs text-slate-400 bg-slate-100 mx-4 py-1.5 rounded-md font-mono flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3 text-slate-400" />
                            obanum.com/dashboard
                        </div>
                    </div>
                    {/* Mock Content */}
                    <div className="p-6 grid grid-cols-12 gap-6 h-full bg-slate-50/50">
                        {/* Sidebar Mock */}
                        <div className="col-span-4 space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-16 rounded-lg border shadow-sm flex items-center p-3 gap-3 transition-all ${i===1 ? 'bg-white border-indigo-200 ring-2 ring-indigo-50 transform scale-105' : 'bg-white/60 border-slate-100'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${i===1 ? 'bg-gradient-to-br from-indigo-500 to-violet-500' : 'bg-slate-200'}`}>
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5 flex-1">
                                        <div className={`h-2 rounded w-3/4 ${i===1 ? 'bg-indigo-100' : 'bg-slate-200'}`}></div>
                                        <div className="h-1.5 bg-slate-100 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Main Content Mock */}
                        <div className="col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col relative overflow-hidden">
                             {/* Abstract Message List */}
                             <div className="flex justify-between items-center mb-6">
                                <div className="w-32 h-5 bg-slate-100 rounded-full"></div>
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"><Star className="w-4 h-4 fill-current"/></div>
                             </div>
                             <div className="space-y-4 flex-1">
                                <div className="bg-indigo-50/50 p-4 rounded-2xl rounded-tl-none border border-indigo-100 animate-pulse">
                                    <div className="flex justify-between mb-2">
                                        <div className="w-20 h-3 bg-indigo-200 rounded-full"></div>
                                        <div className="w-10 h-3 bg-indigo-100 rounded-full"></div>
                                    </div>
                                    <div className="w-full h-12 bg-white rounded-xl border border-indigo-100 flex items-center justify-center text-2xl font-mono tracking-widest font-bold text-indigo-600 shadow-sm">
                                        748 392
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 opacity-60">
                                    <div className="w-full h-2 bg-slate-200 rounded mb-2"></div>
                                    <div className="w-2/3 h-2 bg-slate-200 rounded"></div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
             {/* Decorative Elements behind Mockup */}
             <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
             <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          </div>

        </div>
      </div>

      {/* 2. Stats Section */}
      <div className="bg-slate-900 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/50 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 text-center sm:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="text-base leading-7 text-indigo-200 font-medium">Total SMS Received</div>
              <div className="order-first text-4xl font-extrabold tracking-tight text-white sm:text-6xl">1.2M+</div>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="text-base leading-7 text-indigo-200 font-medium">Countries Supported</div>
              <div className="order-first text-4xl font-extrabold tracking-tight text-white sm:text-6xl">50+</div>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="text-base leading-7 text-indigo-200 font-medium">Active Users</div>
              <div className="order-first text-4xl font-extrabold tracking-tight text-white sm:text-6xl">250k+</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Features Section */}
      <div id="features" className="py-24 bg-white sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Premium Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything needed for verification
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We provide a seamless experience for developers, testers, and privacy-conscious individuals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col bg-slate-50 rounded-3xl p-8 hover:bg-white glass-card-hover border border-slate-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  Anonymous & Secure
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Your privacy is our priority. We don't log your personal IP for verification and numbers are refreshed regularly to ensure anonymity.</p>
                </dd>
              </div>
              <div className="flex flex-col bg-slate-50 rounded-3xl p-8 hover:bg-white glass-card-hover border border-slate-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
                    <Zap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  Instant Delivery
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Our optimized network ensures SMS codes arrive within seconds. No more waiting around for OTPs to expire.</p>
                </dd>
              </div>
              <div className="flex flex-col bg-slate-50 rounded-3xl p-8 hover:bg-white glass-card-hover border border-slate-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
                    <Globe className="h-6 w-6" aria-hidden="true" />
                  </div>
                  Global Coverage
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">Access numbers from USA, UK, Canada, China, France, Germany and 40+ other countries at the click of a button.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 4. How It Works Section */}
      <div id="how-it-works" className="bg-slate-50 py-24 sm:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How Obanum Works</h2>
            <p className="mt-4 text-lg text-slate-500">Get your verification code in 3 simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             <div className="glass-panel p-8 rounded-3xl relative hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-slate-50">1</div>
                <div className="mt-6 mb-4 flex justify-center text-indigo-500">
                    <Globe className="h-16 w-16 opacity-80" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Number</h3>
                <p className="text-slate-500">Browse our dashboard and choose a phone number from your desired country.</p>
             </div>
             
             <div className="glass-panel p-8 rounded-3xl relative hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-slate-50">2</div>
                <div className="mt-6 mb-4 flex justify-center text-indigo-500">
                    <UserCheck className="h-16 w-16 opacity-80" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Use Service</h3>
                <p className="text-slate-500">Enter the selected number into the app or website (WhatsApp, Facebook, etc.) requiring verification.</p>
             </div>
             
             <div className="glass-panel p-8 rounded-3xl relative hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-slate-50">3</div>
                <div className="mt-6 mb-4 flex justify-center text-indigo-500">
                    <MessageSquare className="h-16 w-16 opacity-80" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Receive SMS</h3>
                <p className="text-slate-500">Wait a few seconds. The verification code will appear instantly on the Obanum dashboard.</p>
             </div>
          </div>
        </div>
      </div>

      {/* 5. Supported Services Grid */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold leading-8 text-slate-900 mb-12">
                Works flawlessly with top platforms
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                {['WhatsApp', 'Telegram', 'Google', 'OpenAI', 'Facebook', 'Instagram', 'Twitter', 'TikTok', 'Amazon', 'PayPal'].map((service) => (
                    <div key={service} className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 text-center font-semibold text-slate-400 text-xl flex items-center justify-center bg-slate-50 py-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default border border-transparent hover:border-indigo-100">
                        {service}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 6. FAQ Section */}
      <div id="faq" className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-slate-900 text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-500"/> Is Obanum really free?</h3>
                <p className="text-slate-600 ml-7">Yes, Obanum is 100% free to use. We are supported by non-intrusive advertisements on our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-500"/> How long do the numbers last?</h3>
                <p className="text-slate-600 ml-7">Numbers are temporary and disposable. They may be active for a few days to a few weeks depending on usage.</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors hover:shadow-md">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-500"/> Do I need to register?</h3>
                <p className="text-slate-600 ml-7">No. You can use Obanum instantly without providing any email, phone number, or personal information.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. CTA Section */}
      <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-pulse-soft">
              Ready to protect your privacy?
              <br />
              Start using Obanum today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              Join thousands of users who trust Obanum for their online verification needs. Fast, free, and secure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={onStart}
                className="rounded-full bg-white px-8 py-3.5 text-lg font-bold text-indigo-600 shadow-2xl hover:bg-indigo-50 hover:shadow-white/20 transition-all transform hover:-translate-y-1"
              >
                Get a Number Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};