import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { produtos } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Glasses, Package, Tag, UserCheck } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function ProdutosPage() {
  const listaProdutos = await db.select().from(produtos).orderBy(desc(produtos.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Estoque & Produtos</h1>
          <p className="text-slate-500 mt-1">Gestão completa de armações, lentes e acessórios.</p>
        </div>
        <Link href="/produtos/novo" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaProdutos.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Glasses className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Estoque Vazio</h3>
            <p className="text-slate-500 mt-1">Nenhum produto cadastrado no momento.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-black border-b border-slate-200">
                  <th className="p-4 text-center w-24">Código</th>
                  <th className="p-4">Produto / Descrição</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Fornecedor / Rep.</th>
                  <th className="p-4 text-right">P. Custo</th>
                  <th className="p-4 text-center">Estoque</th>
                  <th className="p-4 text-right">P. Venda</th>
                  <th className="p-4 text-center">% Desc.</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaProdutos.map((produto) => (
                  <tr key={produto.id} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="p-4 text-center font-mono font-bold text-slate-500 bg-slate-50/50">
                      {produto.codigo || `-`}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        {produto.nome}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-bold uppercase">
                        <Tag className="h-3 w-3 text-slate-400" /> {produto.categoria}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {produto.fornecedor ? (
                        <span className="flex items-center gap-1"><UserCheck className="h-3.5 w-3.5 text-slate-400" /> {produto.fornecedor}</span>
                      ) : '-'}
                    </td>
                    <td className="p-4 font-medium text-slate-600 text-right">
                      R$ {produto.precoCusto ? produto.precoCusto.toFixed(2).replace('.', ',') : '0,00'}
                    </td>
                    <td className="p-4 font-black text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${produto.estoque > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {produto.estoque} un
                      </span>
                    </td>
                    <td className="p-4 font-black text-emerald-600 text-right">
                      R$ {produto.precoVenda ? produto.precoVenda.toFixed(2).replace('.', ',') : '0,00'}
                    </td>
                    <td className="p-4 text-center font-bold text-amber-600">
                      {produto.porcentagemDesconto ? `${produto.porcentagemDesconto}%` : '-'}
                    </td>
                    <td className="p-4 bg-slate-50 border-l border-slate-100 text-center">
                      <BotoesAcao 
                        id={produto.id} 
                        tabela="produto" 
                        caminho="/produtos" 
                        linkEditar={`/produtos/${produto.id}/editar`} 
                      />
                    </td>
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