import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { contaStyllo } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Landmark, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default async function ContaStylloPage() {
  const movimentacoes = await db.select().from(contaStyllo).orderBy(desc(contaStyllo.data)).limit(100);

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Landmark className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Caixa: Styllo Ótica</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo diário de entradas (Pix/Cartões) e saídas.</p>
          </div>
        </div>
        <Link href="/faturamento/conta-styllo/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
          <Plus className="h-5 w-5" /> Novo Registo
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Data / Ref</th>
                <th className="p-5 text-center bg-blue-50/30">PIX</th>
                <th className="p-5 text-center bg-blue-50/10">Cartões (Créd / Déb)</th>
                <th className="p-5 text-center bg-rose-50/30">Saídas</th>
                <th className="p-5 text-right bg-slate-100">Total Líquido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {movimentacoes.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-slate-500">Nenhum registo encontrado.</td></tr>
              ) : (
                movimentacoes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-slate-900">{new Date(c.data).toLocaleDateString('pt-BR')}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 tracking-widest font-black">{c.mesReferencia}/{c.anoBase}</p>
                    </td>
                    <td className="p-5 text-center bg-blue-50/10">
                      <span className="font-bold text-blue-700">{(c.pix || 0).toFixed(2)}</span>
                    </td>
                    <td className="p-5 text-center">
                      <div className="text-xs space-y-1">
                        <div><span className="text-slate-400">Crédito:</span> {(c.credito || 0).toFixed(2)}</div>
                        <div><span className="text-slate-400">Débito:</span> {(c.debito || 0).toFixed(2)}</div>
                      </div>
                    </td>
                    <td className="p-5 text-center bg-rose-50/10">
                      <span className="font-bold text-rose-600 flex items-center justify-center gap-1"><ArrowDownRight className="h-3 w-3"/> {(c.saida || 0).toFixed(2)}</span>
                    </td>
                    <td className="p-5 text-right bg-slate-50/50">
                      <p className={`font-black text-lg flex items-center justify-end gap-1 ${(c.total || 0) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {(c.total || 0) >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        R$ {(c.total || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </p>
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