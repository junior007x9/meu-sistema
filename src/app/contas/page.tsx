import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { contasMensais } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { FileText, Plus, Zap, Droplets } from 'lucide-react';

export default async function ContasMensaisPage() {
  const contas = await db.select().from(contasMensais).orderBy(desc(contasMensais.id));

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><FileText className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Divisão de Contas & Repasses</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de despesas fixas (Equatorial, Água) e cálculos de partilha.</p>
          </div>
        </div>
        <Link href="/contas-mensais/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
          <Plus className="h-5 w-5" /> Novo Lançamento
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Mês de Referência</th>
                <th className="p-5 text-center bg-yellow-50/30"><span className="flex items-center justify-center gap-1"><Zap className="h-3.5 w-3.5 text-yellow-500" /> Fatura Equatorial</span></th>
                <th className="p-5 text-center bg-blue-50/30"><span className="flex items-center justify-center gap-1"><Droplets className="h-3.5 w-3.5 text-blue-500" /> Fatura Água</span></th>
                <th className="p-5 text-center bg-slate-100/30">Total a Repassar (Aline)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {contas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-500">Nenhum repasse registado.</td>
                </tr>
              ) : (
                contas.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 font-black text-slate-800 uppercase text-lg">{c.mesReferencia}</td>
                    
                    <td className="p-5 text-center bg-yellow-50/10">
                      <p className="font-bold text-slate-800">Total: R$ {(c.totalRs || 0).toFixed(2)}</p>
                      <div className="text-[11px] text-slate-500 mt-1 space-x-2">
                        <span>B: R$ {(c.equatorialBarbosa || 0).toFixed(2)}</span>
                        <span>A: R$ {(c.equatorialAline || 0).toFixed(2)}</span>
                      </div>
                    </td>

                    <td className="p-5 text-center bg-blue-50/10">
                      <div className="text-[11px] text-slate-500 space-x-2">
                        <span>B: R$ {(c.aguaBarbosa || 0).toFixed(2)}</span>
                        <span>A: R$ {(c.aguaAline || 0).toFixed(2)}</span>
                      </div>
                    </td>

                    <td className="p-5 text-center bg-emerald-50/10">
                      <p className="font-black text-emerald-700 text-lg">R$ {(c.totalAlineGeral || 0).toFixed(2)}</p>
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