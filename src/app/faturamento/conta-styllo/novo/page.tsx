"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Calculator } from 'lucide-react';
import { salvarContaStyllo } from '@/actions/faturamento';

export default function NovaContaStylloPage() {
  const [pix, setPix] = useState(0);
  const [credito, setCredito] = useState(0);
  const [debito, setDebito] = useState(0);
  const [saida, setSaida] = useState(0);
  
  const total = (pix + credito + debito) - saida;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/conta-styllo" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Novo Valor Diário</h1>
          <p className="text-sm text-slate-500 font-medium">Lançamento na Conta Styllo Ótica.</p>
        </div>
      </div>

      <form action={salvarContaStyllo} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        
        {/* DATA E MÊS BASE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data *</label>
            <input type="date" name="data" required className="w-full px-4 py-2 bg-white border border-slate-300 rounded outline-none font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mês Base *</label>
            <select name="mesReferencia" required className="w-full px-4 py-2 bg-white border border-slate-300 rounded outline-none font-bold">
               <option value="JANEIRO">JANEIRO</option>
               <option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option>
               <option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option>
               <option value="JUNHO">JUNHO</option>
               <option value="JULHO">JULHO</option>
               <option value="AGOSTO">AGOSTO</option>
               <option value="SETEMBRO">SETEMBRO</option>
               <option value="OUTUBRO">OUTUBRO</option>
               <option value="NOVEMBRO">NOVEMBRO</option>
               <option value="DEZEMBRO">DEZEMBRO</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ano Base *</label>
            <input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-2 bg-white border border-slate-300 rounded outline-none font-bold" />
          </div>
        </div>

        {/* VALORES DO DIA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">PIX (R$)</label>
              <input type="number" step="0.01" name="pix" value={pix || ''} onChange={e => setPix(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-slate-700 outline-none focus:border-[#00bdf2]" />
           </div>
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CRÉDITO (R$)</label>
              <input type="number" step="0.01" name="credito" value={credito || ''} onChange={e => setCredito(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-slate-700 outline-none focus:border-[#00bdf2]" />
           </div>
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">DÉBITO (R$)</label>
              <input type="number" step="0.01" name="debito" value={debito || ''} onChange={e => setDebito(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-slate-700 outline-none focus:border-[#00bdf2]" />
           </div>
           <div>
              <label className="block text-xs font-bold text-red-600 uppercase mb-1">SAÍDA (R$)</label>
              <input type="number" step="0.01" name="saida" value={saida || ''} onChange={e => setSaida(Number(e.target.value))} className="w-full px-4 py-3 border border-red-300 bg-red-50 rounded-lg font-bold text-red-700 outline-none focus:border-red-500" />
           </div>
        </div>

        {/* TOTAL AUTOMÁTICO */}
        <div className="bg-[#e6f9fd] p-4 rounded-xl border border-[#00bdf2] flex justify-between items-center mt-6">
           <span className="font-black text-blue-900 uppercase tracking-widest flex items-center gap-2"><Calculator className="h-5 w-5" /> Total Final do Dia</span>
           <span className="text-3xl font-black text-blue-900">R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="flex justify-end pt-4"><button type="submit" className="bg-[#00bdf2] hover:bg-[#009bc2] px-8 py-3 rounded-xl font-black shadow-md"><Save className="h-5 w-5 inline mr-2"/> Salvar no Caixa</button></div>
      </form>
    </div>
  );
}