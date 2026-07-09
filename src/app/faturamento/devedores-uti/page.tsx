import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clientesDevedoresUti } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, UserMinus, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';

export default async function DevedoresUtiPage() {
  const devedores = await db.select().from(clientesDevedoresUti).orderBy(desc(clientesDevedoresUti.data)).limit(100);

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><UserMinus className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Devedores da UTI</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de clientes com pendências no laboratório.</p>
          </div>
        </div>
        <Link href="/faturamento/devedores-uti/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
          <Plus className="h-5 w-5" /> Registar Devedor
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Data / Cliente</th>
                <th className="p-5">Serviço Realizado</th>
                <th className="p-5 text-right bg-rose-50/30">Valor Devido</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {devedores.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-slate-500">Nenhum devedor registado! Parabéns!</td></tr>
              ) : (
                devedores.map((d) => (
                  <tr key={d.id} className={`hover:bg-slate-50/50 transition-colors ${d.pago === 'SIM' ? 'opacity-70' : ''}`}>
                    <td className="p-5">
                      <p className="font-bold text-slate-900 uppercase">{d.cliente}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{new Date(d.data).toLocaleDateString('pt-BR')} • {d.contato || 'Sem Contato'}</p>
                    </td>
                    <td className="p-5 uppercase text-xs font-bold text-slate-700">{d.servicos}</td>
                    <td className="p-5 text-right bg-rose-50/10">
                      <span className={`font-black text-lg ${d.pago === 'SIM' ? 'text-slate-400 line-through' : 'text-rose-600'}`}>
                        R$ {(d.valor || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      {d.pago === 'SIM' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black tracking-widest"><CheckCircle2 className="h-4 w-4"/> PAGO</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-[10px] font-black tracking-widest"><AlertCircle className="h-4 w-4"/> PENDENTE</span>
                      )}
                    </td>
                    <td className="p-5 text-center">
                      <Link href={`/faturamento/devedores-uti/${d.id}/editar`} className="inline-block p-2 bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </Link>
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