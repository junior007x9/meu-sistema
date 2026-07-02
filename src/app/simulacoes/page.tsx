import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { simulacoesLentes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Calculator, FileText } from 'lucide-react';

export default async function SimulacoesPage() {
  const simulacoes = await db.select().from(simulacoesLentes).orderBy(desc(simulacoesLentes.criadoEm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Simulação de Lentes</h1>
          <p className="text-slate-500 mt-1">Histórico de simulações e cálculos de margem.</p>
        </div>
        <Link href="/simulacoes/nova" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5 w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Nova Simulação
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {simulacoes.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Calculator className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhuma simulação salva</h3>
            <p className="text-slate-500 max-w-sm mt-1">Clique no botão acima para abrir a calculadora inteligente.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                {/* Título unificado idêntico ao Excel */}
                <tr>
                  <th colSpan={8} className="bg-slate-100 text-slate-800 text-center py-3 font-black tracking-widest uppercase border-b border-slate-300 text-sm">
                    SIMULAÇÃO DE VALORES DE LENTES
                  </th>
                </tr>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 text-center">Marca da Lente</th>
                  <th className="p-3 border-r border-slate-200 text-center">Custo da Lente</th>
                  <th className="p-3 border-r border-slate-200 text-center bg-blue-50">Valor da Tabela</th>
                  <th className="p-3 border-r border-slate-200 text-center">Valor da Parcela em 6 X</th>
                  <th className="p-3 border-r border-slate-200 text-center text-red-700">Desconto Cartão em 6 X</th>
                  <th className="p-3 border-r border-slate-200 text-center">Diferença</th>
                  <th className="p-3 border-r border-slate-200 text-center bg-green-50 text-green-700 font-black">Ganho</th>
                  <th className="p-3 text-center">Cliente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {simulacoes.map((sim) => (
                  <tr key={sim.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-slate-200 text-sm font-bold text-slate-900 text-center uppercase">{sim.marcaLente}</td>
                    <td className="p-3 border-r border-slate-200 text-sm font-medium text-slate-600 text-center">R$ {sim.custoLente.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-200 text-sm font-black text-blue-700 text-center bg-blue-50/50">R$ {sim.valorTabela.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-200 text-sm font-bold text-slate-600 text-center">6x R$ {sim.valorParcela.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-200 text-sm font-bold text-red-600 text-center">R$ {sim.descontoCartao.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-200 text-sm font-medium text-slate-600 text-center">R$ {sim.diferenca.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-200 text-sm font-black text-green-600 text-center bg-green-50/50">R$ {sim.ganho.toFixed(2)}</td>
                    <td className="p-3 text-xs font-bold text-slate-500 text-center uppercase">{sim.cliente || '-'}</td>
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