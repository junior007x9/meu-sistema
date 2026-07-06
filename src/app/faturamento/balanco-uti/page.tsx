import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { balancoDiarioUti } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Wallet, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays, Scale, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function BalancoDiarioUtiPage() {
  const registros = await db.select().from(balancoDiarioUti).orderBy(desc(balancoDiarioUti.data));

  // TOTAIS MATEMÁTICOS
  const sCompras = registros.reduce((a, b) => a + b.compras, 0);
  const sDinheiro = registros.reduce((a, b) => a + b.entradaDinheiro, 0);
  const sCredito = registros.reduce((a, b) => a + b.entradaCredito, 0);
  const sDebito = registros.reduce((a, b) => a + b.entradaDebito, 0);
  const sPix = registros.reduce((a, b) => a + b.entradaPix, 0);
  const sSaidas = registros.reduce((a, b) => a + b.saidaPagamentos, 0);

  const totalEntradas = sDinheiro + sCredito + sDebito + sPix;
  const totalLiquido = totalEntradas - sCompras - sSaidas;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Balanço Diário (UTI)</h1>
          <p className="text-slate-500 mt-1">Conferência diária da UTI dos Óculos.</p>
        </div>
        <Link href="/faturamento/balanco-uti/novo" className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Lançar na UTI
        </Link>
      </div>

      {/* O SUPER MENU COM AS 11 ABAS */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2 bg-white border-t-2 border-x-2 border-rose-600 text-slate-900 font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap shadow-sm"><HeartPulse className="h-4 w-4 text-rose-600" /> Balanço UTI</Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center"><HeartPulse className="h-16 w-16 text-slate-300 mb-4" /><h3 className="text-lg font-bold text-slate-900">Nenhum balanço da UTI registrado</h3></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1000px] border border-slate-400">
              <thead>
                <tr>
                  <th colSpan={8} className="bg-rose-50 text-rose-900 py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">
                    UTI DOS ÓCULOS BALANÇO DIÁRIO
                  </th>
                </tr>
                <tr className="text-xs uppercase font-black text-black bg-white">
                  <th className="p-2 border border-slate-400 w-28" rowSpan={2}>DATA</th>
                  <th className="p-2 border border-slate-400 w-32" rowSpan={2}>COMPRAS</th>
                  <th className="p-2 border border-slate-400" colSpan={4}>ENTRADAS</th>
                  <th className="p-2 border border-slate-400 w-40">SAÍDA PAGAMENTOS</th>
                  <th className="p-2 border border-slate-400 bg-slate-100 w-20" rowSpan={2}>AÇÕES</th>
                </tr>
                <tr className="text-[10px] uppercase font-black text-black bg-white">
                  <th className="p-2 border border-slate-400 w-28">R$</th>
                  <th className="p-2 border border-slate-400 w-28">CRÉDITO</th>
                  <th className="p-2 border border-slate-400 w-28">DÉBITO</th>
                  <th className="p-2 border border-slate-400 w-28">PIX</th>
                  <th className="p-2 border border-slate-400">CARTÃO/PIX</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-700">
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2 border border-slate-400">{item.data.split('-').reverse().join('/')}</td>
                    <td className="p-2 border border-slate-400 text-orange-700">{item.compras > 0 ? item.compras.toFixed(2) : '-'}</td>
                    <td className="p-2 border border-slate-400 text-rose-700">{item.entradaDinheiro > 0 ? item.entradaDinheiro.toFixed(2) : '-'}</td>
                    <td className="p-2 border border-slate-400 text-rose-700">{item.entradaCredito > 0 ? item.entradaCredito.toFixed(2) : '-'}</td>
                    <td className="p-2 border border-slate-400 text-rose-700">{item.entradaDebito > 0 ? item.entradaDebito.toFixed(2) : '-'}</td>
                    <td className="p-2 border border-slate-400 text-rose-700">{item.entradaPix > 0 ? item.entradaPix.toFixed(2) : '-'}</td>
                    <td className="p-2 border border-slate-400 text-red-700">{item.saidaPagamentos > 0 ? item.saidaPagamentos.toFixed(2) : '-'}</td>
                    <td className="p-2 border border-slate-400 bg-white">
                      <BotoesAcao id={item.id} tabela="balanco-uti" caminho="/faturamento/balanco-uti" linkEditar={`/faturamento/balanco-uti/${item.id}/editar`} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="font-black text-xs text-black">
                    <td className="p-3 border border-slate-400 bg-white uppercase text-center">TOTAL</td>
                    <td className="p-3 border border-slate-400 bg-white text-orange-700">{sCompras.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white text-rose-700">{sDinheiro.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white text-rose-700">{sCredito.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white text-rose-700">{sDebito.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white text-rose-700">{sPix.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white text-red-700">{sSaidas.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white"></td>
                 </tr>
                 <tr className="font-black text-sm text-black">
                    <td colSpan={2} className="p-3 border border-slate-400 bg-white uppercase text-center">TOTAL LÍQUIDO</td>
                    <td colSpan={4} className="p-3 border border-slate-400 bg-white text-center text-rose-800 text-lg">
                      R$ {totalEntradas.toFixed(2)}
                    </td>
                    <td className="p-3 border border-slate-400 bg-white"></td>
                    <td className="p-3 border border-slate-400 bg-white"></td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {registros.length > 0 && (
        <div className="w-full sm:w-64 bg-white border border-slate-300 rounded-xl shadow-sm p-4 space-y-2 text-sm font-black text-slate-800">
           <div className="flex justify-between"><span>ENTRADAS:</span><span className="text-rose-700">{totalEntradas.toFixed(2)}</span></div>
           <div className="flex justify-between"><span>SAÍDAS:</span><span className="text-red-700">{sSaidas.toFixed(2)}</span></div>
           <div className="flex justify-between"><span>COMPRAS:</span><span className="text-orange-700">{sCompras.toFixed(2)}</span></div>
           <div className="flex justify-between pt-2 border-t border-slate-200 text-base text-black"><span>TOTAL:</span><span className={totalLiquido >= 0 ? 'text-rose-700' : 'text-red-700'}>{totalLiquido.toFixed(2)}</span></div>
        </div>
      )}
    </div>
  );
}