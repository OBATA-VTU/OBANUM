import React, { useEffect, useState } from 'react';
import { getHealth } from '../services/talkDrove';
import { CheckCircle2, AlertTriangle, Globe, Database, Server } from 'lucide-react';

export const StatusPage: React.FC = () => {
  const [status, setStatus] = useState<'operational' | 'degraded'>('operational');

  useEffect(() => {
    getHealth().catch(() => setStatus('degraded'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">System Status</h1>
            <p className="text-slate-500">Current operational status of Obanum services.</p>
        </div>

        {/* Main Status Indicator */}
        <div className={`
            p-8 rounded-xl border flex items-center gap-6 mb-8
            ${status === 'operational' ? 'bg-white border-slate-200' : 'bg-amber-50 border-amber-200'}
        `}>
            <div className={`p-4 rounded-full ${status === 'operational' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {status === 'operational' ? <CheckCircle2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900">
                    {status === 'operational' ? 'All Systems Operational' : 'Performance Degraded'}
                </h2>
                <p className="text-slate-500 mt-1">
                    Last checked: {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>

        {/* Component Grid */}
        <div className="space-y-4">
            {[
                { name: 'API Gateway', icon: Globe, status: 'Operational' },
                { name: 'Database Clusters', icon: Database, status: 'Operational' },
                { name: 'Web Server', icon: Server, status: 'Operational' },
            ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-slate-400" />
                        <div className="font-medium text-slate-900">{item.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-emerald-600">{item.status}</span>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};
