"use server";

import { db } from '@/db';
import { transacoes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criarTransacao(formData: FormData) {
  const descricao = formData.get('descricao') as string;
  const valor = parseFloat(formData.get('valor') as string);
  const tipo = formData.get('tipo') as 'RECEITA' | 'DESPESA';
  const escopo = formData.get('escopo') as 'PESSOAL' | 'EMPRESA';

  if (!descricao || isNaN(valor) || !tipo || !escopo) {
    throw new Error('Preencha todos os campos.');
  }

  await db.insert(transacoes).values({
    descricao,
    valor,
    tipo,
    escopo,
    status: 'PAGO',
  });

  revalidatePath('/financeiro');
  redirect('/financeiro');
}