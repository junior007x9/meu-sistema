"use server";

import { db } from '@/db';
import { comprasOnline } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criarCompra(formData: FormData) {
  const produto = formData.get('produto') as string;
  const valorUnitario = parseFloat(formData.get('valorUnitario') as string) || 0;
  const quantidade = parseInt(formData.get('quantidade') as string, 10) || 1;
  const valorTotal = valorUnitario * quantidade; // O servidor garante o cálculo exato

  if (!produto || produto.trim() === '') {
    throw new Error('O nome do produto é obrigatório.');
  }

  await db.insert(comprasOnline).values({
    dataCompra: formData.get('dataCompra') as string,
    produto,
    loja: formData.get('loja') as string,
    quemComprou: formData.get('quemComprou') as string,
    quemVaiPagar: formData.get('quemVaiPagar') as string,
    rastreio: formData.get('rastreio') as string,
    valorUnitario,
    quantidade,
    valorTotal,
    metodoPagamento: formData.get('metodoPagamento') as string,
    situacaoPagamento: formData.get('situacaoPagamento') as string,
  });

  revalidatePath('/compras');
  redirect('/compras');
}