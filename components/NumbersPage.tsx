import React, { useEffect, useState, useMemo } from 'react';
import { getNumbers } from '../services/talkDrove';
import { TalkDroveNumber } from '../types';
import { Search, RefreshCcw, ChevronDown, Filter, ShieldCheck, Signal, Download, Eye } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import { Loader } from './Loader';
import { ActiveOrdersList } from './ActiveOrdersList';
import toast from 'react-hot-toast';

interface NumbersPageProps {
    onNavigate: (page: any) => void;
}

const NumberCard: React.FC<{ num: TalkDroveNumber; onSelect: (n: TalkDroveNumber) => void }> = ({ num, onSelect }) => (
    <button
        onClick={() => onSelect(num)}
        className="group relative flex flex-col items-start p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 w-full text-left overflow-hidden animate-fade-in-up"
    >
        <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -mr-8 -mt-8 group-hover:bg-indigo-50 transition-colors"></div>
        
        <div className="relative z-10 w-full">
            <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Active</span>
                 </div>
                 <Eye className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
            
            <div className="font-mono font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight mb-1">
                {num.phone_number}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Signal className="w-3 h-3" />
                <span>Click to View SMS</span>
            </div>
        </div>
    </button>
);

const CountryAccordion: React.FC<{
    country: string;
    numbers: TalkDroveNumber[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (num: TalkDroveNumber) => void;
}> = ({ country, numbers, isOpen, onToggle, onSelect }) => {
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
                            <NumberCard key={num.id} num={num} onSelect={onSelect} />
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
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING...');
  
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastPageFetched, setLastPageFetched] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selectedNumber, setSelectedNumber] = useState<TalkDroveNumber | null>(null);

  // DEEP SCAN LOGIC
  // Fetches a massive chunk of pages at once to ensure diversity
  const fetchDeepScan = async () => {
    setLoading(true);
    setProgress(0);
    setLoadingText('ESTABLISHING SECURE CONNECTION...');

    try {
        let aggregatedNumbers: TalkDroveNumber[] = [];
        const BATCH_SIZE = 10; // Fetch 10 pages initially to show 1000 numbers
        const ITEMS_PER_PAGE = 100;

        for (let i = 1; i <= BATCH_SIZE; i++) {
            setLoadingText(`DOWNLOADING DATA PACKET ${i} OF ${BATCH_SIZE}...`);
            const data = await getNumbers(undefined, i, ITEMS_PER_PAGE);
            
            if (data.length > 0) {
                aggregatedNumbers = [...aggregatedNumbers, ...data];
            }

            // Update Progress Bar
            const percent = Math.round((i / BATCH_SIZE) * 100);
            setProgress(percent);
        }

        // Deduplicate
        const unique = new Map();
        aggregatedNumbers.forEach(n => unique.set(n.phone_number, n));
        
        setAllNumbers(Array.from(unique.values()));
        setLastPageFetched(BATCH_SIZE);

    } catch (e) {
        toast.error("Scan interrupted. Showing partial results.");
    } finally {
        setLoading(false);
    }
  };

  const fetchMore = async () => {
      setLoadingMore(true);
      const startPage = lastPageFetched + 1;
      const endPage = startPage + 2; // Fetch 3 more pages
      
      try {
          let newNumbers: TalkDroveNumber[] = [];
          for (let i = startPage; i <= endPage; i++) {
              const data = await getNumbers(undefined, i, 100);
              newNumbers = [...newNumbers, ...data];
          }

          if (newNumbers.length === 0) {
              toast('Database end reached.', { icon: '🚫' });
          } else {
              setAllNumbers(prev => {
                  const combined = [...prev, ...newNumbers];
                  // dedupe
                  const unique = new Map();
                  combined.forEach(n => unique.set(n.phone_number, n));
                  return Array.from(unique.values());
              });
              setLastPageFetched(endPage);
              toast.success(`Loaded ${newNumbers.length} new numbers`);
          }
      } catch (e) {
          toast.error("Failed to load more numbers.");
      } finally {
          setLoadingMore(false);
      }
  };

  useEffect(() => {
    fetchDeepScan();
  }, []);

  const groups = useMemo(() => {
    const g: Record<string, TalkDroveNumber[]> = {};
    const filtered = allNumbers.filter(n => {
        if (!searchTerm) return true;
        return n.country.toLowerCase().includes(searchTerm.toLowerCase()) || n.phone_number.includes(searchTerm);
    });

    filtered.forEach(n => {
        if (!g[n.country]) g[n.country] = [];
        g[n.country].push(n);
    });
    return Object.entries(g).sort((a, b) => a[0].localeCompare(b[0]));
  }, [allNumbers, searchTerm]);

  useEffect(() => {
      // Auto-expand if we have results
      if (groups.length > 0) {
           setExpanded(new Set(groups.map(g => g[0])));
      }
  }, [groups.length]);

  const toggle = (c: string) => {
      const s = new Set(expanded);
      if (s.has(c)) s.delete(c);
      else s.add(c);
      setExpanded(s);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
        
        {/* OTP Viewer Overlay */}
        {selectedNumber && (
            <ActiveOrdersList selectedNumber={selectedNumber} onClose={() => setSelectedNumber(null)} />
        )}

        {/* Loading Overlay with Progress */}
        {loading && <Loader text={loadingText} progress={progress} />}

        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
                        Global Inventory
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Accessing <span className="font-bold text-slate-900">{allNumbers.length}</span> verified nodes across <span className="font-bold text-slate-900">{groups.length}</span> regions.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search country..." 
                            className="w-full pl-10 pr-4 py-2 bg-transparent outline-none text-slate-700 font-medium placeholder-slate-400"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={() => fetchDeepScan()} className="p-2 bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-colors">
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {!loading && groups.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <Filter className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Inventory Empty</h3>
                    <p className="text-slate-500 mt-2">Try refreshing the secure link or search for a different region.</p>
                    <button onClick={() => setSearchTerm('')} className="text-indigo-600 font-bold mt-2 hover:underline">Clear Filters</button>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        {groups.map(([c, n]) => (
                            <CountryAccordion 
                                key={c} 
                                country={c} 
                                numbers={n} 
                                isOpen={expanded.has(c)} 
                                onToggle={() => toggle(c)} 
                                onSelect={setSelectedNumber} 
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="mt-8 text-center pb-20">
                        <button 
                            onClick={fetchMore}
                            disabled={loadingMore}
                            className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-300 rounded-full text-slate-600 font-bold shadow-sm hover:bg-slate-50 hover:border-indigo-500 hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingMore ? (
                                <RefreshCcw className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <Download className="w-5 h-5 mr-2" />
                            )}
                            {loadingMore ? 'Decrypting Additional Nodes...' : 'Load Archived Numbers'}
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};
