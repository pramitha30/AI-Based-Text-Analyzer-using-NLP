
import React from 'react';
import { AnalysisResult } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { 
  MessageSquareQuote, 
  BarChart3, 
  UserCircle, 
  Lightbulb, 
  BookOpen, 
  Smile, 
  Frown, 
  Meh,
  Tag,
  Globe,
  Zap,
  Target
} from 'lucide-react';

interface AnalysisPanelProps {
  result: AnalysisResult;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result }) => {
  const sentimentIcon = () => {
    switch(result.sentiment.label) {
      case 'Positive': return <Smile className="h-8 w-8 text-emerald-500" />;
      case 'Negative': return <Frown className="h-8 w-8 text-rose-500" />;
      default: return <Meh className="h-8 w-8 text-amber-500" />;
    }
  };

  const sentimentData = [
    { name: 'Sentiment', score: result.sentiment.score * 100 }
  ];

  const entityData = result.entities.map(e => ({
    name: e.name,
    relevance: e.relevance * 100,
    type: e.type
  })).slice(0, 8);

  const getFormalityColor = (score: number) => {
    if (score > 70) return 'text-indigo-600';
    if (score > 30) return 'text-blue-600';
    return 'text-teal-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Summary Card - Wide */}
      <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">AI Summary</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg italic">
          "{result.summary}"
        </p>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Sentiment</h3>
          </div>
          {sentimentIcon()}
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-2 flex justify-between items-end">
            <span className="text-3xl font-bold text-slate-800">{result.sentiment.label}</span>
            <span className="text-slate-400 font-mono text-xs">{(result.sentiment.score * 100).toFixed(1)}% intensity</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6">
            <div 
              className={`h-full transition-all duration-1000 ${
                result.sentiment.label === 'Positive' ? 'bg-emerald-500' :
                result.sentiment.label === 'Negative' ? 'bg-rose-500' :
                'bg-amber-500'
              }`}
              style={{ width: `${result.sentiment.score * 100}%` }}
            ></div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            {result.sentiment.explanation}
          </p>
        </div>
      </div>

      {/* Tone & Style */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Tone & Intent</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-slate-500 text-sm">Primary Tone</span>
            <span className="font-semibold text-slate-700 capitalize">{result.tone.primary}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-slate-500 text-sm">Secondary Tone</span>
            <span className="font-semibold text-slate-700 capitalize">{result.tone.secondary}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <span className="text-slate-500 text-sm">Formality</span>
            <span className={`font-bold ${getFormalityColor(result.tone.formalityScore)}`}>
              {result.tone.formalityScore}%
            </span>
          </div>
          <div className="pt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Detected Intent</span>
            <p className="text-slate-700 font-medium">{result.intent}</p>
          </div>
        </div>
      </div>

      {/* Readability Score */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Readability</h3>
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full border-8 border-slate-100 border-t-emerald-500 relative">
            <span className="text-2xl font-black text-slate-800">{result.readability.score}</span>
          </div>
          <p className="text-sm font-semibold text-emerald-600 mt-2 uppercase tracking-widest">{result.readability.level}</p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Refinement Suggestions</span>
          {result.readability.suggestions.map((s, i) => (
            <div key={i} className="flex gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
              <Lightbulb className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Entities & NER - Wide */}
      <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <UserCircle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Named Entities (NER)</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">{result.entities.length} detected</span>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={entityData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                width={100}
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="relevance" radius={[0, 4, 4, 0]} barSize={20}>
                {entityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.type === 'Person' ? '#4f46e5' : 
                    entry.type === 'Org' ? '#0891b2' : 
                    entry.type === 'Location' ? '#059669' : '#94a3b8'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {['Person', 'Org', 'Location', 'Product'].map(type => (
            <div key={type} className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
              <div className={`h-2 w-2 rounded-full ${
                type === 'Person' ? 'bg-indigo-600' : 
                type === 'Org' ? 'bg-cyan-600' : 
                type === 'Location' ? 'bg-emerald-600' : 'bg-slate-400'
              }`}></div>
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Keyphrases & Language */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <Tag className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Key Phrases</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {result.keyphrases.map((phrase, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200 hover:border-rose-300 hover:bg-rose-50 transition-colors cursor-default">
              {phrase}
            </span>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Linguistic Context</span>
            </div>
            <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-black rounded uppercase tracking-tighter">
              {result.language}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalysisPanel;
