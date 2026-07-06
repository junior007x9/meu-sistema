import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { balancoDiario } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Wallet, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays, Scale, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function BalancoDiarioPage() {
  const registros = await db.select().from(balancoDiario).orderBy(desc(balancoDiario.data));

  const sCompras = registros.reduce((a, b) => a + b.compras, 0);
  const sDinheiro = registros.reduce((a, b) => a + b.entradaDinheiro, 0);
  const sCredito = registros.reduce((a, b) => a + b.entradaCredito, 0);
  const sDebito = registros.reduce((a, b) => a + b.entradaDebito, 0);
  const sPix = registros.reduce((a, b) => a + b.entradaPix, 0);
  const sSaidas = registros.reduce((a, b) => a + b.saidaPagamentos, 0);

  const totalEntradas = sDinheiro + sCredito + sDebito + sPix;
  const totalLiquido = totalEntradas - sCompras - sSaidas;

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Balanço Diário (Styllo)', texto: 'Controle contábil focado em apurar rapidamente o valor líquido que ficou na gaveta/conta após descontar compras e saídas.' },
    { elemento: '.resumo-inferior', titulo: 'Resumo Instantâneo', texto: 'No canto inferior, o bloco mostra a saúde financeira atual: se o líquido for negativo, ficará vermelho; se for positivo, azul.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Balanço Diário</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Conferência diária de compras, entradas e saídas (Styllo Ótica).</p>
        </div>
        <Link href="/faturamento/balanco-diario/novo" className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none">
          <Plus className="h-4 w-4" /> Lançar no Balanço
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
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-indigo-600 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center"><Wallet className="h-12 w-16 text-slate-300 mb-4 animate-bounce" /><h3 className="text-base font-black text-slate-900">Nenhum balanço registrado</h3></div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin select-none">
            <table className="w-full text-center border-collapse min-w-[1000px]">
              <thead>
                <tr className="text-[10px] uppercase font-black text-indigo-900 bg-indigo-50/50 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 w-28" rowSpan={2}>DATA</th><th className="p-3 border-r border-slate-200 w-32" rowSpan={2}>COMPRAS</th>
                  <th className="p-3 border-r border-slate-200" colSpan={4}>ENTRADAS</th><th className="p-3 border-r border-slate-200 w-40">SAÍDA PAGAMENTOS</th>
                  <th className="p-3 bg-slate-50 w-24" rowSpan={2}>AÇÕES</th>
                </tr>
                <tr className="text-[9px] uppercase font-black text-slate-500 bg-slate-50/30 border-b border-slate-200">
                  <th className="p-2 border-r border-slate-200 w-28">R$ ESPÉCIE</th><th className="p-2 border-r border-slate-200 w-28">CRÉDITO</th>
                  <th className="p-2 border-r border-slate-200 w-28">DÉBITO</th><th className="p-2 border-r border-slate-200 w-28">PIX</th>
                  <th className="p-2 border-r border-slate-200">CARTÃO/PIX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 border-r border-slate-100 text-slate-900">{item.data.split('-').reverse().join('/')}</td>
                    <td className="p-3 border-r border-slate-100 text-orange-600">{item.compras > 0 ? `R$ ${item.compras.toFixed(2)}` : '-'}</td>
                    <td className="p-3 border-r border-slate-100 text-green-700">{item.entradaDinheiro > 0 ? `R$ ${item.entradaDinheiro.toFixed(2)}` : '-'}</td>
                    <td className="p-3 border-r border-slate-100 text-green-700">{item.entradaCredito > 0 ? `R$ ${item.entradaCredito.toFixed(2)}` : '-'}</td>
                    <td className="p-3 border-r border-slate-100 text-green-700">{item.entradaDebito > 0 ? `R$ ${item.entradaDebito.toFixed(2)}` : '-'}</td>
                    <td className="p-3 border-r border-slate-100 text-green-700">{item.entradaPix > 0 ? `R$ ${item.entradaPix.toFixed(2)}` : '-'}</td>
                    <td className="p-3 border-r border-slate-100 text-red-600">{item.saidaPagamentos > 0 ? `R$ ${item.saidaPagamentos.toFixed(2)}` : '-'}</td>
                    <td className="p-2 bg-white"><BotoesAcao id={item.id} tabela="balanco-diario" caminho="/faturamento/balanco-diario" linkEditar={`/faturamento/balanco-diario/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="font-black text-[11px] text-slate-700 bg-slate-50 border-t border-slate-200">
                    <td className="p-4 border-r border-slate-200 uppercase text-right">TOTAIS DAS COLUNAS:</td>
                    <td className="p-4 border-r border-slate-200 text-orange-700">R$ {sCompras.toFixed(2)}</td>
                    <td className="p-4 border-r border-slate-200 text-green-700">R$ {sDinheiro.toFixed(2)}</td><td className="p-4 border-r border-slate-200 text-green-700">R$ {sCredito.toFixed(2)}</td>
                    <td className="p-4 border-r border-slate-200 text-green-700">R$ {sDebito.toFixed(2)}</td><td className="p-4 border-r border-slate-200 text-green-700">R$ {sPix.toFixed(2)}</td>
                    <td className="p-4 border-r border-slate-200 text-red-700">R$ {sSaidas.toFixed(2)}</td><td className="p-4"></td>
                 </tr>
                 <tr className="font-black text-sm text-white bg-indigo-600 text-center">
                    <td colSpan={2} className="p-4 border-r border-indigo-500 uppercase tracking-widest text-right">TOTAL LÍQUIDO ACUMULADO:</td>
                    <td colSpan={6} className="p-4 text-left pl-8 text-lg">R$ {totalLiquido.toFixed(2)}</td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {registros.length > 0 && (
        <div className="w-full sm:w-72 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3 text-sm font-black text-slate-800 resumo-inferior">
           <div className="flex justify-between items-center"><span className="text-slate-500 text-xs tracking-wider">ENTRADAS:</span><span className="text-green-700 text-base">R$ {totalEntradas.toFixed(2)}</span></div>
           <div className="flex justify-between items-center"><span className="text-slate-500 text-xs tracking-wider">SAÍDAS:</span><span className="text-red-600 text-base">R$ {sSaidas.toFixed(2)}</span></div>
           <div className="flex justify-between items-center"><span className="text-slate-500 text-xs tracking-wider">COMPRAS:</span><span className="text-orange-600 text-base">R$ {sCompras.toFixed(2)}</span></div>
           <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-lg text-black mt-2"><span className="uppercase">TOTAL:</span><span className={totalLiquido >= 0 ? 'text-blue-700' : 'text-red-600'}>R$ {totalLiquido.toFixed(2)}</span></div>
        </div>
      )}
      <TutorialSistema passos={passosAjuda} idContexto="balanco-diario" />
    </div>
  );
}