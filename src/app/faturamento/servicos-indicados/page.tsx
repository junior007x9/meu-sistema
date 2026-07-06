import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { servicosIndicados } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Handshake, Wrench, Landmark, Activity, BookOpen, UserMinus, Users, CalendarDays, Scale, Wallet } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function ServicosIndicadosPage() {
  const registros = await db.select().from(servicosIndicados).orderBy(desc(servicosIndicados.data));
  const somaValor = registros.reduce((acc, curr) => acc + curr.valor, 0);
  const somaDevido = registros.reduce((acc, curr) => acc + curr.valorDevido, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Faturamento por Mês</h1>
          <p className="text-slate-500 mt-1">Controle de entradas, repasses e serviços.</p>
        </div>
        <Link href="/faturamento/servicos-indicados/novo" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Nova Indicação
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Landmark className="h-4 w-4" /> Conta Styllo Ótica</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-white border-t-2 border-x-2 border-indigo-600 text-slate-900 font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap shadow-sm"><Handshake className="h-4 w-4 text-indigo-600" /> Serviços Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
      </div>

      <div className="bg-white rounded-b-xl rounded-tr-xl border border-slate-300 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center"><Handshake className="h-16 w-16 text-slate-300 mb-4" /><h3 className="text-lg font-bold text-slate-900">Nenhum serviço indicado registrado</h3></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1000px] border border-slate-400">
              <thead>
                <tr><th colSpan={8} className="bg-indigo-600 text-white py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">SERVIÇOS INDICADOS POR ÓTICAS</th></tr>
                <tr className="text-xs uppercase tracking-wider font-black text-black bg-slate-50">
                  <th className="p-3 border border-slate-400 text-left">QUEM INDICOU</th><th className="p-3 border border-slate-400">CONTATOS</th>
                  <th className="p-3 border border-slate-400 w-24">SERVIÇO PAGO</th><th className="p-3 border border-slate-400 text-left">SERVIÇO</th>
                  <th className="p-3 border border-slate-400 w-28">VALOR (R$)</th><th className="p-3 border border-slate-400 w-28">DATA</th>
                  <th className="p-3 border border-slate-400 text-red-600 w-32">VALOR DEVIDO</th><th className="p-3 border border-slate-400 bg-slate-200 w-24">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-xs text-slate-800">
                    <td className="p-3 border border-slate-400 text-left uppercase text-indigo-900">{item.quemIndicou}</td><td className="p-3 border border-slate-400 text-slate-600">{item.contatos || '-'}</td>
                    <td className="p-3 border border-slate-400"><span className={`px-2 py-1 rounded text-[10px] font-black ${item.servicoPago === 'SIM' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>{item.servicoPago}</span></td>
                    <td className="p-3 border border-slate-400 text-left text-slate-700">{item.servico}</td><td className="p-3 border border-slate-400 text-blue-700 text-sm">R$ {item.valor.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400">{item.data.split('-').reverse().join('/')}</td><td className="p-3 border border-slate-400 text-red-600 text-sm bg-red-50/50">R$ {item.valorDevido.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white"><BotoesAcao id={item.id} tabela="indicados" caminho="/faturamento/servicos-indicados" linkEditar={`/faturamento/servicos-indicados/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="bg-slate-100 text-slate-900 font-black text-sm uppercase">
                    <td colSpan={4} className="p-3 border border-slate-400 text-right">TOTAIS:</td>
                    <td className="p-3 border border-slate-400 text-blue-700">R$ {somaValor.toFixed(2)}</td><td className="p-3 border border-slate-400"></td>
                    <td className="p-3 border border-slate-400 text-red-700 bg-red-100">R$ {somaDevido.toFixed(2)}</td><td className="p-3 border border-slate-400 bg-slate-200"></td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}