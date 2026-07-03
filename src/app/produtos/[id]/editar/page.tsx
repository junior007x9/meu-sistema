import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { produtos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save, Package } from 'lucide-react';

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const produtoId = parseInt(params.id);
  
  // Busca os dados no banco
  const produtoData = await db.select().from(produtos).where(eq(produtos.id, produtoId)).get();

  if (!produtoData) redirect('/produtos');

  // Função para salvar
  async function atualizarProduto(formData: FormData) {
    "use server";
    const nome = formData.get('nome') as string;
    const quantidade = parseInt(formData.get('quantidade') as string) || 0;
    const preco = parseFloat(formData.get('preco') as string) || 0;

    await db.update(produtos)
      .set({ nome, quantidade, preco })
      .where(eq(produtos.id, produtoId));
      
    revalidatePath('/produtos');
    redirect('/produtos');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/produtos" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Editar Produto</h1>
          <p className="text-sm text-slate-500 font-medium">Atualize estoque e preço.</p>
        </div>
      </div>

      <form action={atualizarProduto} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <Package className="h-5 w-5 text-yellow-500" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Dados do Produto</h2>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Nome / Descrição *</label>
          <input 
            type="text" 
            name="nome" 
            defaultValue={produtoData.nome} 
            required 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Quantidade em Estoque</label>
            <input 
              type="number" 
              name="quantidade" 
              defaultValue={produtoData.quantidade} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Preço de Venda (R$)</label>
            <input 
              type="number" 
              step="0.01"
              name="preco" 
              defaultValue={produtoData.preco} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Link href="/produtos" className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all">
            <Save className="h-5 w-5" /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}