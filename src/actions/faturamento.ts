"use server";

import { db } from '@/db';
import { servicosJoaozinho } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { contaStyllo } from '@/db/schema';
import { contaUti } from '@/db/schema';
import { controleCarne } from '@/db/schema';
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
export async function salvarContaStyllo(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  
  const pix = parseFloat(formData.get('pix') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const saida = parseFloat(formData.get('saida') as string) || 0;

  // A Matemática: Tudo que entra menos o que sai
  const total = (pix + credito + debito) - saida;

  await db.insert(contaStyllo).values({
    data, mesReferencia, anoBase,
    pix, credito, debito, saida, total
  });

  revalidatePath('/faturamento/conta-styllo');
  redirect('/faturamento/conta-styllo');
}
export async function salvarContaUti(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  
  const pix = parseFloat(formData.get('pix') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const saida = parseFloat(formData.get('saida') as string) || 0;

  const total = (pix + credito + debito) - saida;

  await db.insert(contaUti).values({
    data, mesReferencia, anoBase,
    pix, credito, debito, saida, total
  });

  revalidatePath('/faturamento/conta-uti');
  redirect('/faturamento/conta-uti');
}
export async function salvarCarne(formData: FormData) {
  const parcelas: any = {};
  
  // Loop inteligente para capturar as 10 parcelas do formulário
  for (let i = 1; i <= 10; i++) {
    parcelas[`p${i}Valor`] = parseFloat(formData.get(`p${i}Valor`) as string) || 0;
    parcelas[`p${i}Data`] = formData.get(`p${i}Data`) as string || null;
  }

  await db.insert(controleCarne).values({
    anoBase: formData.get('anoBase') as string,
    cliente: formData.get('cliente') as string,
    contato: formData.get('contato') as string,
    dataCompra: formData.get('dataCompra') as string,
    valorVenda: parseFloat(formData.get('valorVenda') as string) || 0,
    valorEntrada: parseFloat(formData.get('valorEntrada') as string) || 0,
    ...parcelas // Injeta as 10 parcelas automaticamente
  });

  revalidatePath('/faturamento/carne');
  redirect('/faturamento/carne');
}