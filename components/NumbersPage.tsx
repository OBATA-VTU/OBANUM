import React, { useEffect, useState } from 'react';
import { getNumbers } from '../services/talkDrove';
import { TalkDroveNumber } from '../types';
import { Search, Copy, Globe, Smartphone, RefreshCcw, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getFlagUrl } from '../utils/countries';
import toast from 'react-hot-toast';

interface NumbersPageProps {
    onNavigate: (page: any) => void;
}

export const NumbersPage: React.FC<NumbersPageProps> = ({ onNavigate }) => {
  const [numbers, setNumbers] = useState<TalkDroveNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState<'countries' | 'list'>('countries');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNumbersData = async () => {
    setLoading(true);
    try {
      const data = await getNumbers();
      setNumbers(data);
    } catch (error) {
      toast.error("Failed to load numbers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbersData();
  }, []);

  const uniqueCountries = Array.from(new Set(numbers.map(n => n.country))).sort() as string[];
  
  const getCountryStats = (country: string) => numbers.filter(n => n.country === country).length;

  const handleCountryClick = (country: string) => {
      setSelectedCountry(country);
      setViewState('list');
      setSearchTerm('');
  };

  const copyNumber = (num: string) => {
      navigator.clipboard.writeText(num);
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Check className="h-10 w-10 text-green-500 bg-green-50 rounded-full p-2" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Number Copied!</p>
                <p className="mt-1 text-sm text-gray-500">Go to the Global Feed to check for incoming SMS.</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => {
                  toast.dismiss(t.id);
                  onNavigate('feed');
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Go to Feed
            </button>
          </div>
        </div>
      ), { duration: 5000 });
  };

  const filteredCountries = uniqueCountries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredNumbers = numbers.filter(n => 
      n.country === selectedCountry && 
      n.phone_number.includes(searchTerm)
  );

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
                {viewState === 'list' && (
                    <button 
                        onClick={() => { setViewState('countries'); setSelectedCountry(null); }}
                        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Countries
                    </button>
                )}
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    {viewState === 'countries' ? 'Select Country' : (
                        <>
                             <img src={getFlagUrl(selectedCountry || '')} alt="flag" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                             {selectedCountry} Numbers
                        </>
                    )}
                </h1>
                <p className="text-slate-500 mt-2">
                    {viewState === 'countries' 
                        ? "Choose a location to view available phone numbers." 
                        : "Click any number to copy it to your clipboard."}
                </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={viewState === 'countries' ? "Filter countries..." : "Filter numbers..."}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button 
                    onClick={fetchNumbersData}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
                >
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </div>

        {/* Content */}
        {loading ? (
             <div className="flex flex-col items-center justify-center h-96 bg-white rounded-3xl border border-dashed border-slate-200">
                <RefreshCcw className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading inventory...</p>
             </div>
        ) : viewState === 'countries' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCountries.map(country => (
                    <button
                        key={country}
                        onClick={() => handleCountryClick(country)}
                        className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Smartphone className="w-24 h-24 text-indigo-600 transform rotate-12" />
                        </div>
                        
                        <div className="relative z-10">
                            <img src={getFlagUrl(country)} alt={country} className="w-14 h-14 rounded-full border-4 border-slate-50 shadow-md mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{country}</h3>
                            <div className="mt-2 text-sm font-medium text-slate-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                {getCountryStats(country)} Numbers
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                            View Numbers <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </button>
                ))}
            </div>
        ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-slate-100">
                    {filteredNumbers.map((num) => (
                        <div 
                            key={num.id}
                            className="p-6 hover:bg-indigo-50/50 transition-colors group flex items-center justify-between border-b border-slate-100 md:border-b-0"
                        >
                            <div>
                                <div className="text-lg font-mono font-bold text-slate-700 group-hover:text-indigo-700">
                                    {num.phone_number}
                                </div>
                                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                    <Globe className="w-3 h-3" /> {num.country}
                                </div>
                            </div>
                            <button 
                                onClick={() => copyNumber(num.phone_number)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow hover:bg-indigo-600 transition-all transform active:scale-95"
                            >
                                <Copy className="w-4 h-4" /> Copy
                            </button>
                        </div>
                    ))}
                </div>
                {filteredNumbers.length === 0 && (
                     <div className="p-12 text-center text-slate-500">
                        No numbers found.
                     </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};