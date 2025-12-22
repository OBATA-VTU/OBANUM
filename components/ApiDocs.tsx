import React from 'react';
import { Terminal, Copy, Globe, Shield, Code, Server, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export const ApiDocs: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Endpoint copied!");
  };

  return (
    <div className="min-h-screen bg-[#050911] text-slate-300 font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* Header */}
      <div className="bg-[#0b0f19] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                <Terminal className="w-3 h-3" /> Developer Hub v1.0
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Obanum <span className="text-indigo-500">API</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                Integrate Obanum's global SMS network directly into your applications. 
                Our high-performance REST API allows you to programmatically fetch numbers and receive OTPs.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
            
            {/* Quick Start */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-500" /> Quick Start
                </h2>
                <div className="prose prose-invert max-w-none text-slate-400">
                    <p>
                        The Obanum API is designed to be simple and stateless. All requests are made to the base URL.
                        Responses are returned in JSON format.
                    </p>
                </div>
                
                <div className="mt-6 bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden">
                    <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 uppercase">Base URL</span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                        </div>
                    </div>
                    <div className="p-6 font-mono text-sm">
                        <div className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-slate-800">
                            <code className="text-emerald-400">https://obanum.vercel.app/api/proxy</code>
                            <button onClick={() => copyToClipboard('https://obanum.vercel.app/api/proxy')} className="text-slate-500 hover:text-white transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Endpoint: Get Numbers */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-bold font-mono">GET</span>
                    <h2 className="text-xl font-bold text-white">List Phone Numbers</h2>
                </div>
                <p className="text-slate-400 mb-6">
                    Retrieve a paginated list of available active numbers. You can filter by country using query parameters.
                </p>

                <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden mb-6">
                     <div className="flex items-center justify-between bg-black/30 px-6 py-4 border-b border-slate-800">
                        <code className="text-sm font-mono text-blue-300">/numbers</code>
                        <button onClick={() => copyToClipboard('/numbers')} className="text-slate-500 hover:text-white">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-6">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Parameters</h4>
                        <div className="space-y-2 mb-6">
                            <div className="grid grid-cols-12 gap-4 text-sm border-b border-slate-800 pb-2 mb-2 text-slate-500 font-mono">
                                <div className="col-span-3">Name</div>
                                <div className="col-span-2">Type</div>
                                <div className="col-span-7">Description</div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 text-sm items-center">
                                <div className="col-span-3 font-mono text-indigo-400">page</div>
                                <div className="col-span-2 text-slate-500">integer</div>
                                <div className="col-span-7 text-slate-400">Page number (default: 1)</div>
                            </div>
                             <div className="grid grid-cols-12 gap-4 text-sm items-center">
                                <div className="col-span-3 font-mono text-indigo-400">limit</div>
                                <div className="col-span-2 text-slate-500">integer</div>
                                <div className="col-span-7 text-slate-400">Items per page (max: 100)</div>
                            </div>
                        </div>

                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Response Example</h4>
                        <pre className="bg-black p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
{`{
  "data": [
    {
      "id": 1402,
      "phone_number": "+12345678901",
      "country": "USA",
      "created_at": "2024-03-20T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 500
  }
}`}
                        </pre>
                    </div>
                </div>
            </section>

             {/* Endpoint: Get Messages */}
             <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-bold font-mono">GET</span>
                    <h2 className="text-xl font-bold text-white">Get Latest OTPs</h2>
                </div>
                <p className="text-slate-400 mb-6">
                    Fetch the real-time stream of incoming messages across the entire network.
                </p>

                <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden mb-6">
                     <div className="flex items-center justify-between bg-black/30 px-6 py-4 border-b border-slate-800">
                        <code className="text-sm font-mono text-blue-300">/otps/latest</code>
                        <button onClick={() => copyToClipboard('/otps/latest')} className="text-slate-500 hover:text-white">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-6">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Response Example</h4>
                        <pre className="bg-black p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
{`{
  "data": [
    {
      "id": 9921,
      "phone_number": "+12345678901",
      "otp_code": "48291",
      "message": "Your verification code is 48291",
      "platform": "WhatsApp",
      "created_at": "2024-03-20T10:05:00Z"
    }
  ]
}`}
                        </pre>
                    </div>
                </div>
            </section>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
            <div className="bg-[#0f1420] border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-500" /> Access Policy
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    The Obanum API is currently in <strong>Public Beta</strong>. No authentication key is required for read-only access to public numbers.
                </p>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-bold">
                    Rate Limit: 60 req/min
                </div>
            </div>

            <div className="bg-[#0f1420] border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-500" /> SDKs
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    Official client libraries are coming soon.
                </p>
                <div className="space-y-2">
                    <button disabled className="w-full flex items-center justify-between p-3 bg-black/40 rounded border border-slate-800 text-slate-500 text-xs font-mono cursor-not-allowed">
                        <span>Node.js</span>
                        <span>Coming Soon</span>
                    </button>
                    <button disabled className="w-full flex items-center justify-between p-3 bg-black/40 rounded border border-slate-800 text-slate-500 text-xs font-mono cursor-not-allowed">
                        <span>Python</span>
                        <span>Coming Soon</span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
