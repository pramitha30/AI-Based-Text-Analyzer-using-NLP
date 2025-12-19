
import React from 'react';
import { Cpu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 tracking-tight">
            InsightLex <span className="text-slate-400 font-normal">v3</span>
          </h1>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">
            Powered by Gemini
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Engine Online
        </div>
      </div>
    </header>
  );
};

export default Header;
