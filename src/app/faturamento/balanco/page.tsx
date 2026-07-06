import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { balancoAnual } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Scale, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays, Wallet, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function BalancoPage() {
  const registros = await db.select().from(balancoAnual).orderBy(desc(balancoAnual.ano));

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Balanço Anual', texto: 'A visão macroscópica do seu negócio. Compare compras, entradas e saídas mês a mês para entender a saúde anual da ótica.' },
    { elemento: '.table-container', titulo: 'Resumo por Ano', texto: 'Cada bloco representa um ano inteiro. O formulário inteligente facilita o preenchimento de Janeiro a Dezembro numa única tela.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Balanço Anual</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Visão geral e desempenho do ano financeiro.</p>
        </div>
        <Link href="/faturamento/balanco/novo" className="w-full sm:w-auto text-center bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none">
          <Plus className="h-4 w-4" /> Novo Balanço
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none snap-x mask-linear-edge">
         <Link href="/faturamento/joaozinho" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-slate-900 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 table-container">
        {registros.length === 0 ? (
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-16 flex flex-col items-center justify-center text-center shadow-sm"><Scale className="h-12 w-16 text-slate-300 mb-4 animate-bounce" /><h3 className="text-base font-black text-slate-900">Nenhum Balanço Anual Registrado</h3></div>
        ) : (
          registros.map((item) => {
            const meses = JSON.parse(item.mesesJson);
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="bg-slate-50 text-slate-900 text-center border-b border-slate-200 p-4 font-black uppercase tracking-widest relative">
                  BALANÇO {item.ano}
                  <div className="absolute right-3 top-3"><BotoesAcao id={item.id} tabela="balanco" caminho="/faturamento/balanco" linkEditar={`/faturamento/balanco/${item.id}/editar`} /></div>
                </div>
                <div className="overflow-x-auto scrollbar-thin select-none">
                  <table className="w-full text-center border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-white text-slate-500 font-black text-[10px] uppercase border-b border-slate-100">
                        <th className="p-3 border-r border-slate-100 w-16">MÊS</th><th className="p-3 border-r border-slate-100 w-1/3">COMPRAS</th>
                        <th className="p-3 border-r border-slate-100 w-1/3">ENTRADA R$</th><th className="p-3 border-r border-slate-100 w-1/3">SAÍDA - CARTÃO/PIX</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-bold text-slate-700 divide-y divide-slate-100">
                      {meses.map((m: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3 border-r border-slate-100 font-black text-slate-900 bg-slate-50/30">{m.mes}</td>
                          <td className="p-3 border-r border-slate-100 text-orange-600">{m.compras > 0 ? `R$ ${m.compras.toFixed(2).replace('.', ',')}` : '-'}</td>
                          <td className="p-3 border-r border-slate-100 text-green-600">{m.entrada > 0 ? `R$ ${m.entrada.toFixed(2).replace('.', ',')}` : '-'}</td>
                          <td className="p-3 border-r border-slate-100 text-red-600">{m.saida > 0 ? `R$ ${m.saida.toFixed(2).replace('.', ',')}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="text-sm font-black text-slate-900 bg-slate-100/80 border-t border-slate-200">
                        <td className="p-4 border-r border-slate-200 uppercase">TOTAL</td>
                        <td className="p-4 border-r border-slate-200 text-orange-700">R$ {item.totalCompras.toFixed(2).replace('.', ',')}</td>
                        <td className="p-4 border-r border-slate-200 text-green-700">R$ {item.totalEntrada.toFixed(2).replace('.', ',')}</td>
                        <td className="p-4 text-red-700">R$ {item.totalSaida.toFixed(2).replace('.', ',')}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
      <TutorialSistema passos={passosAjuda} idContexto="balanco-anual" />
    </div>
  );
}