"use server";

import { db } from '@/db';
import { servicosJoaozinho } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function salvarServicoJoaozinho(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  
  const montagem = formData.get('montagem') as string;
  const montagemValor = parseFloat(formData.get('montagemValor') as string) || 0;
  
  const transposicao = formData.get('transposicao') as string;
  const transposicaoValor = parseFloat(formData.get('transposicaoValor') as string) || 0;
  
  const coloracao = formData.get('coloracao') as string;
  const coloracaoValor = parseFloat(formData.get('coloracaoValor') as string) || 0;

  const total = montagemValor + transposicaoValor + coloracaoValor;

  await db.insert(servicosJoaozinho).values({
    data, mesReferencia, anoBase,
    montagem, montagemValor,
    transposicao, transposicaoValor,
    coloracao, coloracaoValor,
    total
  });

  revalidatePath('/faturamento/joaozinho');
  redirect('/faturamento/joaozinho');
}