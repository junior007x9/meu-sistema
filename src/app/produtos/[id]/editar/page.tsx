import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { produtos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save, Package, Tag } from 'lucide-react';

// O "any" ajuda a Vercel a não reclamar da tipagem do params
export default async function EditarProdutoPage({ params }: any) {
  
  // CORREÇÃO 1: Aguardar os parâmetros da URL (Exigência das versões novas)
  const resolvedParams = await params;
  const produtoId = parseInt(resolvedParams.id);

  // CORREÇÃO 2: Usar o formato de array em vez do .get() que quebrava o servidor
  const resultado = await db.select().from(produtos).where(eq(produtos.id, produtoId));
  const produtoData = resultado[0];

  if (!produtoData) {
    redirect('/produtos');
  }

  async function atualizarProduto(formData: FormData) {
    "use server";
    const codigo = formData.get('codigo') as string;
    const nome = formData.get('nome') as string;
    const categoria = formData.get('categoria') as string;
    const fornecedor = formData.get('fornecedor') as string;

    const precoCusto = parseFloat(formData.get('precoCusto') as string) || 0;
    const estoque = parseInt(formData.get('estoque') as string, 10) || 0;
    const precoVenda = parseFloat(formData.get('precoVenda') as string) || 0;
    const porcentagemDesconto = parseFloat(formData.get('porcentagemDesconto') as string) || 0;

    await db.update(produtos)
      .set({
        codigo: codigo || null,
        nome,
        categoria,
        fornecedor: fornecedor || null,
        precoCusto,
        estoque,
        precoVenda,
        porcentagemDesconto
      })
      .where(eq(produtos.id, produtoId));

    revalidatePath('/produtos');
    redirect('/produtos');
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/produtos" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Editar Produto</h1>
          <p className="text-sm text-slate-500 font-medium">Modifique as informações cadastrais e níveis de estoque.</p>
        </div>
      </div>

      <form action={atualizarProduto} className="space-y-6">

        {/* BLOCO 1: IDENTIFICAÇÃO */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Package className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Identificação do Produto</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Código de Barras / Ref.</label>
              <input type="text" name="codigo" defaultValue={produtoData.codigo || ''} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-mono font-bold" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nome / Descrição do Produto *</label>
              <input type="text" name="nome" defaultValue={produtoData.nome} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold text-slate-800" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Categoria *</label>
              <input type="text" name="categoria" defaultValue={produtoData.categoria} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" placeholder="Ex: Armações, Lentes, Acessórios" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Fornecedor / Representante</label>
              <input type="text" name="fornecedor" defaultValue={produtoData.fornecedor || ''} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" />
            </div>
          </div>
        </div>

        {/* BLOCO 2: VALORES E ESTOQUE */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Tag className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Preços e Níveis de Estoque</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Preço de Custo (R$)</label>
              <input type="number" step="0.01" name="precoCusto" defaultValue={produtoData.precoCusto || 0} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Qtd. em Estoque *</label>
              <input type="number" name="estoque" defaultValue={produtoData.estoque} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-black text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Preço de Venda (R$) *</label>
              <input type="number" step="0.01" name="precoVenda" defaultValue={produtoData.precoVenda} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-black text-emerald-600" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">% Máx Desconto</label>
              <input type="number" step="0.01" name="porcentagemDesconto" defaultValue={produtoData.porcentagemDesconto || 0} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold text-amber-600" />
            </div>
          </div>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex justify-end gap-3 pb-10">
          <Link href="/produtos" className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-2.5 rounded-xl font-bold shadow-md transition-transform hover:scale-105">
            <Save className="h-5 w-5" /> Salvar Alterações
          </button>
        </div>

      </form>
    </div>
  );
}