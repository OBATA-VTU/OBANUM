import React from 'react';
import { ShieldCheck, Zap, Globe, MessageSquare, UserCheck, CheckCircle2, Lock, Smartphone, Star, Play, Fingerprint, TrendingUp, Users, Server } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION: Split Layout with Human Image */}
      <div className="relative pt-10 pb-16 lg:pt-20 lg:pb-24 bg-slate-50 overflow-hidden">
         {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob delay-200"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                
                {/* Text Content */}
                <div className="max-w-2xl text-center lg:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 text-sm font-semibold mb-6 animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        #1 Privacy Platform for SMS
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 animate-fade-in-up delay-100">
                        Verify Accounts <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Without Your Number.</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed animate-fade-in-up delay-200">
                        Get instant access to real disposable phone numbers from USA, Nigeria, UK, and 50+ countries. Verify WhatsApp, Telegram, OpenAI, and more anonymously.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
                        <button
                            onClick={onStart}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-slate-900 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1"
                        >
                            <Smartphone className="w-5 h-5 mr-2" />
                            Get Free Number
                        </button>
                        <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300">
                            <Play className="w-5 h-5 mr-2 fill-current" />
                            See How it Works
                        </a>
                    </div>
                    
                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 animate-fade-in-up delay-300">
                        <div className="flex -space-x-2">
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt=""/>
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt=""/>
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt=""/>
                            <div className="h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs">+2k</div>
                        </div>
                        <p>Trusted by 2,000+ daily users</p>
                    </div>
                </div>

                {/* Hero Image / Graphic */}
                <div className="relative animate-fade-in-up delay-300 perspective-1000">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-y-[-5deg] hover:rotate-0 transition-transform duration-700">
                        <img 
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000" 
                            alt="Happy woman using smartphone for verification" 
                            className="w-full h-[600px] object-cover"
                        />
                        {/* Overlay Card */}
                        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <MessageSquare className="w-5 h-5 fill-current" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-bold uppercase">New Message</div>
                                        <div className="font-bold text-slate-900">WhatsApp Code</div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Just now</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                                <span className="text-2xl font-mono font-bold tracking-[0.2em] text-slate-800">849-201</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl animate-float-delayed">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/120px-WhatsApp.svg.png" alt="WhatsApp" className="w-12 h-12"/>
                    </div>
                    <div className="absolute top-1/2 -right-16 bg-white p-4 rounded-2xl shadow-xl animate-float">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png" alt="Instagram" className="w-12 h-12"/>
                    </div>
                    <div className="absolute bottom-20 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-float-delayed">
                         <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png" alt="Facebook" className="w-12 h-12"/>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 2. STATS STRIP (New Section) */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
                <div className="p-2">
                    <div className="text-4xl font-black text-indigo-400 mb-1">50+</div>
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Countries</div>
                </div>
                <div className="p-2">
                    <div className="text-4xl font-black text-indigo-400 mb-1">10k+</div>
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Daily OTPs</div>
                </div>
                <div className="p-2">
                    <div className="text-4xl font-black text-indigo-400 mb-1">99.9%</div>
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Uptime</div>
                </div>
                <div className="p-2">
                    <div className="text-4xl font-black text-indigo-400 mb-1">0$</div>
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">Cost to You</div>
                </div>
            </div>
        </div>
      </div>

      {/* 3. GLOBAL REACH - FLAG GRID */}
      <div className="bg-white py-16 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">
                Active Numbers Available In 50+ Countries
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {[
                    {name: 'United States', code: 'us'},
                    {name: 'United Kingdom', code: 'gb'},
                    {name: 'Nigeria', code: 'ng'},
                    {name: 'Canada', code: 'ca'},
                    {name: 'Venezuela', code: 've'},
                    {name: 'Kyrgyzstan', code: 'kg'},
                    {name: 'France', code: 'fr'},
                    {name: 'Germany', code: 'de'},
                    {name: 'India', code: 'in'},
                    {name: 'Brazil', code: 'br'}
                ].map((c) => (
                    <div key={c.code} className="flex flex-col items-center gap-2 group cursor-default">
                        <img 
                            src={getFlagUrl(c.name)} 
                            alt={c.name}
                            className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-slate-100 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600">{c.name}</span>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* 4. SUPPORTED SERVICES GRID */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Works With All Major Platforms</h2>
                <p className="text-lg text-slate-600">
                    Our numbers are optimized to receive OTPs from the world's most popular services. Bypasses SMS verification instantly.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[
                    { name: 'WhatsApp', color: 'bg-green-50 text-green-600', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/120px-WhatsApp.svg.png' },
                    { name: 'Facebook', color: 'bg-blue-50 text-blue-600', icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png' },
                    { name: 'Google', color: 'bg-white text-slate-600', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
                    { name: 'Instagram', color: 'bg-pink-50 text-pink-600', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png' },
                    { name: 'Telegram', color: 'bg-sky-50 text-sky-600', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/150px-Telegram_logo.svg.png' },
                    { name: 'TikTok', color: 'bg-slate-100 text-slate-900', icon: 'https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png' },
                    { name: 'PayPal', color: 'bg-indigo-50 text-indigo-700', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/150px-PayPal.svg.png' },
                    { name: 'OpenAI', color: 'bg-emerald-50 text-emerald-700', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/150px-OpenAI_Logo.svg.png' },
                    { name: 'Amazon', color: 'bg-orange-50 text-orange-600', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/150px-Amazon_logo.svg.png' },
                    { name: 'Twitter / X', color: 'bg-slate-900 text-white', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/150px-X_icon_2.svg.png' },
                ].map((service) => (
                    <div key={service.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-4 group">
                        <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center p-3`}>
                             <img src={service.icon} alt={service.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-indigo-600">{service.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 5. TESTIMONIALS (New Section) */}
      <div className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 sm:text-4xl mb-16">Loved by Privacy Enthusiasts</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        text: "I needed a US number to verify my Discord account without using my personal phone. Obanum worked instantly.",
                        author: "Sarah J.",
                        role: "Freelancer",
                        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
                    },
                    {
                        text: "As a developer, I test SMS flows constantly. This site is a lifesaver. The Nigeria numbers are super reliable.",
                        author: "David O.",
                        role: "Software Engineer",
                        img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100"
                    },
                    {
                        text: "Traveling through Europe and needed a local number for app verifications. Saved me from buying a SIM card.",
                        author: "Elena M.",
                        role: "Digital Nomad",
                        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100"
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-2xl relative">
                        <div className="flex gap-1 text-yellow-400 mb-4">
                            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-slate-700 italic mb-6">"{item.text}"</p>
                        <div className="flex items-center gap-4">
                            <img src={item.img} alt={item.author} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <div className="font-bold text-slate-900">{item.author}</div>
                                <div className="text-xs text-slate-500">{item.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 6. FEATURES GRID */}
      <div id="features" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center md:text-left">
                    <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto md:mx-0">
                        <Fingerprint className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Anonymous Verification</h3>
                    <p className="text-slate-600 leading-relaxed">Protect your identity. Use our numbers to verify accounts without exposing your personal phone number to third parties.</p>
                </div>
                <div className="text-center md:text-left">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 mx-auto md:mx-0">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast OTP</h3>
                    <p className="text-slate-600 leading-relaxed">Our optimized infrastructure ensures that SMS codes arrive within 5-10 seconds of being sent by the service.</p>
                </div>
                <div className="text-center md:text-left">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto md:mx-0">
                        <Globe className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Global Numbers</h3>
                    <p className="text-slate-600 leading-relaxed">Access a diverse pool of numbers from North America, Europe, Asia, and Africa. New numbers added daily.</p>
                </div>
            </div>
        </div>
      </div>

      {/* 7. HOW IT WORKS */}
      <div id="how-it-works" className="bg-slate-900 py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900 to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start Receiving SMS in Seconds</h2>
            <p className="mt-4 text-indigo-200">No account required. No credit card needed.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
                 { step: '01', title: 'Choose Country', desc: 'Select from our wide range of countries including USA, Nigeria, UK, and more.' },
                 { step: '02', title: 'Pick a Number', desc: 'Select an active phone number from the dashboard list.' },
                 { step: '03', title: 'Receive Code', desc: 'Use the number and watch the verification code appear instantly.' }
             ].map((item, i) => (
                 <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors">
                     <div className="text-6xl font-black text-slate-800 mb-4">{item.step}</div>
                     <div className="text-xl font-bold text-white mb-2 relative -mt-10">{item.title}</div>
                     <p className="text-slate-400">{item.desc}</p>
                 </div>
             ))}
          </div>
        </div>
      </div>

      {/* 8. FAQ Section */}
      <div id="faq" className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-slate-900 text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">?</div>
                    Is Obanum completely free?
                </h3>
                <p className="text-slate-600 ml-10">Yes! We provide free temporary phone numbers. We are supported by ads, so we don't charge users anything.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">?</div>
                    Do I need to register?
                </h3>
                <p className="text-slate-600 ml-10">No registration or login is required. We believe in complete anonymity. Just select a number and start using it.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 9. CTA Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
              Ready to protect your privacy?
            </h2>
            <button
                onClick={onStart}
                className="rounded-full bg-white px-10 py-4 text-xl font-bold text-indigo-600 shadow-2xl hover:bg-slate-100 hover:scale-105 transition-all"
              >
                Go to Dashboard
            </button>
        </div>
      </div>
    </div>
  );
};