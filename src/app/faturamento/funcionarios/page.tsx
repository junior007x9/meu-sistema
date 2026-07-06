import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { controleFuncionarios } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Users, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, CalendarDays, Scale } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function FuncionariosPage() {
  const registros = await db.select().from(controleFuncionarios).orderBy(desc(controleFuncionarios.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Faturamento por Mês</h1>
          <p className="text-slate-500 mt-1">Controle de entradas, repasses e serviços.</p>
        </div>
        <Link href="/faturamento/funcionarios/novo" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Lançar Despesas (Mês)
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Landmark className="h-4 w-4" /> Conta Styllo Ótica</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Handshake className="h-4 w-4" /> Serviços Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-white border-t-2 border-x-2 border-emerald-600 text-slate-900 font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap shadow-sm"><Users className="h-4 w-4 text-emerald-600" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Scale className="h-4 w-4" /> Balanço</Link>
      </div>

      <div className="space-y-8">
        {registros.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-300 p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <Users className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum mês de funcionário registrado</h3>
          </div>
        ) : (
          registros.map((item) => {
            const dias = JSON.parse(item.diasJson);
            const renderCell = (status: string, val: number) => {
              if (status === 'F') return 'F';
              if (val === 0 || !val) return '';
              return val.toFixed(2).replace('.', ',');
            };

            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-400 shadow-sm overflow-hidden">
                <div className="bg-[#c2d69b] text-black text-center border-b border-slate-400 p-2 font-black uppercase text-[11px] sm:text-sm">ACOMPANHAMENTO DO ESTÁGIO DA FUNCIONÁRIO - INÍCIO: {item.dataInicio}</div>
                <div className="bg-[#d7e3bc] text-black text-center border-b border-slate-400 p-2 font-bold uppercase text-[11px] sm:text-sm relative">DESPESAS MÊS DE {item.mesReferencia} - ({item.nome})
                  <div className="absolute right-2 top-1.5"><BotoesAcao id={item.id} tabela="funcionarios" caminho="/faturamento/funcionarios" linkEditar={`/faturamento/funcionarios/${item.id}/editar`} /></div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#d7e3bc] text-black font-black text-xs">
                        <th className="p-2 border border-slate-400 w-48 text-left" rowSpan={2}>DESPESAS</th>
                        <th className="p-2 border border-slate-400" colSpan={dias.length}>VALOR DIÁRIO</th>
                        <th className="p-2 border border-slate-400 bg-[#eaf1dd] w-24" rowSpan={2}>TOTAL</th>
                      </tr>
                      <tr className="bg-[#d7e3bc] text-black font-black text-[11px]">{dias.map((d: any, i: number) => (<th key={i} className="p-1.5 border border-slate-400 w-10">{d.dia}</th>))}</tr>
                    </thead>
                    <tbody className="text-[11px] sm:text-xs font-bold text-slate-800">
                      <tr><td className="p-1.5 border border-slate-400 text-left">VALE TRANSPORTE</td>{dias.map((d: any, i: number) => <td key={i} className="p-1.5 border border-slate-400">{renderCell(d.status, d.vt)}</td>)}<td className="p-1.5 border border-slate-400">{item.totalVt.toFixed(2).replace('.', ',')}</td></tr>
                      <tr><td className="p-1.5 border border-slate-400 text-left">VALE ALIMENTAÇÃO</td>{dias.map((d: any, i: number) => <td key={i} className="p-1.5 border border-slate-400">{renderCell(d.status, d.va)}</td>)}<td className="p-1.5 border border-slate-400">{item.totalVa.toFixed(2).replace('.', ',')}</td></tr>
                      <tr><td className="p-1.5 border border-slate-400 text-left">SALÁRIO COMERCIAL</td>{dias.map((d: any, i: number) => <td key={i} className="p-1.5 border border-slate-400">{renderCell(d.status, d.sal)}</td>)}<td className="p-1.5 border border-slate-400">{item.totalSalario.toFixed(2).replace('.', ',')}</td></tr>
                      <tr><td className="p-1.5 border border-slate-400 text-left">FÉRIAS</td>{dias.map((d: any, i: number) => <td key={i} className="p-1.5 border border-slate-400">{renderCell(d.status, d.fer)}</td>)}<td className="p-1.5 border border-slate-400">{item.totalFerias.toFixed(2).replace('.', ',')}</td></tr>
                      <tr><td className="p-1.5 border border-slate-400 text-left">13º SALÁRIO</td>{dias.map((d: any, i: number) => <td key={i} className="p-1.5 border border-slate-400">{renderCell(d.status, d.d13)}</td>)}<td className="p-1.5 border border-slate-400">{item.total13.toFixed(2).replace('.', ',')}</td></tr>
                    </tbody>
                    <tfoot><tr className="text-sm font-black text-black"><td colSpan={dias.length + 1} className="p-2 border border-slate-400 text-right uppercase bg-white">TOTAL</td><td className="p-2 border border-slate-400 bg-white">{item.totalGeral.toFixed(2).replace('.', ',')}</td></tr></tfoot>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}