import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { servicosIndicados } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Handshake, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';

export default async function ServicosIndicadosPage() {
  const indicacoes = await db.select().from(servicosIndicados).orderBy(desc(servicosIndicados.data)).limit(100);

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Handshake className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Serviços Indicados</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de comissões, parcerias e valores devidos.</p>
          </div>
        </div>
        <Link href="/faturamento/servicos-indicados/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
          <Plus className="h-5 w-5" /> Registar Indicação
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Data / Indicado Por</th>
                <th className="p-5">Serviço Realizado</th>
                <th className="p-5 text-right bg-slate-50/50">Valor Total</th>
                <th className="p-5 text-right bg-indigo-50/30">Comissão Devida</th>
                <th className="p-5 text-center">Status Comissão</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {indicacoes.length === 0 ? (
                <tr><td colSpan={6} className="p-10 text-center text-slate-500">Nenhuma indicação registada.</td></tr>
              ) : (
                indicacoes.map((s) => (
                  <tr key={s.id} className={`hover:bg-slate-50/50 transition-colors ${s.servicoPago === 'SIM' ? 'opacity-70' : ''}`}>
                    <td className="p-5">
                      <p className="font-bold text-slate-900 uppercase">{s.quemIndicou}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{new Date(s.data).toLocaleDateString('pt-BR')} • {s.contatos || 'S/C'}</p>
                    </td>
                    <td className="p-5 uppercase text-xs font-bold text-slate-700">{s.servico}</td>
                    <td className="p-5 text-right">R$ {(s.valor || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                    <td className="p-5 text-right bg-indigo-50/10">
                      <span className={`font-black text-lg ${s.servicoPago === 'SIM' ? 'text-slate-400 line-through' : 'text-indigo-600'}`}>
                        R$ {(s.valorDevido || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      {s.servicoPago === 'SIM' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black tracking-widest"><CheckCircle2 className="h-4 w-4"/> PAGO</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-black tracking-widest"><AlertCircle className="h-4 w-4"/> A PAGAR</span>
                      )}
                    </td>
                    <td className="p-5 text-center">
                      <Link href={`/faturamento/servicos-indicados/${s.id}/editar`} className="inline-block p-2 bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 rounded-lg transition-colors">
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