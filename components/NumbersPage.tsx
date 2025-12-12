import React, { useEffect, useState, useMemo } from 'react';
import { getNumbers } from '../services/talkDrove';
import { TalkDroveNumber } from '../types';
import { Search, Copy, RefreshCcw, ChevronDown, Check, Filter, ShieldCheck, Signal, Globe } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

interface NumbersPageProps {
    onNavigate: (page: any) => void;
}

const NumberCard: React.FC<{ num: TalkDroveNumber; onCopy: (n: string) => void }> = ({ num, onCopy }) => (
    <button
        onClick={() => onCopy(num.phone_number)}
        className="group relative flex flex-col items-start p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 w-full text-left overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -mr-8 -mt-8 group-hover:bg-indigo-50 transition-colors"></div>
        
        <div className="relative z-10 w-full">
            <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Active Node</span>
                 </div>
                 <Copy className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
            
            <div className="font-mono font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight mb-1">
                {num.phone_number}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Signal className="w-3 h-3" />
                <span>Voice & SMS Ready</span>
            </div>
        </div>
    </button>
);

const CountryAccordion: React.FC<{
    country: string;
    numbers: TalkDroveNumber[];
    isOpen: boolean;
    onToggle: () => void;
    onCopy: (num: string) => void;
}> = ({ country, numbers, isOpen, onToggle, onCopy }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleNumbers = isOpen ? (showAll ? numbers : numbers.slice(0, 8)) : [];

    return (
        <div className={`
            bg-white rounded-3xl transition-all duration-500 overflow-hidden
            ${isOpen ? 'ring-2 ring-indigo-500/10 shadow-2xl shadow-indigo-500/5 my-6' : 'hover:bg-slate-50 border border-slate-100 shadow-sm my-3'}
        `}>
            <button 
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 transition-colors cursor-pointer outline-none"
            >
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img 
                            src={getFlagUrl(country)} 
                            alt={country} 
                            className={`w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white transition-transform duration-500 ${isOpen ? 'scale-110' : ''}`}
                        />
                         <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-white">
                            {numbers.length}
                        </div>
                    </div>
                    
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{country}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span className="text-xs text-slate-500 font-medium">Verified Gateway</span>
                        </div>
                    </div>
                </div>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>

            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-2 border-t border-slate-100 bg-slate-50/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {visibleNumbers.map(num => (
                            <NumberCard key={num.id} num={num} onCopy={onCopy} />
                        ))}
                    </div>
                    
                    {numbers.length > 8 && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowAll(!showAll); }}
                            className="w-full mt-6 py-3 rounded-xl border border-dashed border-slate-300 text-sm font-bold text-slate-500 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                        >
                            {showAll ? 'Collapse Inventory' : `Load ${numbers.length - 8} More Numbers`}
                            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const NumbersPage: React.FC<NumbersPageProps> = ({ onNavigate }) => {
  const [allNumbers, setAllNumbers] = useState<TalkDroveNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetch = async () => {
        setLoading(true);
        try {
            const data = await getNumbers();
            setAllNumbers(data);
        } catch (e) {
            toast.error("Gateway sync error. Retrying secure connection...");
        } finally {
            setLoading(false);
        }
    };
    fetch();
  }, []);

  const groups = useMemo(() => {
    const g: Record<string, TalkDroveNumber[]> = {};
    allNumbers.forEach(n => {
        if (searchTerm === '' || n.country.toLowerCase().includes(searchTerm.toLowerCase()) || n.phone_number.includes(searchTerm)) {
            if (!g[n.country]) g[n.country] = [];
            g[n.country].push(n);
        }
    });
    return Object.entries(g).sort((a, b) => a[0].localeCompare(b[0]));
  }, [allNumbers, searchTerm]);

  useEffect(() => {
      if (searchTerm) setExpanded(new Set(groups.map(g => g[0])));
  }, [searchTerm, groups.length]);

  const toggle = (c: string) => {
      const s = new Set(expanded);
      if (s.has(c)) s.delete(c);
      else s.add(c);
      setExpanded(s);
  };

  const handleCopy = (num: string) => {
      navigator.clipboard.writeText(num);
      toast.custom((t) => (
         <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700`}>
             <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900">
                 <Check className="w-6 h-6" />
             </div>
             <div>
                 <div className="font-bold text-lg">Number Secured</div>
                 <div className="text-slate-400 text-sm">Monitoring incoming packets</div>
             </div>
             <button onClick={() => { toast.dismiss(t.id); onNavigate('feed'); }} className="ml-4 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-bold text-sm">Open Terminal</button>
         </div>
      ));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
                        Digital SIM Wallet
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Access <span className="font-bold text-slate-900">{allNumbers.length}</span> secure nodes across 50+ regions.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Find country..." 
                            className="w-full pl-10 pr-4 py-2 bg-transparent outline-none text-slate-700 font-medium placeholder-slate-400"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={() => window.location.reload()} className="p-2 bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-colors">
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
                    <div className="text-slate-400 font-medium animate-pulse">Synchronizing Global Inventory...</div>
                </div>
            ) : groups.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <Filter className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
                    <button onClick={() => setSearchTerm('')} className="text-indigo-600 font-bold mt-2 hover:underline">Clear Search</button>
                </div>
            ) : (
                <div className="space-y-2">
                    {groups.map(([c, n]) => (
                        <CountryAccordion 
                            key={c} 
                            country={c} 
                            numbers={n} 
                            isOpen={expanded.has(c)} 
                            onToggle={() => toggle(c)} 
                            onCopy={handleCopy} 
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};
