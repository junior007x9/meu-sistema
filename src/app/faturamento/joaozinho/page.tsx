import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { servicosJoaozinho } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, BarChart3, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays, Scale, Wallet, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function JoaozinhoPage() {
  const servicos = await db.select().from(servicosJoaozinho).orderBy(desc(servicosJoaozinho.data));
  const totalGeral = servicos.reduce((acc, curr) => acc + curr.total, 0);

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Serviços Joãozinho', texto: 'Este módulo controla os serviços terceirizados feitos pelo Joãozinho, como montagens, transposições e colorações.' },
    { elemento: 'table', titulo: 'Tabela de Serviços', texto: 'Aqui ficam registados os valores de cada serviço. O sistema soma automaticamente a linha para dar o total devido por serviço e o total geral no rodapé.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">Serviços Joãozinho</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Controle de montagens, transposições e colorações.</p>
        </div>
        <Link href="/faturamento/joaozinho/novo" className="w-full sm:w-auto text-center bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none">
          <Plus className="h-4 w-4" /> Novo Lançamento
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none snap-x mask-linear-edge">
         <Link href="/faturamento/joaozinho" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-indigo-600 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {servicos.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center"><BarChart3 className="h-12 w-16 text-slate-300 mb-4 animate-bounce" /><h3 className="text-base font-black text-slate-900">Sem serviços registrados</h3></div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin select-none">
            <table className="w-full text-center border-collapse min-w-[1000px]">
              <thead>
                <tr className="text-[10px] uppercase font-black text-slate-700 bg-slate-50 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200" rowSpan={2}>DATA</th><th className="p-3 border-r border-slate-200" colSpan={6}>SERVIÇOS / VALOR</th>
                  <th className="p-3 border-r border-slate-200 bg-emerald-50 text-emerald-900" rowSpan={2}>TOTAL</th><th className="p-3 bg-slate-50" rowSpan={2}>AÇÕES</th>
                </tr>
                <tr className="text-[9px] uppercase font-black text-slate-500 bg-slate-50/50 border-b border-slate-200">
                  <th className="p-2 border-r border-slate-200">MONTAGEM</th><th className="p-2 border-r border-slate-200">VALOR</th>
                  <th className="p-2 border-r border-slate-200">TRANSPOSIÇÃO</th><th className="p-2 border-r border-slate-200">VALOR</th>
                  <th className="p-2 border-r border-slate-200">COLORAÇÃO</th><th className="p-2 border-r border-slate-200">VALOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {servicos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 border-r border-slate-100 text-slate-900">{item.data.split('-').reverse().join('/')} <br/><span className="text-[9px] text-slate-400">{item.mesReferencia}/{item.anoBase}</span></td>
                    <td className="p-3 border-r border-slate-100 text-left text-slate-500 font-medium">{item.montagem || '-'}</td><td className="p-3 border-r border-slate-100 text-blue-700">R$ {item.montagemValor.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-left text-slate-500 font-medium">{item.transposicao || '-'}</td><td className="p-3 border-r border-slate-100 text-orange-700">R$ {item.transposicaoValor.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-left text-slate-500 font-medium">{item.coloracao || '-'}</td><td className="p-3 border-r border-slate-100 text-purple-700">R$ {item.coloracaoValor.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 bg-emerald-50/30 text-emerald-900 font-black text-sm">R$ {item.total.toFixed(2)}</td>
                    <td className="p-2 bg-white"><BotoesAcao id={item.id} tabela="joaozinho" caminho="/faturamento/joaozinho" linkEditar={`/faturamento/joaozinho/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="bg-slate-50 border-t border-slate-200"><td colSpan={7} className="p-4 text-right font-black uppercase text-slate-700">Total Faturado:</td><td className="p-4 bg-emerald-100 text-emerald-950 font-black text-lg">R$ {totalGeral.toFixed(2)}</td><td className="p-4"></td></tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <TutorialSistema passos={passosAjuda} idContexto="joaozinho" />
    </div>
  );
}