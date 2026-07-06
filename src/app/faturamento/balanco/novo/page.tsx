"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Scale } from 'lucide-react';
import { salvarBalanco } from '@/actions/faturamento';

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export default function NovoBalancoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/balanco" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Novo Balanço Anual</h1>
          <p className="text-sm text-slate-500 font-medium">Preencha os valores de cada mês. O sistema soma tudo automaticamente.</p>
        </div>
      </div>

      <form action={salvarBalanco} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-slate-900" />
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Ano do Balanço</h2>
          </div>
          <input type="text" name="ano" defaultValue="2026" required className="w-32 px-4 py-2 text-center bg-slate-100 border border-slate-300 rounded-lg outline-none font-black text-xl text-slate-900" />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black text-xs uppercase tracking-widest">
                <th className="p-3 border-r border-slate-700 w-24">MÊS</th>
                <th className="p-3 border-r border-slate-700">COMPRAS (R$)</th>
                <th className="p-3 border-r border-slate-700">ENTRADA (R$)</th>
                <th className="p-3">SAÍDA - CARTÃO/PIX (R$)</th>
              </tr>
            </thead>
            <tbody>
              {MESES.map((mes) => (
                <tr key={mes} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                  <td className="p-2 border-r border-slate-300 bg-slate-100 font-black text-slate-700">{mes}</td>
                  <td className="p-1 border-r border-slate-300 bg-white">
                     <input type="number" step="0.01" name={`compras_${mes}`} className="w-full text-center outline-none bg-transparent font-bold text-orange-700 py-2" />
                  </td>
                  <td className="p-1 border-r border-slate-300 bg-white">
                     <input type="number" step="0.01" name={`entrada_${mes}`} className="w-full text-center outline-none bg-transparent font-bold text-green-700 py-2" />
                  </td>
                  <td className="p-1 bg-white">
                     <input type="number" step="0.01" name={`saida_${mes}`} className="w-full text-center outline-none bg-transparent font-bold text-red-700 py-2" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-slate-900 hover:bg-slate-800 px-10 py-3.5 rounded-xl font-black text-white shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-2">
            <Save className="h-5 w-5"/> Gravar Balanço do Ano
          </button>
        </div>
      </form>
    </div>
  );
}