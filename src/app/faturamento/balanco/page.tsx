import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { balancoAnual } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Scale, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function BalancoPage() {
  const registros = await db.select().from(balancoAnual).orderBy(desc(balancoAnual.ano));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Balanço Anual</h1>
          <p className="text-slate-500 mt-1">Visão geral do ano: compras, entradas e saídas.</p>
        </div>
        <Link href="/faturamento/balanco/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Novo Balanço
        </Link>
      </div>

      {/* SISTEMA DE ABAS */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Landmark className="h-4 w-4" /> Conta Styllo Ótica</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Handshake className="h-4 w-4" /> Serviços Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-white border-t-2 border-x-2 border-slate-900 text-slate-900 font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap shadow-sm"><Scale className="h-4 w-4" /> Balanço</Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {registros.length === 0 ? (
          <div className="xl:col-span-2 bg-white rounded-xl border border-slate-300 p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <Scale className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum Balanço Anual Registrado</h3>
          </div>
        ) : (
          registros.map((item) => {
            const meses = JSON.parse(item.mesesJson);
            
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-400 shadow-sm overflow-hidden">
                <div className="bg-white text-black text-center border-b border-slate-400 p-3 font-black uppercase tracking-widest relative">
                  BALANÇO {item.ano}
                  <div className="absolute right-3 top-2.5">
                     <BotoesAcao id={item.id} tabela="balanco" caminho="/faturamento/balanco" linkEditar={`/faturamento/balanco/${item.id}/editar`} />
                  </div>
                </div>

                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-white text-black font-black text-xs uppercase">
                      <th className="p-2 border border-slate-400 w-16">MÊS</th>
                      <th className="p-2 border border-slate-400 w-1/3">COMPRAS</th>
                      <th className="p-2 border border-slate-400 w-1/3">ENTRADA R$</th>
                      <th className="p-2 border border-slate-400 w-1/3">SAÍDA - CARTÃO/PIX</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-slate-700 bg-white">
                    {meses.map((m: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 border border-slate-400 font-black text-slate-900">{m.mes}</td>
                        <td className="p-2 border border-slate-400 text-orange-700">{m.compras > 0 ? m.compras.toFixed(2).replace('.', ',') : ''}</td>
                        <td className="p-2 border border-slate-400 text-green-700">{m.entrada > 0 ? m.entrada.toFixed(2).replace('.', ',') : ''}</td>
                        <td className="p-2 border border-slate-400 text-red-700">{m.saida > 0 ? m.saida.toFixed(2).replace('.', ',') : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="text-sm font-black text-slate-900 bg-slate-100">
                      <td className="p-3 border border-slate-400 uppercase">TOTAL</td>
                      <td className="p-3 border border-slate-400 text-orange-800">{item.totalCompras.toFixed(2).replace('.', ',')}</td>
                      <td className="p-3 border border-slate-400 text-green-800">{item.totalEntrada.toFixed(2).replace('.', ',')}</td>
                      <td className="p-3 border border-slate-400 text-red-800">{item.totalSaida.toFixed(2).replace('.', ',')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}