import React, { useEffect, useState, useMemo } from 'react';
import { getNumbers } from '../services/talkDrove';
import { TalkDroveNumber } from '../types';
import { Search, RefreshCcw, ChevronDown, Filter, ShieldCheck, Signal, Download, Eye, Globe } from 'lucide-react';
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
        className="group relative flex items-center justify-between p-4 bg-white border border-slate-200 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 w-full text-left overflow-hidden"
    >
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Signal className="w-5 h-5" />
            </div>
            <div>
                <div className="font-mono font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight">
                    {num.phone_number}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {num.country} • Active
                </div>
            </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                Select Number
            </span>
        </div>
    </button>
);

const CountrySection: React.FC<{
    country: string;
    numbers: TalkDroveNumber[];
    onSelect: (num: TalkDroveNumber) => void;
}> = ({ country, numbers, onSelect }) => {
    const [expanded, setExpanded] = useState(false);
    // Show 6 initially, then all
    const visible = expanded ? numbers : numbers.slice(0, 6);

    return (
        <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4 border-b border-slate-200 pb-2">
                <img 
                    src={getFlagUrl(country)} 
                    alt={country} 
                    className="w-8 h-8 rounded-full shadow-sm object-cover"
                />
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex-1">{country}</h3>
                <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">
                    {numbers.length} NODES
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {visible.map(num => (
                    <NumberCard key={num.id} num={num} onSelect={onSelect} />
                ))}
            </div>

            {numbers.length > 6 && !expanded && (
                <button 
                    onClick={() => setExpanded(true)}
                    className="w-full mt-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded border border-transparent hover:border-indigo-100 transition-colors uppercase tracking-widest"
                >
                    + Show {numbers.length - 6} more from {country}
                </button>
            )}
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
  const [selectedNumber, setSelectedNumber] = useState<TalkDroveNumber | null>(null);

  // MASSIVE DEEP SCAN
  const fetchDeepScan = async () => {
    setLoading(true);
    setProgress(0);
    setLoadingText('CONNECTING TO GLOBAL NODES...');

    try {
        let aggregatedNumbers: TalkDroveNumber[] = [];
        
        // INCREASED TO 50 PAGES (Approx 5000 numbers)
        // This ensures "All" numbers are loaded or at least a massive chunk
        const BATCH_SIZE = 50; 
        const ITEMS_PER_PAGE = 100;

        for (let i = 1; i <= BATCH_SIZE; i++) {
            setLoadingText(`DOWNLOADING PACKET ${i} OF ${BATCH_SIZE}...`);
            // We fire these requests sequentially to update the progress bar realistically
            const data = await getNumbers(undefined, i, ITEMS_PER_PAGE);
            
            if (data.length > 0) {
                aggregatedNumbers = [...aggregatedNumbers, ...data];
            } else {
                // If page returns empty, we reached the end of the DB
                break; 
            }

            const percent = Math.round((i / BATCH_SIZE) * 100);
            setProgress(percent);
        }

        // Deduplicate based on phone number
        const unique = new Map();
        aggregatedNumbers.forEach(n => unique.set(n.phone_number, n));
        
        setAllNumbers(Array.from(unique.values()));
        setLastPageFetched(BATCH_SIZE);

    } catch (e) {
        toast.error("Scan finished with partial results.");
    } finally {
        setLoading(false);
    }
  };

  const fetchMore = async () => {
      setLoadingMore(true);
      const startPage = lastPageFetched + 1;
      const endPage = startPage + 5; // Fetch 5 more pages at a time now
      
      try {
          let newNumbers: TalkDroveNumber[] = [];
          for (let i = startPage; i <= endPage; i++) {
              const data = await getNumbers(undefined, i, 100);
              newNumbers = [...newNumbers, ...data];
          }

          if (newNumbers.length === 0) {
              toast('Full Archive Loaded.', { icon: '✅' });
          } else {
              setAllNumbers(prev => {
                  const combined = [...prev, ...newNumbers];
                  const unique = new Map();
                  combined.forEach(n => unique.set(n.phone_number, n));
                  return Array.from(unique.values());
              });
              setLastPageFetched(endPage);
              toast.success(`Expanded inventory with ${newNumbers.length} numbers`);
          }
      } catch (e) {
          toast.error("Failed to load archive.");
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
    
    // Sort by number of items (most popular first)
    return Object.entries(g).sort((a, b) => b[1].length - a[1].length);
  }, [allNumbers, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8 font-sans">
        
        {/* OTP Viewer Overlay */}
        {selectedNumber && (
            <ActiveOrdersList selectedNumber={selectedNumber} onClose={() => setSelectedNumber(null)} />
        )}

        {/* Loading Overlay with Progress */}
        {loading && <Loader text={loadingText} progress={progress} />}

        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Globe className="w-6 h-6 text-indigo-600" />
                        Global Inventory
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Database contains <span className="font-bold text-slate-900">{allNumbers.length}</span> active reception nodes.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Filter by country name or code..." 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 font-medium placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={() => fetchDeepScan()} className="p-3 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl transition-all shadow-sm">
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {!loading && groups.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Filter className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No nodes found</h3>
                    <button onClick={() => setSearchTerm('')} className="text-indigo-600 font-bold mt-2 hover:underline text-sm">Reset Search</button>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {groups.map(([c, n]) => (
                            <CountrySection 
                                key={c} 
                                country={c} 
                                numbers={n}
                                onSelect={setSelectedNumber} 
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="mt-12 text-center pb-20">
                        <button 
                            onClick={fetchMore}
                            disabled={loadingMore}
                            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-600 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingMore ? (
                                <RefreshCcw className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <Download className="w-5 h-5 mr-2" />
                            )}
                            {loadingMore ? 'Decrypting...' : 'Load Archived Nodes'}
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};