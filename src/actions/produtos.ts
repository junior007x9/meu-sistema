"use server";

import { db } from '@/db';
import { produtos } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export async function salvarProduto(formData: FormData) {
  const precoCusto = parseFloat(formData.get('precoCusto') as string) || 0;
  const estoque = parseInt(formData.get('estoque') as string) || 0;
  const precoVenda = parseFloat(formData.get('precoVenda') as string) || 0;
  const porcentagemDesconto = parseFloat(formData.get('porcentagemDesconto') as string) || 0;

  await db.insert(produtos).values({
    codigo: formData.get('codigo') as string,
    nome: formData.get('nome') as string,
    categoria: formData.get('categoria') as string,
    fornecedor: formData.get('fornecedor') as string,
    precoCusto,
    estoque,
    precoVenda,
    porcentagemDesconto,
  });

  revalidatePath('/produtos');
  redirect('/produtos');
}

// Já deixo a função de Atualizar pronta para usarmos amanhã!
export async function atualizarProduto(id: number, formData: FormData) {
  const precoCusto = parseFloat(formData.get('precoCusto') as string) || 0;
  const estoque = parseInt(formData.get('estoque') as string) || 0;
  const precoVenda = parseFloat(formData.get('precoVenda') as string) || 0;
  const porcentagemDesconto = parseFloat(formData.get('porcentagemDesconto') as string) || 0;

  await db.update(produtos).set({
    codigo: formData.get('codigo') as string,
    nome: formData.get('nome') as string,
    categoria: formData.get('categoria') as string,
    fornecedor: formData.get('fornecedor') as string,
    precoCusto,
    estoque,
    precoVenda,
    porcentagemDesconto,
  }).where(eq(produtos.id, id));

  revalidatePath('/produtos');
  redirect('/produtos');
}