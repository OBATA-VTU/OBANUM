import React from 'react';
import { Shield, Globe, Users, Lock } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900 to-transparent opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            We Protect Your Digital Identity
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Obanum is on a mission to provide accessible, secure, and anonymous communication tools for everyone, everywhere.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                    Why we built Obanum
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    In an age where every app and service demands your personal phone number, privacy has become a luxury. We believe it should be a fundamental right.
                </p>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    We created Obanum to give users a shield against spam, data harvesting, and identity theft. Whether you are a developer testing apps, a traveler needing local verification, or a privacy enthusiast, we provide the tools you need to stay anonymous.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-8" alt="Team meeting" />
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-xl w-full h-64 object-cover mt-8" alt="Office vibe" />
            </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
                <p className="text-base font-semibold leading-7 text-indigo-600">Our Values</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Built on Trust & Transparency</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Shield className="w-8 h-8 text-indigo-600" />,
                        title: 'Privacy First',
                        desc: 'We do not store messages longer than necessary. Your personal data is never linked to the temporary numbers you use.'
                    },
                    {
                        icon: <Globe className="w-8 h-8 text-indigo-600" />,
                        title: 'Global Access',
                        desc: 'We are constantly expanding our network to provide numbers from every continent, ensuring you can verify services anywhere.'
                    },
                    {
                        icon: <Users className="w-8 h-8 text-indigo-600" />,
                        title: 'Community Driven',
                        desc: 'Obanum remains free thanks to our community. We build features based on what our users actually need.'
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};