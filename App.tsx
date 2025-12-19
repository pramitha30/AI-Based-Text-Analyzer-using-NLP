
import React, { useState, useEffect, useCallback } from 'react';
import { performFullAnalysis } from './services/geminiService';
import { AnalysisResult, HistoryItem } from './types';
import Sidebar from './components/Sidebar';
import AnalysisPanel from './components/AnalysisPanel';
import Header from './components/Header';
import { Loader2, Search, Send, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await performFullAnalysis(inputText);
      setResult(data);
      
      const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        text: inputText,
        result: data
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectHistoryItem = (item: HistoryItem) => {
    setInputText(item.text);
    setResult(item.result);
  };

  const clearHistory = () => {
    setHistory([]);
    setResult(null);
    setInputText('');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar - Desktop Only for now */}
      <Sidebar 
        history={history} 
        onSelect={selectHistoryItem} 
        onClear={clearHistory} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Input Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6">
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Source Text
                </label>
                <textarea
                  className="w-full h-48 p-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none transition-all placeholder-slate-400"
                  placeholder="Paste your text here for deep linguistic analysis..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-slate-500">
                    {inputText.length > 0 && (
                      <span>{inputText.split(/\s+/).filter(Boolean).length} words • {inputText.length} characters</span>
                    )}
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Run Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3">
                <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                {error}
              </div>
            )}

            {/* Results Section */}
            {result && !isAnalyzing && (
              <AnalysisPanel result={result} />
            )}

            {!result && !isAnalyzing && !error && (
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <div className="bg-slate-200 p-6 rounded-full mb-4">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-500">Awaiting input for analysis</h3>
                <p className="text-slate-400">InsightLex is ready to process your text.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
