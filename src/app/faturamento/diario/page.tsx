import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { faturamentoDiario } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, CalendarDays, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, Scale, Wallet, HeartPulse } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function FaturamentoDiarioPage() {
  const registros = await db.select().from(faturamentoDiario).orderBy(desc(faturamentoDiario.data));

  const sCompra = registros.reduce((a, b) => a + b.compra, 0);
  const sTotal = registros.reduce((a, b) => a + b.total, 0);
  const sSaidaDinheiro = registros.reduce((a, b) => a + b.saidaDinheiro, 0);
  const sSaidaPix = registros.reduce((a, b) => a + b.saidaPix, 0);
  const sDizimo = registros.reduce((a, b) => a + b.dizimo, 0);
  const despesasCaixa = sSaidaDinheiro + sSaidaPix;
  const totalLiquido = sTotal - sCompra - sDizimo - despesasCaixa;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight text-slate-900">Faturamento Diário</h1></div>
        <Link href="/faturamento/diario/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5"><Plus className="h-5 w-5" /> Novo Faturamento</Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-white border-t-2 border-x-2 border-slate-900 text-slate-900 font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap shadow-sm"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><HeartPulse className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-xl shadow-sm text-center"><p className="text-xs font-black uppercase text-emerald-800">TOTAL BRUTO</p><h3 className="text-2xl font-black text-emerald-900">R$ {sTotal.toFixed(2)}</h3></div>
        <div className="bg-green-100 border border-green-300 p-4 rounded-xl shadow-sm text-center"><p className="text-xs font-black uppercase text-green-800">DÍZIMO (10%)</p><h3 className="text-2xl font-black text-green-900">R$ {sDizimo.toFixed(2)}</h3></div>
        <div className="bg-red-100 border border-red-300 p-4 rounded-xl shadow-sm text-center"><p className="text-xs font-black uppercase text-red-800">DESPESAS DE CAIXA</p><h3 className="text-2xl font-black text-red-900">R$ {despesasCaixa.toFixed(2)}</h3></div>
        <div className="bg-slate-200 border border-slate-400 p-4 rounded-xl shadow-sm text-center"><p className="text-xs font-black uppercase text-slate-800">TOTAL LÍQUIDO</p><h3 className="text-2xl font-black text-slate-900">R$ {totalLiquido.toFixed(2)}</h3></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center"><CalendarDays className="h-16 w-16 text-slate-300 mb-4" /><h3 className="text-lg font-bold text-slate-900">Nenhum faturamento registrado</h3></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1400px] border border-slate-400">
              <thead>
                <tr><th colSpan={13} className="bg-slate-900 text-white py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">FATURAMENTO DIÁRIO</th></tr>
                <tr className="text-[10px] uppercase font-black text-black bg-slate-100">
                  <th className="p-2 border border-slate-400 w-24" rowSpan={2}>DATA</th><th className="p-2 border border-slate-400 w-48 text-left" rowSpan={2}>VENDAS / SERVIÇOS</th>
                  <th className="p-2 border border-slate-400 w-24" rowSpan={2}>R$ COMPRA</th><th className="p-2 border border-slate-400" colSpan={4}>FORMA DE PAGAMENTO</th>
                  <th className="p-2 border border-slate-400 w-28 bg-[#c2d69b]" rowSpan={2}>TOTAL</th><th className="p-2 border border-slate-400" colSpan={2}>SAÍDA PAGAMENTO</th>
                  <th className="p-2 border border-slate-400 w-24 bg-green-100 text-green-800" rowSpan={2}>DÍZIMO</th><th className="p-2 border border-slate-400 w-24" rowSpan={2}>FAT. DIÁRIO<br/>EM ESPÉCIE</th>
                  <th className="p-2 border border-slate-400 bg-slate-200" rowSpan={2}>AÇÕES</th>
                </tr>
                <tr className="text-[9px] uppercase font-black text-black bg-slate-50">
                  <th className="p-2 border border-slate-400 w-24">R$ ESPÉCIE</th><th className="p-2 border border-slate-400 w-24">R$ CARTÃO<br/>CRÉDITO</th>
                  <th className="p-2 border border-slate-400 w-24">R$ CARTÃO<br/>DÉBITO</th><th className="p-2 border border-slate-400 w-24">R$ PIX</th>
                  <th className="p-2 border border-slate-400 w-20 text-red-600">R$</th><th className="p-2 border border-slate-400 w-20 text-red-600">PIX</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-xs text-slate-800">
                    <td className="p-2 border border-slate-400">{item.data.split('-').reverse().join('/')} <br/><span className="text-[8px] text-slate-400">{item.mesReferencia}</span></td>
                    <td className="p-2 border border-slate-400 text-left uppercase text-slate-600">{item.descricao}</td><td className="p-2 border border-slate-400 text-orange-600">{item.compra.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400">{item.especie.toFixed(2)}</td><td className="p-2 border border-slate-400">{item.credito.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400">{item.debito.toFixed(2)}</td><td className="p-2 border border-slate-400">{item.pix.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400 bg-[#eaf1dd] text-green-900 font-black text-sm">{item.total.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400 text-red-600">{item.saidaDinheiro.toFixed(2)}</td><td className="p-2 border border-slate-400 text-red-600">{item.saidaPix.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400 text-green-700 bg-green-50">{item.dizimo.toFixed(2)}</td><td className="p-2 border border-slate-400 text-blue-800 bg-blue-50">{item.fatEspecie.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400 bg-white"><BotoesAcao id={item.id} tabela="diario" caminho="/faturamento/diario" linkEditar={`/faturamento/diario/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}