import React, { useState, useEffect } from 'react';
import { Shield, Key, Terminal, Save, Activity, CheckCircle2, AlertTriangle, Users, Lock, Server } from 'lucide-react';
import { API_KEY } from '../constants';

export const AdminPanel: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [customKey, setCustomKey] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    
    useEffect(() => {
        const storedKey = localStorage.getItem('OBANUM_CUSTOM_API_KEY');
        if (storedKey) setCustomKey(storedKey);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123' || password === 'root') {
            setIsAuthenticated(true);
            addLog("System access granted. User: root");
            addLog("Initializing secure protocols...");
        } else {
            alert('Access Denied');
        }
    };

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    };

    const saveKey = () => {
        if (customKey) {
            localStorage.setItem('OBANUM_CUSTOM_API_KEY', customKey);
            addLog(`API Key updated. Value ending in ...${customKey.slice(-4)}`);
            alert('Key Saved. Reload the app for changes to take full effect.');
        }
    };

    const clearStorage = () => {
        localStorage.clear();
        addLog("Local storage purged.");
        alert('Storage cleared.');
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                            <Shield className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white text-center mb-2">Restricted Access</h1>
                    <p className="text-slate-400 text-center mb-6 text-sm">Enter administrative credentials to proceed.</p>
                    
                    <input 
                        type="password" 
                        placeholder="Enter Passcode"
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl mb-4 focus:border-red-500 outline-none font-mono"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
                        Authenticate
                    </button>
                    <p className="text-center text-slate-600 text-xs mt-4">IP Logged: {Math.random().toString(36).substring(7)}</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-mono p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Terminal className="w-6 h-6 text-emerald-500" />
                            System Administration
                        </h1>
                        <p className="text-slate-500 mt-1">v2.4.0 • root@obanum-core</p>
                    </div>
                    <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-sm">Logout</button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* API Configuration */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Key className="w-5 h-5 text-amber-500" /> API Configuration
                        </h2>
                        <p className="text-sm text-slate-500 mb-4">Override the hardcoded API key with a custom one. Persists locally.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Current Active Key</label>
                                <div className="bg-slate-950 p-3 rounded-lg text-xs break-all text-slate-500 border border-slate-800">
                                    {customKey || API_KEY}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Set New Key</label>
                                <input 
                                    type="text" 
                                    value={customKey}
                                    onChange={e => setCustomKey(e.target.value)}
                                    placeholder="Enter talkdrove api key..."
                                    className="w-full bg-slate-950 border border-slate-700 text-emerald-400 px-4 py-3 rounded-lg focus:border-emerald-500 outline-none"
                                />
                            </div>

                            <button onClick={saveKey} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <Save className="w-4 h-4" /> Save Configuration
                            </button>
                        </div>
                    </div>

                    {/* System Diagnostics */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-500" /> Diagnostics
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400">Environment</span>
                                <span className="text-sm text-white font-bold">Production (SPA)</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400">LocalStorage Status</span>
                                <span className="text-sm text-emerald-500 font-bold">Writable</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400">API Gateway</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    <span className="text-sm text-white font-bold">Connected</span>
                                </div>
                            </div>
                             <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400">Emergency Actions</span>
                                <button onClick={clearStorage} className="px-3 py-1 bg-red-900/30 text-red-500 border border-red-900/50 rounded text-xs hover:bg-red-900/50">
                                    Purge Cache
                                </button>
                            </div>
                        </div>
                    </div>

                     {/* Traffic Control (Mock) */}
                     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Server className="w-5 h-5 text-purple-500" /> Node Control
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                                <div className="text-xs text-slate-500 uppercase mb-2">US-East</div>
                                <div className="text-emerald-500 font-bold text-sm">Online</div>
                                <button onClick={() => addLog("Rebooting US-East node...")} className="mt-2 text-xs text-blue-500 hover:underline">Reboot</button>
                            </div>
                             <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                                <div className="text-xs text-slate-500 uppercase mb-2">EU-West</div>
                                <div className="text-emerald-500 font-bold text-sm">Online</div>
                                <button onClick={() => addLog("Rebooting EU-West node...")} className="mt-2 text-xs text-blue-500 hover:underline">Reboot</button>
                            </div>
                        </div>
                     </div>

                    {/* Live System Logs */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-64 flex flex-col">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-slate-400" /> System Logs
                        </h2>
                        <div className="flex-1 bg-black p-4 rounded-lg font-mono text-xs overflow-y-auto border border-slate-800 text-slate-300">
                            {logs.length === 0 && <span className="text-slate-600">Waiting for events...</span>}
                            {logs.map((log, i) => (
                                <div key={i} className="mb-1 border-b border-slate-900 pb-1 last:border-0">{log}</div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
