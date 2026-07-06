import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { servicosIndicados } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Handshake, Wrench, Landmark, Activity, BookOpen, UserMinus, Users, CalendarDays, Scale, Wallet, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function ServicosIndicadosPage() {
  const registros = await db.select().from(servicosIndicados).orderBy(desc(servicosIndicados.data));
  
  const somaValor = registros.reduce((acc, curr) => acc + curr.valor, 0);
  const somaDevido = registros.reduce((acc, curr) => acc + curr.valorDevido, 0);

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Serviços Indicados', texto: 'Gerencie indicações e parcerias feitas por outras óticas, acompanhando comissões devidas e valores parciais.' },
    { elemento: '.col-devido', titulo: 'Valor Devido', texto: 'A coluna final rastreia especificamente o montante que a ótica deve repassar ao parceiro comercial indicado.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">Serviços Indicados</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Controle de parcerias, indicações por óticas e repasses de comissão.</p>
        </div>
        <Link href="/faturamento/servicos-indicados/novo" className="w-full sm:w-auto text-center bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none">
          <Plus className="h-4 w-4" /> Nova Indicação
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none snap-x mask-linear-edge">
         <Link href="/faturamento/joaozinho" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-indigo-600 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center"><Handshake className="h-12 w-16 text-slate-300 mb-4 animate-bounce" /><h3 className="text-base font-black text-slate-900">Nenhuma indicação registrada</h3></div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin select-none">
            <table className="w-full text-center border-collapse min-w-[1000px]">
              <thead>
                <tr className="text-[10px] uppercase font-black text-slate-700 bg-slate-50 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 text-left">QUEM INDICOU</th>
                  <th className="p-3 border-r border-slate-200">CONTATOS</th>
                  <th className="p-3 border-r border-slate-200 w-24">SERVIÇO PAGO</th>
                  <th className="p-3 border-r border-slate-200 text-left">SERVIÇO</th>
                  <th className="p-3 border-r border-slate-200 w-28 text-blue-900 bg-blue-50/40">VALOR (R$)</th>
                  <th className="p-3 border-r border-slate-200 w-28">DATA</th>
                  <th className="p-3 border-r border-slate-200 text-red-900 bg-red-50/40 w-32">VALOR DEVIDO</th>
                  <th className="p-3 bg-slate-50 w-24">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 border-r border-slate-100 text-left uppercase text-indigo-950 font-black">{item.quemIndicou}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-500">{item.contatos || '-'}</td>
                    <td className="p-3 border-r border-slate-100">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black inline-block border ${item.servicoPago === 'SIM' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {item.servicoPago}
                      </span>
                    </td>
                    <td className="p-3 border-r border-slate-100 text-left text-slate-600 font-medium">{item.servico}</td>
                    <td className="p-3 border-r border-slate-100 text-blue-700 font-medium">R$ {item.valor.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100">{item.data.split('-').reverse().join('/')}</td>
                    <td className="p-3 border-r border-slate-100 text-red-600 font-medium bg-red-50/10 col-devido">R$ {item.valorDevido.toFixed(2)}</td>
                    <td className="p-2 bg-white"><BotoesAcao id={item.id} tabela="indicados" caminho="/faturamento/servicos-indicados" linkEditar={`/faturamento/servicos-indicados/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="bg-slate-50 border-t border-slate-200 font-black text-xs">
                    <td colSpan={4} className="p-4 text-right uppercase">TOTAIS DE REPASSE:</td>
                    <td className="p-4 text-blue-900 bg-blue-50">R$ {somaValor.toFixed(2)}</td>
                    <td className="p-4"></td>
                    <td className="p-4 text-red-950 bg-red-100">R$ {somaDevido.toFixed(2)}</td>
                    <td className="p-4"></td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <TutorialSistema passos={passosAjuda} idContexto="servicos-indicados" />
    </div>
  );
}