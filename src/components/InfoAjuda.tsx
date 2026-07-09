"use client";

import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function InfoAjuda({ texto }: { texto: string }) {
  return (
    <div className="group relative inline-flex items-center justify-center ml-2 align-middle">
      <HelpCircle className="h-4 w-4 text-slate-300 hover:text-blue-500 cursor-help transition-colors" />
      
      {/* O Balão de texto que aparece ao passar o rato */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-slate-900 text-white text-xs font-medium rounded-xl shadow-xl z-50 pointer-events-none text-center">
        {texto}
        {/* A setinha apontada para baixo */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
}