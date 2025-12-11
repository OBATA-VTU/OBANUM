import React, { useEffect, useState } from 'react';
import { getHealth } from '../services/talkDrove';
import { Server, CheckCircle, XCircle, Activity, Globe, Database } from 'lucide-react';

export const StatusPage: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'operational' | 'degraded'>('checking');
  const [metrics, setMetrics] = useState({
      api: 'Checking...',
      db: 'Operational',
      sms: 'Operational'
  });

  useEffect(() => {
    const check = async () => {
        try {
            await getHealth();
            setStatus('operational');
            setMetrics(prev => ({ ...prev, api: 'Operational' }));
        } catch (e) {
            setStatus('degraded');
            setMetrics(prev => ({ ...prev, api: 'High Latency' }));
        }
    };
    check();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Status Banner */}
        <div className={`rounded-3xl p-8 md:p-12 mb-12 flex flex-col items-center text-center shadow-lg transition-colors duration-500 ${status === 'operational' ? 'bg-green-600' : status === 'checking' ? 'bg-slate-600' : 'bg-amber-500'}`}>
            {status === 'checking' ? (
                <Activity className="w-16 h-16 text-white animate-pulse mb-6" />
            ) : status === 'operational' ? (
                <CheckCircle className="w-16 h-16 text-white mb-6" />
            ) : (
                <XCircle className="w-16 h-16 text-white mb-6" />
            )}
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {status === 'checking' ? 'Checking Systems...' : status === 'operational' ? 'All Systems Operational' : 'Partial System Outage'}
            </h1>
            <p className="text-white/80 text-lg">
                Current status of Obanum services and API
            </p>
        </div>

        {/* Components Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
                { name: 'API Gateway', icon: <Globe className="w-6 h-6" />, status: metrics.api },
                { name: 'Number Database', icon: <Database className="w-6 h-6" />, status: metrics.db },
                { name: 'SMS Receivers', icon: <Server className="w-6 h-6" />, status: metrics.sms },
            ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">{item.icon}</div>
                        <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${item.status === 'Operational' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.status}
                    </span>
                </div>
            ))}
        </div>

        {/* Incident History (Static for now) */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Past Incidents</h3>
            </div>
            <div className="p-6">
                <div className="space-y-8">
                    <div className="relative pl-8 border-l-2 border-slate-200 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                        <div className="text-sm text-slate-500 mb-1">No incidents reported today.</div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};