import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { contasBancarias, transacoes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Landmark, Building2, User } from 'lucide-react';

export default async function FinanceiroPage() {
  const contas = await db.select().from(contasBancarias);
  const listaTransacoes = await db.select().from(transacoes).orderBy(desc(transacoes.dataTransacao)).limit(50);

  // Calcula o saldo total da Empresa vs Pessoal
  const calcularSaldo = (escopo: string) => {
    const contasEscopo = contas.filter(c => c.escopo === escopo);
    let saldo = contasEscopo.reduce((acc, c) => acc + c.saldoInicial, 0);
    
    listaTransacoes.filter(t => t.escopo === escopo && t.status === 'PAGO').forEach(t => {
      if (t.tipo === 'ENTRADA') saldo += t.valor;
      if (t.tipo === 'SAIDA') saldo -= t.valor;
    });
    return saldo;
  };

  const saldoEmpresa = calcularSaldo('EMPRESA');
  const saldoPessoal = calcularSaldo('PESSOAL');

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Wallet className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Centro Financeiro</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de contas, despesas e receitas (Empresa vs Pessoal).</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link href="/financeiro/contas/novo" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center">
            <Landmark className="h-5 w-5" /> Nova Conta
          </Link>
          <Link href="/financeiro/transacoes/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
            <Plus className="h-5 w-5" /> Lançar Transação
          </Link>
        </div>
      </div>

      {/* CARDS DE SALDOS (EMPRESA VS PESSOAL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10"><Building2 className="h-24 w-24 text-white" /></div>
          <div className="relative z-10 space-y-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">Saldo Empresa (Ótica)</span>
            <p className="text-4xl font-black text-white">R$ {saldoEmpresa.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-6 rounded-3xl border border-indigo-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10"><User className="h-24 w-24 text-white" /></div>
          <div className="relative z-10 space-y-4">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">Saldo Pessoal</span>
            <p className="text-4xl font-black text-white">R$ {saldoPessoal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE TRANSAÇÕES */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Últimas Movimentações</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Data / Descrição</th>
                <th className="p-5 text-center">Escopo</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {listaTransacoes.length === 0 ? (
                <tr><td colSpan={4} className="p-10 text-center text-slate-500">Nenhuma transação registada.</td></tr>
              ) : (
                listaTransacoes.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-slate-900 uppercase">{t.descricao}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{new Date(t.dataTransacao || '').toLocaleDateString('pt-BR')}</p>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase ${t.escopo === 'EMPRESA' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-600'}`}>
                        {t.escopo}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase ${t.status === 'PAGO' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <span className={`font-black text-base flex items-center justify-end gap-1 ${t.tipo === 'ENTRADA' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {t.tipo === 'ENTRADA' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        R$ {t.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}