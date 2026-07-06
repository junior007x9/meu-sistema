import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { controleCarne } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, BookOpen, Wrench, Landmark, Activity, UserMinus, Handshake, Users, CalendarDays, Scale, Wallet, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function CarnesPage() {
  const registros = await db.select().from(controleCarne).orderBy(desc(controleCarne.id));

  const somaVendas = registros.reduce((acc, c) => acc + c.valorVenda, 0);
  const somaEntradas = registros.reduce((acc, c) => acc + c.valorEntrada, 0);
  
  const somaParcelas = Array(10).fill(0);
  let totalGeralTodasParcelas = 0;

  registros.forEach(c => {
    for (let i = 1; i <= 10; i++) {
      const valor = Number((c as any)[`p${i}Valor`]) || 0;
      somaParcelas[i - 1] += valor;
      totalGeralTodasParcelas += valor;
    }
  });

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Controle de Carnês', texto: 'Este ecrã monitoriza as vendas a prazo feitas em carnê, permitindo acompanhar até 10 parcelas por cliente.' },
    { elemento: 'table', titulo: 'Planilha de Parcelas', texto: 'Esta tabela é ultra-larga. Se estiver no telemóvel, deslize horizontalmente para visualizar o vencimento e o valor de cada uma das 10 parcelas.' },
    { elemento: 'tfoot', titulo: 'Totais Consolidados', texto: 'No final da página, o sistema calcula automaticamente o valor total de vendas, entradas recebidas e o montante global de todas as parcelas em aberto.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">Controle de Carnês</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Gestão de vendas parceladas e fluxo de recebimentos.</p>
        </div>
        <Link href="/faturamento/carne/novo" className="w-full sm:w-auto text-center bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none">
          <Plus className="h-4 w-4" /> Novo Carnê
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none snap-x mask-linear-edge">
         <Link href="/faturamento/joaozinho" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-amber-600 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center"><BookOpen className="h-12 w-16 text-slate-300 mb-4 animate-bounce" /><h3 className="text-base font-black text-slate-900">Nenhum carnê em aberto</h3></div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin select-none">
            <table className="w-full text-center border-collapse min-w-[2400px]">
              <thead>
                <tr className="text-[10px] uppercase font-black text-slate-700 bg-slate-50 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 w-12">ID</th><th className="p-3 border-r border-slate-200 w-24">ANO BASE</th>
                  <th className="p-3 border-r border-slate-200 w-48 text-left">CLIENTE</th><th className="p-3 border-r border-slate-200">CONTATO</th>
                  <th className="p-3 border-r border-slate-200">DATA DA COMPRA</th><th className="p-3 border-r border-slate-200 text-blue-900 bg-blue-50/40">VALOR</th>
                  <th className="p-3 border-r border-slate-200 text-emerald-900 bg-emerald-50/40">ENTRAD.</th>
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}><th className="p-3 border-r border-slate-200 bg-amber-50/60 text-amber-900">{i+1}ª (R$)</th><th className="p-3 border-r border-slate-200 bg-slate-50/30 text-slate-500">DATA</th></React.Fragment>
                  ))}
                  <th className="p-3 bg-slate-50">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 border-r border-slate-100 text-slate-400">{item.id}</td><td className="p-3 border-r border-slate-100 text-amber-800 bg-amber-50/20">CARNÊ {item.anoBase}</td>
                    <td className="p-3 border-r border-slate-100 text-left uppercase font-black text-slate-900">{item.cliente}</td><td className="p-3 border-r border-slate-100 text-slate-500">{item.contato || '-'}</td>
                    <td className="p-3 border-r border-slate-100">{item.dataCompra.split('-').reverse().join('/')}</td><td className="p-3 border-r border-slate-100 text-blue-700 font-medium">R$ {item.valorVenda.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-emerald-700 font-medium">R$ {item.valorEntrada.toFixed(2)}</td>
                    {[...Array(10)].map((_, i) => {
                      const v = Number((item as any)[`p${i+1}Valor`]); const d = (item as any)[`p${i+1}Data`];
                      return (<React.Fragment key={i}><td className="p-3 border-r border-slate-100 text-slate-700 font-medium">{v > 0 ? `R$ ${v.toFixed(2)}` : '-'}</td><td className="p-3 border-r border-slate-100 text-slate-400 font-normal">{d ? d.split('-').reverse().join('/') : '-'}</td></React.Fragment>);
                    })}
                    <td className="p-2 bg-white"><BotoesAcao id={item.id} tabela="carne" caminho="/faturamento/carne" linkEditar={`/faturamento/carne/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="bg-amber-100/60 font-black text-xs text-amber-950 border-t border-slate-200">
                    <td colSpan={5} className="p-4 text-right uppercase tracking-wider">TOTAIS DE ACUMULADO:</td>
                    <td className="p-4 border-r border-amber-200 text-blue-900">R$ {somaVendas.toFixed(2)}</td><td className="p-4 border-r border-amber-200 text-emerald-950">R$ {somaEntradas.toFixed(2)}</td>
                    {[...Array(10)].map((_, i) => (<React.Fragment key={i}><td className="p-4 border-r border-amber-200 text-slate-900">{somaParcelas[i] > 0 ? `R$ ${somaParcelas[i].toFixed(2)}` : 'R$ 0,00'}</td><td className="p-4 border-r border-amber-200"></td></React.Fragment>))}
                    <td className="p-4 bg-slate-100"></td>
                 </tr>
                 <tr className="bg-emerald-500 font-black text-sm text-white text-center"><td colSpan={7} className="p-4 text-right uppercase tracking-widest">TOTAL ACUMULADO EM PARCELAS EM ABERTO:</td><td colSpan={21} className="p-4 text-left pl-8 text-base">R$ {totalGeralTodasParcelas.toFixed(2)}</td></tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <TutorialSistema passos={passosAjuda} idContexto="carnes" />
    </div>
  );
}