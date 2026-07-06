"use client";

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface BotaoSubmitProps {
  texto: string;
  icone?: React.ReactNode;
  cor?: 'indigo' | 'rose' | 'emerald' | 'yellow' | 'slate' | 'blue';
}

export default function BotaoSubmit({ texto, icone, cor = 'slate' }: BotaoSubmitProps) {
  const { pending } = useFormStatus();

  // Dicionário de cores dinâmicas usando Tailwind
  const cores = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-500',
    rose: 'bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 focus-visible:ring-yellow-500 text-slate-900',
    slate: 'bg-slate-900 hover:bg-slate-800 focus-visible:ring-slate-500',
    blue: 'bg-[#00bdf2] hover:bg-[#009bc2] focus-visible:ring-[#00bdf2] text-slate-900'
  };

  const corSelecionada = cores[cor];

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-8 py-3.5 rounded-xl font-black text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${corSelecionada} ${pending ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:-translate-y-0.5 active:scale-95'}`}
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          A processar...
        </>
      ) : (
        <>
          {icone} {texto}
        </>
      )}
    </button>
  );
}