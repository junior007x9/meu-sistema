import React from 'react';
import { db } from '@/db';
import { transacoes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Wallet, Plus } from 'lucide-react';
import { criarTransacao } from '@/actions/financeiro';

export default async function FinanceiroPage() {
  const listaTransacoes = await db.select().from(transacoes).orderBy(desc(transacoes.dataTransacao));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Financeiro</h1>
          <p className="text-slate-500 mt-1">Gestão de receitas e despesas.</p>
        </div>
      </div>

      {/* Formulário Rápido de Lançamento */}
      <form action={criarTransacao} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">Descrição</label>
          <input type="text" name="descricao" required placeholder="Ex: Conta de Luz" className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Valor (R$)</label>
          <input type="number" step="0.01" name="valor" required placeholder="0.00" className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="flex gap-2">
          <select name="tipo" className="w-full px-3 py-2 border rounded-lg">
            <option value="RECEITA">Receita</option>
            <option value="DESPESA">Despesa</option>
          </select>
          <select name="escopo" className="w-full px-3 py-2 border rounded-lg">
            <option value="EMPRESA">Empresa</option>
            <option value="PESSOAL">Pessoal</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center h-[42px] hover:bg-blue-700">
          <Plus className="h-5 w-5" /> Adicionar
        </button>
      </form>

      {/* Tabela de Lançamentos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaTransacoes.length === 0 ? (
           <div className="p-8 text-center text-slate-500">Nenhum lançamento encontrado.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-xs uppercase text-slate-500">
                <th className="p-4">Descrição</th>
                <th className="p-4">Escopo</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {listaTransacoes.map((t) => (
                <tr key={t.id}>
                  <td className="p-4 text-sm font-medium">{t.descricao}</td>
                  <td className="p-4 text-sm"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{t.escopo}</span></td>
                  <td className="p-4 text-sm text-slate-500">{t.dataTransacao ? new Date(t.dataTransacao).toLocaleDateString() : ''}</td>
                  <td className={`p-4 text-sm font-bold text-right ${t.tipo === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.tipo === 'RECEITA' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}