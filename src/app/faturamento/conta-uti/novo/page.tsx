"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, HeartPulse, Calculator } from 'lucide-react';
import { salvarContaUti } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function NovaContaUtiPage() {
  const [pix, setPix] = useState(0);
  const [credito, setCredito] = useState(0);
  const [debito, setDebito] = useState(0);
  const [saida, setSaida] = useState(0);

  const total = (pix + credito + debito) - saida;
  const dataHoje = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/conta-uti" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lançar Caixa (UTI)</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Insira os valores recebidos e as saídas do dia da UTI.</p>
        </div>
      </div>

      <form action={salvarContaUti} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label><input type="date" name="data" defaultValue={dataHoje} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês Ref. *</label><input type="text" name="mesReferencia" required placeholder="Ex: JANEIRO" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Ano Base</label><input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" /></div>
        </div>

        <div className="space-y-4">
           <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><HeartPulse className="h-5 w-5 text-purple-500" /> Valores do Fecho</h2>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="space-y-1.5 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
               <label className="text-[10px] font-bold text-purple-900 uppercase ml-1">PIX</label>
               <InputMoeda name="pix" onChange={setPix} className="py-2 bg-white border border-purple-200 focus:border-purple-500 font-bold" />
             </div>
             <div className="space-y-1.5 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
               <label className="text-[10px] font-bold text-purple-900 uppercase ml-1">Crédito</label>
               <InputMoeda name="credito" onChange={setCredito} className="py-2 bg-white border border-purple-200 focus:border-purple-500 font-bold" />
             </div>
             <div className="space-y-1.5 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
               <label className="text-[10px] font-bold text-purple-900 uppercase ml-1">Débito</label>
               <InputMoeda name="debito" onChange={setDebito} className="py-2 bg-white border border-purple-200 focus:border-purple-500 font-bold" />
             </div>
             <div className="space-y-1.5 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
               <label className="text-[10px] font-bold text-rose-900 uppercase ml-1">Saídas</label>
               <InputMoeda name="saida" onChange={setSaida} className="py-2 bg-white border border-rose-200 focus:border-rose-500 font-bold text-rose-700" />
             </div>
           </div>

           <div className="bg-slate-900 p-4 rounded-xl flex justify-between items-center shadow-md mt-4">
             <span className="font-black text-slate-300 text-xs uppercase tracking-widest flex items-center gap-2"><Calculator className="h-4 w-4"/> Total Apurado</span>
             <span className={`font-black text-3xl ${total >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Caixa UTI" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}