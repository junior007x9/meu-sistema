"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BotaoVoltarGlobal() {
  const router = useRouter();
  const pathname = usePathname();

  // O botão não aparece no painel principal '/' para não confundir o utilizador
  if (pathname === '/') return null;

  return (
    <button 
      onClick={() => router.back()} 
      className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-widest font-black text-slate-500 hover:text-indigo-600 transition-colors bg-white hover:bg-indigo-50 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm w-fit"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar à Tela Anterior
    </button>
  );
}