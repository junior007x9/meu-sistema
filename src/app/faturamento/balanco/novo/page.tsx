"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Scale } from 'lucide-react';
import { salvarBalanco } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export default function NovoBalancoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/balanco" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Novo Balanço Anual</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Preencha os valores de cada mês. O sistema calcula o ano todo.</p>
        </div>
      </div>

      <form action={salvarBalanco} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-slate-400" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Selecione o Ano do Balanço</h2>
          </div>
          <input type="text" name="ano" defaultValue="2026" required className="w-32 px-4 py-2.5 text-center bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-black text-xl text-slate-900" />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-inner select-none">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-4 border-r border-slate-200 w-24 text-slate-800">MÊS</th>
                <th className="p-4 border-r border-slate-200">COMPRAS (R$)</th>
                <th className="p-4 border-r border-slate-200">ENTRADA (R$)</th>
                <th className="p-4">SAÍDA - CARTÃO/PIX (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {MESES.map((mes) => (
                <tr key={mes} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="p-3 border-r border-slate-100 bg-slate-50/30 font-black text-slate-800">{mes}</td>
                  <td className="p-2 border-r border-slate-100">
                     <input type="number" step="0.01" name={`compras_${mes}`} className="w-full text-center outline-none bg-transparent font-bold text-orange-700 py-1.5 focus:bg-orange-50 rounded transition-colors" placeholder="0.00" />
                  </td>
                  <td className="p-2 border-r border-slate-100">
                     <input type="number" step="0.01" name={`entrada_${mes}`} className="w-full text-center outline-none bg-transparent font-bold text-green-700 py-1.5 focus:bg-green-50 rounded transition-colors" placeholder="0.00" />
                  </td>
                  <td className="p-2">
                     <input type="number" step="0.01" name={`saida_${mes}`} className="w-full text-center outline-none bg-transparent font-bold text-red-700 py-1.5 focus:bg-red-50 rounded transition-colors" placeholder="0.00" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <BotaoSubmit texto="Gravar Balanço do Ano" icone={<Save className="h-5 w-5" />} cor="slate" />
        </div>
      </form>
    </div>
  );
}