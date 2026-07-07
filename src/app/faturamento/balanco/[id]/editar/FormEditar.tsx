"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Scale } from 'lucide-react';
import { atualizarBalanco } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export default function FormEditar({ registro }: { registro: any }) {
  const actionAtualizar = atualizarBalanco.bind(null, registro.id);
  const mesesData = JSON.parse(registro.mesesJson || '[]');

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/balanco" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Balanço Anual</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Ajuste os valores anuais do ano {registro.ano}.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4"><Scale className="h-5 w-5 text-slate-400" /><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Ano: {registro.ano}</h2><input type="hidden" name="ano" value={registro.ano} /></div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-inner">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-4 border-r border-slate-200">MÊS</th><th className="p-4 border-r border-slate-200">COMPRAS</th><th className="p-4 border-r border-slate-200">ENTRADA</th><th className="p-4">SAÍDA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {MESES.map((mes) => {
                const mData = mesesData.find((m: any) => m.mes === mes) || { compras: 0, entrada: 0, saida: 0 };
                return (
                  <tr key={mes}>
                    <td className="p-3 border-r border-slate-100 font-black text-slate-800 bg-slate-50/50">{mes}</td>
                    <td className="p-2 border-r border-slate-100"><input type="number" step="0.01" name={`compras_${mes}`} defaultValue={mData.compras || ''} className="w-full text-center outline-none font-bold text-orange-700" /></td>
                    <td className="p-2 border-r border-slate-100"><input type="number" step="0.01" name={`entrada_${mes}`} defaultValue={mData.entrada || ''} className="w-full text-center outline-none font-bold text-green-700" /></td>
                    <td className="p-2"><input type="number" step="0.01" name={`saida_${mes}`} defaultValue={mData.saida || ''} className="w-full text-center outline-none font-bold text-red-700" /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-6 border-t border-slate-100"><BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="slate" /></div>
      </form>
    </div>
  );
}