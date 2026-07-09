import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { simulacoesLentes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Calculator, Plus, Eye, TrendingUp, DollarSign } from 'lucide-react';

export default async function SimulacoesPage() {
  const lista = await db.select().from(simulacoesLentes).orderBy(desc(simulacoesLentes.id));

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calculator className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Simulador de Lentes & Margens</h1>
            <p className="text-sm text-slate-500 font-medium">Calcule lucros líquidos reais deduzindo taxas de parcelamento.</p>
          </div>
        </div>
        <Link href="/simulacoes/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
          <Plus className="h-5 w-5" /> Nova Simulação
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Marca da Lente / Cliente</th>
                <th className="p-5 text-right">Preço de Tabela</th>
                <th className="p-5 text-center">Parcela (6x)</th>
                <th className="p-5 text-right">Custo Líquido</th>
                <th className="p-5 text-right text-emerald-700 bg-emerald-50/20">Ganho Real (Lucro)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {lista.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500">Nenhuma simulação efetuada.</td>
                </tr>
              ) : (
                lista.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-slate-900 uppercase">{s.marcaLente}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Paciente: {s.cliente || 'Não Informado'}</p>
                    </td>
                    <td className="p-5 text-right font-bold text-slate-800">R$ {(s.valorTabela || 0).toFixed(2)}</td>
                    <td className="p-5 text-center font-semibold text-slate-600">6x de R$ {(s.valorParcela || 0).toFixed(2)}</td>
                    <td className="p-5 text-right text-slate-500">
                      <div>Custo: R$ {(s.custoLente || 0).toFixed(2)}</div>
                      <div className="text-[10px] text-red-500">Taxa Maquininha: R$ {(s.descontoCartao || 0).toFixed(2)}</div>
                    </td>
                    <td className="p-5 text-right font-black text-emerald-700 bg-emerald-50/10">
                      <div className="text-base flex items-center justify-end gap-1"><TrendingUp className="h-4 w-4" /> R$ {(s.ganho || 0).toFixed(2)}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}