import React from 'react';
import { db } from '@/db';
import { clientes, ordensServico, produtos, transacoes, comprasOnline } from '@/db/schema';
import { count, eq, sql } from 'drizzle-orm';
import { Wrench, UserCheck, ShieldAlert, PiggyBank, Building2, ShoppingBag } from 'lucide-react';

// Força a página a ser dinâmica para atualizar os números em tempo real
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // 1. Buscando dados reais do banco
  const [totalClientes] = await db.select({ value: count() }).from(clientes);
  const [totalOS] = await db.select({ value: count() }).from(ordensServico).where(eq(ordensServico.status, 'EM_CONSERTO'));
  const [estoqueBaixo] = await db.select({ value: count() }).from(produtos).where(sql`${produtos.estoque} < 5`);
  const [comprasPendentes] = await db.select({ value: count() }).from(comprasOnline).where(eq(comprasOnline.situacaoPagamento, 'PENDENTE'));
  
  // 2. Calculando saldos financeiros (Empresa vs Pessoal)
  const [saldoEmpresa] = await db.select({ 
    total: sql<number>`SUM(CASE WHEN ${transacoes.tipo} = 'RECEITA' THEN ${transacoes.valor} ELSE -${transacoes.valor} END)` 
  }).from(transacoes).where(eq(transacoes.escopo, 'EMPRESA'));

  const [saldoPessoal] = await db.select({ 
    total: sql<number>`SUM(CASE WHEN ${transacoes.tipo} = 'RECEITA' THEN ${transacoes.valor} ELSE -${transacoes.valor} END)` 
  }).from(transacoes).where(eq(transacoes.escopo, 'PESSOAL'));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel Geral</h1>
        <p className="text-slate-500 mt-1">Visão global do seu negócio atualizada em tempo real.</p>
      </div>

      {/* Operações da Empresa */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Operações Ótica & UTI</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Clientes Ativos</p>
              <h3 className="text-2xl font-black text-slate-900">{totalClientes.value}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Na UTI (Conserto)</p>
              <h3 className="text-2xl font-black text-slate-900">{totalOS.value}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-3 bg-red-50 rounded-xl text-red-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Estoque Baixo</p>
              <h3 className="text-2xl font-black text-slate-900">{estoqueBaixo.value}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Compras Pendentes</p>
              <h3 className="text-2xl font-black text-slate-900">{comprasPendentes.value}</h3>
            </div>
          </div>

        </div>
      </div>

      {/* Visão Financeira */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Caixas Financeiros Separados</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          
          {/* Empresa */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500" /> Caixa da Empresa
              </span>
              <span className="text-xs font-black uppercase tracking-wider px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                Ótica & Oficina
              </span>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Saldo Consolidado</p>
              <h4 className="text-4xl font-black text-slate-900 mt-1">
                R$ {(saldoEmpresa?.total || 0).toFixed(2).replace('.', ',')}
              </h4>
            </div>
          </div>

          {/* Pessoal */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-purple-500" /> Finanças Pessoais
              </span>
              <span className="text-xs font-black uppercase tracking-wider px-2 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-100">
                Particular
              </span>
            </div>
            <div className="pt-2">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Saldo Disponível</p>
              <h4 className="text-4xl font-black text-slate-900 mt-1">
                R$ {(saldoPessoal?.total || 0).toFixed(2).replace('.', ',')}
              </h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}