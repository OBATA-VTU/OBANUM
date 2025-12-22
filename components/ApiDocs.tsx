import React from 'react';
import { Terminal, Copy, Globe, Shield, Code, Server, Zap, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export const ApiDocs: React.FC = () => {
  const UNIVERSAL_API_KEY = 'oban-pub-g8h7k3f9j2d5s1a6q0w4e8r2t5y7u3i1';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
      <pre className="bg-black p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
          {code}
      </pre>
  );

  return (
    <div className="min-h-screen bg-[#050911] text-slate-300 font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* Header */}
      <div className="bg-[#0b0f19] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                <Terminal className="w-3 h-3" /> Developer Hub v1.1
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
            
             {/* Authentication */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Key className="w-6 h-6 text-amber-500" /> Authentication
                </h2>
                <p className="text-slate-400 mb-6">
                    All API requests require authentication. Include your universal API key in the <code className="bg-slate-800/50 text-amber-400 px-1 py-0.5 rounded text-sm font-mono">Authorization</code> header as a Bearer token.
                </p>
                
                <div className="mt-6 bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-6">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Your API Key</h4>
                         <div className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-slate-800 mb-4">
                            <code className="text-amber-400 font-mono text-sm break-all">{UNIVERSAL_API_KEY}</code>
                            <button onClick={() => copyToClipboard(UNIVERSAL_API_KEY)} className="text-slate-500 hover:text-white transition-colors ml-4">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-xs font-bold text-center">
                            Monthly Limit: 50,000 Requests
                        </div>

                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 mt-6">Example Request (cURL)</h4>
                        <CodeBlock code={
`curl -X GET "https://obanum.vercel.app/api/proxy/numbers" \\
     -H "Authorization: Bearer ${UNIVERSAL_API_KEY}"`
                        } />
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
                    Retrieve a paginated list of available active numbers.
                </p>

                <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden mb-6">
                     <div className="flex items-center justify-between bg-black/30 px-6 py-4 border-b border-slate-800">
                        <code className="text-sm font-mono text-blue-300">/numbers</code>
                        <button onClick={() => copyToClipboard('https://obanum.vercel.app/api/proxy/numbers')} className="text-slate-500 hover:text-white">
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
                        <CodeBlock code={
`[
  {
    "id": 1402,
    "phone_number": "+12345678901",
    "country": "USA",
    "created_at": "2024-03-20T10:00:00Z"
  }
]`
                        } />
                    </div>
                </div>
            </section>

             {/* Endpoint: Get Messages by Number */}
             <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-bold font-mono">GET</span>
                    <h2 className="text-xl font-bold text-white">Get Messages by Number</h2>
                </div>
                <p className="text-slate-400 mb-6">
                    Fetch the latest messages received by a specific phone number.
                </p>

                <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden mb-6">
                     <div className="flex items-center justify-between bg-black/30 px-6 py-4 border-b border-slate-800">
                        <code className="text-sm font-mono text-blue-300">/otps/by-phone/{'{phoneNumber}'}</code>
                     </div>
                    <div className="p-6">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Response Example</h4>
                         <CodeBlock code={
`[
  {
    "id": 9921,
    "phone_number": "+12345678901",
    "otp_code": "48291",
    "message": "Your verification code is 48291",
    "platform": "WhatsApp",
    "created_at": "2024-03-20T10:05:00Z"
  }
]`
                        } />
                    </div>
                </div>
            </section>

            {/* Endpoint: Get Stats */}
            <section>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-bold font-mono">GET</span>
                    <h2 className="text-xl font-bold text-white">Get System Stats</h2>
                </div>
                <p className="text-slate-400 mb-6">
                    Returns real-time statistics about the Obanum network.
                </p>

                <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden mb-6">
                     <div className="flex items-center justify-between bg-black/30 px-6 py-4 border-b border-slate-800">
                        <code className="text-sm font-mono text-blue-300">/stats</code>
                     </div>
                    <div className="p-6">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Response Example</h4>
                         <CodeBlock code={
`{
  "numbers": 1452,
  "otps": 120531,
  "countries": 52
}`
                        } />
                    </div>
                </div>
            </section>

        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8 sticky top-8 h-fit">
            <div className="bg-[#0f1420] border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-500" /> Base URL
                </h3>
                <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 text-xs font-mono break-words">
                    https://obanum.vercel.app/api/proxy
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
        </aside>

      </div>
    </div>
  );
};
