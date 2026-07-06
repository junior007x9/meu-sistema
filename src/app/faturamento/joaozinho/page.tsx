import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { servicosJoaozinho } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, BarChart3, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function JoaozinhoPage() {
  const servicos = await db.select().from(servicosJoaozinho).orderBy(desc(servicosJoaozinho.data));
  const totalGeral = servicos.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Faturamento por Mês</h1>
          <p className="text-slate-500 mt-1">Controle de entradas, repasses e serviços.</p>
        </div>
        <Link href="/faturamento/joaozinho/novo" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Novo Lançamento
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo Ótica</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Handshake className="h-4 w-4" /> Serviços Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
      </div>

      <div className="bg-white rounded-b-xl rounded-tr-xl border border-slate-300 shadow-sm overflow-hidden">
        {servicos.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <BarChart3 className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum serviço registrado</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[900px] border border-slate-400">
              <thead>
                <tr>
                  <th colSpan={9} className="bg-slate-100 text-slate-800 py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">
                    SERVIÇOS JOÃOZINHO
                  </th>
                </tr>
                <tr className="text-xs uppercase tracking-wider font-black text-black">
                  <th className="p-3 bg-slate-50 border border-slate-400" rowSpan={2}>DATA</th>
                  <th className="p-2 bg-white border border-slate-400" colSpan={6}>SERVIÇOS / VALOR</th>
                  <th className="p-3 bg-[#92d050] border border-slate-400 text-black" rowSpan={2}>TOTAL</th>
                  <th className="p-3 bg-slate-200 border border-slate-400" rowSpan={2}>AÇÕES</th>
                </tr>
                <tr className="text-[10px] uppercase font-black text-black bg-slate-50">
                  <th className="p-2 border border-slate-400">MONTAGEM</th>
                  <th className="p-2 border border-slate-400">VALOR</th>
                  <th className="p-2 border border-slate-400">TRANSPOSIÇÃO</th>
                  <th className="p-2 border border-slate-400">VALOR</th>
                  <th className="p-2 border border-slate-400">COLORAÇÃO</th>
                  <th className="p-2 border border-slate-400">VALOR</th>
                </tr>
              </thead>
              <tbody>
                {servicos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-xs text-slate-800">
                    <td className="p-3 border border-slate-400">
                      {item.data.split('-').reverse().join('/')} <br/>
                      <span className="text-[9px] text-slate-400">{item.mesReferencia}/{item.anoBase}</span>
                    </td>
                    <td className="p-3 border border-slate-400 text-left text-slate-500 font-medium">{item.montagem || '-'}</td>
                    <td className="p-3 border border-slate-400 text-blue-700">R$ {item.montagemValor.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 text-left text-slate-500 font-medium">{item.transposicao || '-'}</td>
                    <td className="p-3 border border-slate-400 text-orange-700">R$ {item.transposicaoValor.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 text-left text-slate-500 font-medium">{item.coloracao || '-'}</td>
                    <td className="p-3 border border-slate-400 text-purple-700">R$ {item.coloracaoValor.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#92d050]/20 text-green-800 font-black text-sm">R$ {item.total.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white">
                      <BotoesAcao id={item.id} tabela="joaozinho" caminho="/faturamento/joaozinho" linkEditar={`/faturamento/joaozinho/${item.id}/editar`} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr>
                    <td colSpan={7} className="p-3 border border-slate-400 text-right font-black uppercase text-slate-700 bg-slate-100">Total Faturado:</td>
                    <td className="p-3 border border-slate-400 bg-[#92d050] text-black font-black text-lg">R$ {totalGeral.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-slate-100"></td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}