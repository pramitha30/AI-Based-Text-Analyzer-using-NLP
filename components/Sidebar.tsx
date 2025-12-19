
import React from 'react';
import { HistoryItem } from '../types';
import { History, Clock, Trash2, ArrowRight } from 'lucide-react';

interface SidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ history, onSelect, onClear }) => {
  return (
    <aside className="w-80 bg-slate-900 text-slate-300 flex flex-col hidden lg:flex">
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 text-white">
          <History className="h-5 w-5" />
          <h2 className="font-semibold">Analysis History</h2>
        </div>
        <button 
          onClick={onClear}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
          title="Clear all"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {history.length === 0 ? (
          <div className="p-8 text-center text-slate-600 text-sm italic">
            No history yet
          </div>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full p-4 text-left hover:bg-slate-800/50 transition-all group border-l-4 border-transparent hover:border-indigo-500"
              >
                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider mb-2">
                  <Clock className="h-3 w-3" />
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <p className="text-sm font-medium line-clamp-2 text-slate-300 group-hover:text-white mb-2">
                  {item.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    item.result.sentiment.label === 'Positive' ? 'bg-emerald-900/40 text-emerald-400' :
                    item.result.sentiment.label === 'Negative' ? 'bg-rose-900/40 text-rose-400' :
                    'bg-amber-900/40 text-amber-400'
                  }`}>
                    {item.result.sentiment.label}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-950/50 border-t border-slate-800">
        <div className="p-4 bg-indigo-600/10 rounded-xl border border-indigo-600/20">
          <p className="text-xs text-indigo-300 leading-relaxed font-medium">
            Tip: Long-form texts benefit more from comprehensive NLP analysis.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
