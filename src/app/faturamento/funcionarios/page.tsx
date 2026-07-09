import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { controleFuncionarios } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Users, CalendarCheck, Edit3 } from 'lucide-react';

export default async function FuncionariosPage() {
  const funcionarios = await db.select().from(controleFuncionarios).orderBy(desc(controleFuncionarios.criadoEm)).limit(100);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Users className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Controlo de Funcionários</h1>
            <p className="text-sm text-slate-500 font-medium">Gestão de dias trabalhados, salários, vales e décimo terceiro.</p>
          </div>
        </div>
        <Link href="/faturamento/funcionarios/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
          <Plus className="h-5 w-5" /> Nova Folha Mensal
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Mês Ref / Funcionário</th>
                <th className="p-5 text-center bg-slate-100/50">VT + VA</th>
                <th className="p-5 text-center bg-slate-100/50">Salário / Férias / 13º</th>
                <th className="p-5 text-right bg-indigo-50/30">Total a Pagar</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {funcionarios.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-slate-500">Nenhuma folha de funcionário registada.</td></tr>
              ) : (
                funcionarios.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-black text-slate-900 uppercase text-lg">{f.nome}</p>
                      <p className="text-xs text-slate-500 mt-0.5 tracking-widest font-bold flex items-center gap-1">
                        <CalendarCheck className="h-3 w-3"/> {f.mesReferencia}
                      </p>
                    </td>
                    <td className="p-5 text-center">
                      <div className="text-xs space-y-1">
                        <div><span className="text-slate-400 font-bold">VT:</span> R$ {(f.totalVt || 0).toFixed(2)}</div>
                        <div><span className="text-slate-400 font-bold">VA:</span> R$ {(f.totalVa || 0).toFixed(2)}</div>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="text-xs space-y-1">
                        <div><span className="text-slate-400 font-bold">Salário:</span> R$ {(f.totalSalario || 0).toFixed(2)}</div>
                        {(f.totalFerias || 0) > 0 && <div><span className="text-emerald-500 font-bold">Férias:</span> R$ {f.totalFerias.toFixed(2)}</div>}
                        {(f.total13 || 0) > 0 && <div><span className="text-amber-500 font-bold">13º:</span> R$ {f.total13.toFixed(2)}</div>}
                      </div>
                    </td>
                    <td className="p-5 text-right bg-indigo-50/10">
                      <p className="font-black text-indigo-700 text-xl">R$ {(f.totalGeral || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    </td>
                    <td className="p-5 text-center">
                      <Link href={`/faturamento/funcionarios/${f.id}/editar`} className="inline-block p-2 bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 rounded-lg transition-colors">
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