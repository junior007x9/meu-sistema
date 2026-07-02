import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { produtos } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Search, PackageSearch, MoreVertical, AlertCircle, Tag, UploadCloud, Truck } from 'lucide-react';

export default async function ProdutosPage() {
  const listaProdutos = await db.select().from(produtos).orderBy(desc(produtos.criadoEm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Estoque e Fornecedores</h1>
          <p className="text-slate-500 mt-1">Gestão inteligente de compras e precificação.</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/produtos/importar" className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-medium transition-colors justify-center flex-1 sm:flex-none shadow-sm">
            <UploadCloud className="h-5 w-5 text-blue-600" />
            Importar CSV
          </Link>
          <Link href="/produtos/novo" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors justify-center flex-1 sm:flex-none shadow-sm">
            <Plus className="h-5 w-5" />
            Nova Entrada
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input type="text" placeholder="Buscar por código, produto ou fornecedor..." className="bg-transparent border-none outline-none w-full text-slate-700" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaProdutos.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <PackageSearch className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">Estoque vazio</h3>
            <p className="text-slate-500 max-w-sm mt-1">Cadastre mercadorias para visualizar a tabela de representantes.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-black">
                  <th className="p-4">Cód.</th>
                  <th className="p-4">Descrição do Produto</th>
                  <th className="p-4">Fornecedor</th>
                  <th className="p-4 text-center">Quant.</th>
                  <th className="p-4 text-right">Valor Venda</th>
                  <th className="p-4 text-center">%</th>
                  <th className="p-4 text-right">R$ Com Desc.</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaProdutos.map((produto) => {
                  // O sistema calcula o preço com desconto para exibir na tabela também!
                  const valorComDesconto = produto.precoVenda - (produto.precoVenda * ((produto.porcentagemDesconto || 0) / 100));

                  return (
                    <tr key={produto.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-bold text-slate-500">
                        {produto.codigo ? produto.codigo : '-'}
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 max-w-[200px] truncate" title={produto.nome}>
                        {produto.nome}
                      </td>
                      <td className="p-4 text-xs font-medium text-amber-700">
                        {produto.fornecedor ? (
                          <span className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded w-max">
                            <Truck className="h-3 w-3" /> {produto.fornecedor}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="p-4 text-sm font-black text-center text-slate-700">
                        {produto.estoque}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-500 text-right">
                        R$ {produto.precoVenda.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="p-4 text-xs font-bold text-emerald-600 text-center">
                        {produto.porcentagemDesconto}%
                      </td>
                      <td className="p-4 text-sm font-black text-emerald-600 text-right">
                        R$ {valorComDesconto.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 p-1 transition-colors"><MoreVertical className="h-5 w-5" /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}