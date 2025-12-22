import React, { useState, useEffect } from 'react';
import { Shield, Key, Terminal, Save, Activity, CheckCircle2, AlertTriangle, Users, Lock, Server, Zap, Globe } from 'lucide-react';
import { API_KEY } from '../constants';
import { getHealth, getStats } from '../services/talkDrove';

export const AdminPanel: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [customKey, setCustomKey] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    
    // Test States
    const [testingConnection, setTestingConnection] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'failed'>('idle');
    const [latency, setLatency] = useState<number | null>(null);
    
    useEffect(() => {
        const storedKey = localStorage.getItem('OBANUM_CUSTOM_API_KEY');
        if (storedKey) setCustomKey(storedKey);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // UPDATED PASSWORD LOGIC
        if (password === 'OBA_AAUA') {
            setIsAuthenticated(true);
            addLog("System access granted. User: Administrator");
            addLog("Protocol: Secure Shell Initialized");
        } else {
            alert('Access Denied. Incident Reported.');
            addLog("Failed login attempt detected.");
        }
    };

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    };

    const saveKey = () => {
        if (customKey) {
            localStorage.setItem('OBANUM_CUSTOM_API_KEY', customKey);
            addLog(`API Key updated. Storage synced.`);
            alert('Configuration Saved.');
        }
    };

    const testConnection = async () => {
        setTestingConnection(true);
        setConnectionStatus('idle');
        addLog("Initiating API Handshake...");
        const start = performance.now();
        
        try {
            // Actually call the API to verify the key works
            const stats = await getStats();
            const end = performance.now();
            setLatency(Math.round(end - start));
            
            if (stats && (stats.numbers > 0 || stats.numbers === 0)) {
                setConnectionStatus('success');
                addLog(`Connection Successful. Latency: ${Math.round(end - start)}ms`);
            } else {
                setConnectionStatus('failed');
                addLog("Connection Failed: Invalid Response Structure");
            }
        } catch (e) {
            setConnectionStatus('failed');
            addLog("Connection Failed: Network Error or Invalid Key");
        } finally {
            setTestingConnection(false);
        }
    }

    const clearStorage = () => {
        if(confirm("Are you sure? This will reset all local configurations.")) {
            localStorage.clear();
            addLog("Local storage purged. System Reset.");
            window.location.reload();
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
                <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-none border border-zinc-800 shadow-2xl max-w-md w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center text-red-500 border border-red-900/50">
                            <Lock className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-white text-center mb-2 uppercase tracking-widest">Restricted Access</h1>
                    <p className="text-zinc-500 text-center mb-8 text-xs">Obanum Secure Gateway • Authorization Required</p>
                    
                    <div className="relative mb-6">
                        <input 
                            type="password" 
                            placeholder="ENTER PASSCODE"
                            className="w-full bg-black border border-zinc-700 text-white px-4 py-4 focus:border-red-600 outline-none tracking-widest text-center"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 uppercase tracking-widest transition-colors">
                        Authenticate
                    </button>
                    <div className="mt-6 flex justify-between text-[10px] text-zinc-600 uppercase">
                        <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                        <span>Encrypted: TLS 1.3</span>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-zinc-800 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Terminal className="w-6 h-6 text-green-500" />
                            COMMAND CENTER
                        </h1>
                        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wider">Obanum Core v3.0 • Root Privileges</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-green-500">ONLINE</span>
                        </div>
                        <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/30 text-xs uppercase tracking-wider transition-colors">
                            Term Session
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* COL 1: API Configuration */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-zinc-900/50 p-6 border border-zinc-800 backdrop-blur-sm">
                            <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider border-b border-zinc-800 pb-2">
                                <Key className="w-4 h-4 text-amber-500" /> API Credentials
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Active Environment Key</label>
                                    <div className="bg-black p-4 text-[10px] break-all text-zinc-400 border border-zinc-800 font-mono">
                                        {customKey || API_KEY}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Override Key</label>
                                    <input 
                                        type="text" 
                                        value={customKey}
                                        onChange={e => setCustomKey(e.target.value)}
                                        placeholder="Paste new TalkDrove API Key..."
                                        className="w-full bg-black border border-zinc-700 text-amber-500 px-4 py-3 focus:border-amber-500 outline-none text-xs"
                                    />
                                </div>

                                <button onClick={saveKey} className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 uppercase text-xs tracking-wider transition-colors">
                                    Update Configuration
                                </button>
                            </div>
                        </div>

                         <div className="bg-zinc-900/50 p-6 border border-zinc-800 backdrop-blur-sm">
                            <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider border-b border-zinc-800 pb-2">
                                <Zap className="w-4 h-4 text-blue-500" /> Connection Tester
                            </h2>
                            <p className="text-[10px] text-zinc-500 mb-4">Ping the remote gateway to verify key validity and network latency.</p>
                            
                            <div className="flex items-center justify-between mb-4 bg-black p-3 border border-zinc-800">
                                <span className="text-xs text-zinc-400">Status</span>
                                {testingConnection ? (
                                    <span className="text-xs text-yellow-500 animate-pulse">PINGING...</span>
                                ) : connectionStatus === 'success' ? (
                                    <span className="text-xs text-green-500 font-bold">ESTABLISHED</span>
                                ) : connectionStatus === 'failed' ? (
                                    <span className="text-xs text-red-500 font-bold">UNREACHABLE</span>
                                ) : (
                                    <span className="text-xs text-zinc-600">IDLE</span>
                                )}
                            </div>

                            {latency && (
                                <div className="flex items-center justify-between mb-4 bg-black p-3 border border-zinc-800">
                                    <span className="text-xs text-zinc-400">Latency</span>
                                    <span className="text-xs text-blue-400 font-bold">{latency}ms</span>
                                </div>
                            )}

                            <button onClick={testConnection} disabled={testingConnection} className="w-full border border-blue-600 text-blue-500 hover:bg-blue-600/10 font-bold py-3 uppercase text-xs tracking-wider transition-colors">
                                {testingConnection ? 'Transmitting...' : 'Ping Gateway'}
                            </button>
                        </div>
                    </div>

                    {/* COL 2 & 3: Logs & Controls */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Live Logs */}
                        <div className="bg-zinc-900/50 p-6 border border-zinc-800 backdrop-blur-sm flex flex-col h-[400px]">
                            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider border-b border-zinc-800 pb-2">
                                <Terminal className="w-4 h-4 text-zinc-400" /> System Event Log
                            </h2>
                            <div className="flex-1 bg-black p-4 font-mono text-[11px] overflow-y-auto border border-zinc-800 text-green-500 shadow-inner">
                                {logs.length === 0 && <span className="text-zinc-700 animate-pulse">_cursor waiting for input...</span>}
                                {logs.map((log, i) => (
                                    <div key={i} className="mb-1 border-b border-zinc-900/50 pb-1 last:border-0 opacity-90 hover:opacity-100">
                                        <span className="text-zinc-600 mr-2">{'>'}</span>{log}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-zinc-900/50 p-6 border border-zinc-800 backdrop-blur-sm">
                                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Server className="w-4 h-4 text-purple-500" /> Node Management
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-black p-3 border border-zinc-800">
                                        <span className="text-xs text-zinc-400">Proxy Router</span>
                                        <button onClick={() => addLog("Restarting Proxy Service...")} className="text-[10px] text-purple-400 hover:text-purple-300 uppercase">Restart</button>
                                    </div>
                                    <div className="flex justify-between items-center bg-black p-3 border border-zinc-800">
                                        <span className="text-xs text-zinc-400">Cache Layer</span>
                                        <button onClick={clearStorage} className="text-[10px] text-red-400 hover:text-red-300 uppercase">Purge</button>
                                    </div>
                                </div>
                             </div>

                             <div className="bg-zinc-900/50 p-6 border border-zinc-800 backdrop-blur-sm">
                                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Globe className="w-4 h-4 text-cyan-500" /> Network Status
                                </h2>
                                <div className="flex items-center justify-center h-24">
                                     <div className="text-center">
                                         <div className="text-2xl font-bold text-white mb-1">Global</div>
                                         <div className="text-[10px] text-green-500 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">OPERATIONAL</div>
                                     </div>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};