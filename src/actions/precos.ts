"use server";

import { db } from '@/db';
import { tabelaPrecos } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function salvarPrecoServico(formData: FormData) {
  const tipoConserto = formData.get('tipoConserto') as string;
  
  if (!tipoConserto || tipoConserto.trim() === '') {
    throw new Error('O tipo de conserto é obrigatório.');
  }

  await db.insert(tabelaPrecos).values({
    tipoConserto,
    lojaPix: parseFloat(formData.get('lojaPix') as string) || 0,
    lojaCartao: parseFloat(formData.get('lojaCartao') as string) || 0,
    deliveryPix: parseFloat(formData.get('deliveryPix') as string) || 0,
    deliveryCartao: parseFloat(formData.get('deliveryCartao') as string) || 0,
    oticasPix: parseFloat(formData.get('oticasPix') as string) || 0,
    oticasCartao: parseFloat(formData.get('oticasCartao') as string) || 0,
  });

  revalidatePath('/tabela-precos');
  redirect('/tabela-precos');
}