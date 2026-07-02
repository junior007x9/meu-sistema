"use server";

import { db } from '@/db';
import { produtos } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criarProduto(formData: FormData) {
  const nome = formData.get('nome') as string;
  const codigo = formData.get('codigo') as string;
  const categoria = formData.get('categoria') as string;
  const fornecedor = formData.get('fornecedor') as string;

  const precoVenda = parseFloat(formData.get('precoVenda') as string);
  const precoCusto = parseFloat(formData.get('precoCusto') as string) || 0;
  const estoque = parseInt(formData.get('estoque') as string, 10) || 0;
  const porcentagemDesconto = parseFloat(formData.get('porcentagemDesconto') as string) || 0;

  if (!nome || !categoria || isNaN(precoVenda)) {
    throw new Error('Preencha os campos obrigatórios.');
  }

  await db.insert(produtos).values({
    nome,
    codigo: codigo || null,
    categoria,
    fornecedor: fornecedor || null,
    precoVenda,
    precoCusto,
    estoque,
    porcentagemDesconto,
  });

  revalidatePath('/produtos');
  redirect('/produtos');
}