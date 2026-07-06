import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { controleFuncionarios } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Users, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, CalendarDays, Scale, Wallet, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function FuncionariosPage() {
  const registros = await db.select().from(controleFuncionarios).orderBy(desc(controleFuncionarios.id));

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Controle de Funcionários', texto: 'Este ecrã gera a folha de despesas com funcionários por mês, ao estilo de uma folha de ponto ou estágio.' },
    { elemento: 'table', titulo: 'Dinâmica de Faltas', texto: 'Os dias marcados com "F" (falta) não somam valores. O sistema calcula automaticamente o total gasto no mês por cada funcionário.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">Controle de Funcionários</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Gestão de despesas, vales, férias e salários dos colaboradores.</p>
        </div>
        <Link href="/faturamento/funcionarios/novo" className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none">
          <Plus className="h-4 w-4" /> Lançar Despesas (Mês)
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none snap-x mask-linear-edge">
         <Link href="/faturamento/joaozinho" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-emerald-600 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="space-y-8">
        {registros.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 flex flex-col items-center justify-center text-center shadow-sm"><Users className="h-12 w-16 text-slate-300 mb-4 animate-bounce" /><h3 className="text-base font-black text-slate-900">Nenhum funcionário registado</h3></div>
        ) : (
          registros.map((item) => {
            const dias = JSON.parse(item.diasJson);
            const renderCell = (status: string, val: number) => { if (status === 'F') return 'F'; if (val === 0 || !val) return ''; return val.toFixed(2).replace('.', ','); };

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="bg-emerald-50/50 text-emerald-950 text-center border-b border-emerald-100 p-3 font-black uppercase text-[11px] sm:text-sm tracking-widest">
                  ACOMPANHAMENTO DO ESTÁGIO DA FUNCIONÁRIO - INÍCIO: {item.dataInicio}
                </div>
                <div className="bg-emerald-100/50 text-emerald-900 text-center border-b border-emerald-200 p-3 font-bold uppercase text-[11px] sm:text-sm relative">
                  DESPESAS MÊS DE {item.mesReferencia} - ({item.nome})
                  <div className="absolute right-3 top-2"><BotoesAcao id={item.id} tabela="funcionarios" caminho="/faturamento/funcionarios" linkEditar={`/faturamento/funcionarios/${item.id}/editar`} /></div>
                </div>
                <div className="overflow-x-auto scrollbar-thin select-none">
                  <table className="w-full text-center border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-emerald-50/30 text-slate-800 font-black text-xs">
                        <th className="p-3 border-r border-slate-200 w-48 text-left" rowSpan={2}>DESPESAS</th>
                        <th className="p-3 border-r border-slate-200" colSpan={dias.length}>VALOR DIÁRIO</th>
                        <th className="p-3 bg-emerald-100/50 w-28" rowSpan={2}>TOTAL</th>
                      </tr>
                      <tr className="bg-emerald-50/10 text-slate-500 font-black text-[10px]">
                        {dias.map((d: any, i: number) => (<th key={i} className="p-2 border-r border-slate-200 w-12">{d.dia}</th>))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px] sm:text-xs font-bold text-slate-700">
                      <tr className="hover:bg-slate-50"><td className="p-2.5 border-r border-slate-100 text-left">VALE TRANSPORTE</td>{dias.map((d: any, i: number) => <td key={i} className={`p-2.5 border-r border-slate-100 ${d.status === 'F' ? 'text-red-500' : ''}`}>{renderCell(d.status, d.vt)}</td>)}<td className="p-2.5 bg-emerald-50/20">{item.totalVt.toFixed(2).replace('.', ',')}</td></tr>
                      <tr className="hover:bg-slate-50"><td className="p-2.5 border-r border-slate-100 text-left">VALE ALIMENTAÇÃO</td>{dias.map((d: any, i: number) => <td key={i} className={`p-2.5 border-r border-slate-100 ${d.status === 'F' ? 'text-red-500' : ''}`}>{renderCell(d.status, d.va)}</td>)}<td className="p-2.5 bg-emerald-50/20">{item.totalVa.toFixed(2).replace('.', ',')}</td></tr>
                      <tr className="hover:bg-slate-50"><td className="p-2.5 border-r border-slate-100 text-left">SALÁRIO COMERCIAL</td>{dias.map((d: any, i: number) => <td key={i} className={`p-2.5 border-r border-slate-100 ${d.status === 'F' ? 'text-red-500' : ''}`}>{renderCell(d.status, d.sal)}</td>)}<td className="p-2.5 bg-emerald-50/20">{item.totalSalario.toFixed(2).replace('.', ',')}</td></tr>
                      <tr className="hover:bg-slate-50"><td className="p-2.5 border-r border-slate-100 text-left">FÉRIAS</td>{dias.map((d: any, i: number) => <td key={i} className={`p-2.5 border-r border-slate-100 ${d.status === 'F' ? 'text-red-500' : ''}`}>{renderCell(d.status, d.fer)}</td>)}<td className="p-2.5 bg-emerald-50/20">{item.totalFerias.toFixed(2).replace('.', ',')}</td></tr>
                      <tr className="hover:bg-slate-50"><td className="p-2.5 border-r border-slate-100 text-left">13º SALÁRIO</td>{dias.map((d: any, i: number) => <td key={i} className={`p-2.5 border-r border-slate-100 ${d.status === 'F' ? 'text-red-500' : ''}`}>{renderCell(d.status, d.d13)}</td>)}<td className="p-2.5 bg-emerald-50/20">{item.total13.toFixed(2).replace('.', ',')}</td></tr>
                    </tbody>
                    <tfoot><tr className="text-sm font-black text-slate-900 bg-slate-50 border-t border-slate-200"><td colSpan={dias.length + 1} className="p-4 text-right uppercase tracking-widest">TOTAL A PAGAR NO MÊS</td><td className="p-4 bg-emerald-100 text-emerald-900 text-base">{item.totalGeral.toFixed(2).replace('.', ',')}</td></tr></tfoot>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
      <TutorialSistema passos={passosAjuda} idContexto="funcionarios" />
    </div>
  );
}