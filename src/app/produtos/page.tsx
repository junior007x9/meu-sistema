import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { produtos } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Package, Plus, Search, Edit3, AlertTriangle, Tag, Box } from 'lucide-react';

export default async function ProdutosDashboardPage() {
  // Busca todos os produtos, ordenando pelos adicionados mais recentemente
  const listaProdutos = await db.select().from(produtos).orderBy(desc(produtos.id));

  // Cálculos rápidos para o topo do Dashboard
  const totalItens = listaProdutos.reduce((acc, p) => acc + p.estoque, 0);
  const valorTotalEstoque = listaProdutos.reduce((acc, p) => acc + (p.precoCusto || 0) * p.estoque, 0);
  const produtosZerados = listaProdutos.filter(p => p.estoque <= 0).length;

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      {/* HEADER E BOTÃO NOVO PRODUTO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><Package className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Estoque & Produtos</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de inventário, valores e fornecedores.</p>
          </div>
        </div>
        <Link href="/produtos/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
          <Plus className="h-5 w-5" /> Adicionar Produto
        </Link>
      </div>

      {/* MINI INDICADORES DE ESTOQUE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Box className="h-6 w-6" /></div>
          <div><p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Total de Itens Físicos</p><p className="text-2xl font-black text-slate-800">{totalItens} <span className="text-sm text-slate-400 font-medium">unid.</span></p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Tag className="h-6 w-6" /></div>
          <div><p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Capital no Estoque (Custo)</p><p className="text-2xl font-black text-emerald-700">R$ {valorTotalEstoque.toFixed(2)}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertTriangle className="h-6 w-6" /></div>
          <div><p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Produtos sem Estoque</p><p className="text-2xl font-black text-red-600">{produtosZerados} <span className="text-sm text-slate-400 font-medium">alertas</span></p></div>
        </div>
      </div>

      {/* BARRA DE PESQUISA */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="h-5 w-5 text-slate-400" /></div>
        <input type="text" placeholder="Procurar produto por nome, código ou fornecedor..." className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-slate-700 shadow-sm" />
      </div>

      {/* TABELA DE PRODUTOS */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5 w-24">CÓDIGO</th>
                <th className="p-5">PRODUTO E CATEGORIA</th>
                <th className="p-5">FORNECEDOR</th>
                <th className="p-5 text-center">ESTOQUE</th>
                <th className="p-5 text-right">PREÇO VENDA</th>
                <th className="p-5 text-center">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listaProdutos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500 font-medium">
                    Nenhum produto registado. Clique em "Adicionar Produto" para iniciar o seu inventário.
                  </td>
                </tr>
              ) : (
                listaProdutos.map((produto) => (
                  <tr key={produto.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 font-black text-slate-400 text-xs">{produto.codigo || 'S/C'}</td>
                    <td className="p-5">
                      <p className="font-bold text-slate-800 uppercase">{produto.nome}</p>
                      <p className="text-[10px] text-teal-600 font-black tracking-widest uppercase mt-1 bg-teal-50 inline-block px-2 py-0.5 rounded-full">{produto.categoria}</p>
                    </td>
                    <td className="p-5 text-sm font-medium text-slate-600 uppercase">{produto.fornecedor || '--'}</td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 w-fit mx-auto ${produto.estoque > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {produto.estoque > 0 ? <Box className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {produto.estoque} UNID.
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <p className="font-black text-slate-900">R$ {produto.precoVenda.toFixed(2)}</p>
                      {produto.porcentagemDesconto > 0 && (
                        <p className="text-[10px] text-orange-500 font-bold mt-0.5">Permite {produto.porcentagemDesconto}% desc.</p>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/produtos/${produto.id}/editar`} className="p-2 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-lg transition-colors" title="Editar Produto">
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </div>
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