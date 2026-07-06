"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Wrench } from 'lucide-react';
import { salvarServicoJoaozinho } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function NovoJoaozinhoPage() {
  const [mValor, setMValor] = useState(0);
  const [tValor, setTValor] = useState(0);
  const [cValor, setCValor] = useState(0);
  const total = mValor + tValor + cValor;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/joaozinho" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Serviços Joãozinho</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Registe os serviços terceirizados.</p>
        </div>
      </div>

      <form action={salvarServicoJoaozinho} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* IDENTIFICAÇÃO BÁSICA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Data *</label>
             <input type="date" name="data" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-semibold text-slate-800" />
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Mês Base *</label>
             <select name="mesReferencia" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-semibold text-slate-800 appearance-none">
               <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
             </select>
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Ano Base *</label>
             <input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-semibold text-slate-800" />
          </div>
        </div>

        {/* SERVIÇOS E VALORES */}
        <div className="space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-slate-400" /> Descrição dos Serviços
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
             <div className="space-y-1.5">
               <label className="text-xs font-bold text-slate-500 uppercase ml-1">Montagem</label>
               <input type="text" name="montagem" placeholder="Ex: Armação X" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700" />
             </div>
             <div className="space-y-1.5">
               <label className="text-xs font-bold text-blue-600 uppercase ml-1">Valor Montagem (R$)</label>
               <input type="number" step="0.01" name="montagemValor" value={mValor || ''} onChange={e => setMValor(Number(e.target.value))} className="w-full px-4 py-3 bg-blue-50/30 border border-blue-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-blue-700 placeholder-blue-300" placeholder="0.00" />
             </div>

             <div className="space-y-1.5">
               <label className="text-xs font-bold text-slate-500 uppercase ml-1">Transposição</label>
               <input type="text" name="transposicao" placeholder="Detalhes" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-700" />
             </div>
             <div className="space-y-1.5">
               <label className="text-xs font-bold text-orange-600 uppercase ml-1">Valor Transposição (R$)</label>
               <input type="number" step="0.01" name="transposicaoValor" value={tValor || ''} onChange={e => setTValor(Number(e.target.value))} className="w-full px-4 py-3 bg-orange-50/30 border border-orange-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-black text-orange-700 placeholder-orange-300" placeholder="0.00" />
             </div>

             <div className="space-y-1.5">
               <label className="text-xs font-bold text-slate-500 uppercase ml-1">Coloração</label>
               <input type="text" name="coloracao" placeholder="Cor aplicada" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium text-slate-700" />
             </div>
             <div className="space-y-1.5">
               <label className="text-xs font-bold text-purple-600 uppercase ml-1">Valor Coloração (R$)</label>
               <input type="number" step="0.01" name="coloracaoValor" value={cValor || ''} onChange={e => setCValor(Number(e.target.value))} className="w-full px-4 py-3 bg-purple-50/30 border border-purple-200 rounded-xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-black text-purple-700 placeholder-purple-300" placeholder="0.00" />
             </div>
          </div>
        </div>

        {/* RESUMO E BOTÃO (USANDO O BOTAO INTELIGENTE) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
          <div className="bg-emerald-50/50 border border-emerald-200 px-6 py-3 rounded-2xl flex flex-col w-full sm:w-auto">
             <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600">Total Devido no Lançamento</span>
             <span className="text-2xl font-black text-emerald-900">R$ {total.toFixed(2)}</span>
          </div>
          <BotaoSubmit texto="Gravar Lançamento" icone={<Save className="h-5 w-5" />} cor="slate" />
        </div>
      </form>
    </div>
  );
}