"use server";

import { db } from '@/db';
import { tabelaPrecos, simulacoesLentes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

// ==========================================
// AÇÕES: TABELA DE PREÇOS
// ==========================================
export async function salvarPreco(formData: FormData) {
  await db.insert(tabelaPrecos).values({
    tipoConserto: formData.get('tipoConserto') as string,
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

export async function atualizarPreco(id: number, formData: FormData) {
  await db.update(tabelaPrecos).set({
    tipoConserto: formData.get('tipoConserto') as string,
    lojaPix: parseFloat(formData.get('lojaPix') as string) || 0,
    lojaCartao: parseFloat(formData.get('lojaCartao') as string) || 0,
    deliveryPix: parseFloat(formData.get('deliveryPix') as string) || 0,
    deliveryCartao: parseFloat(formData.get('deliveryCartao') as string) || 0,
    oticasPix: parseFloat(formData.get('oticasPix') as string) || 0,
    oticasCartao: parseFloat(formData.get('oticasCartao') as string) || 0,
  }).where(eq(tabelaPrecos.id, id));

  revalidatePath('/tabela-precos');
  redirect('/tabela-precos');
}

// ==========================================
// AÇÕES: SIMULADOR DE LENTES
// ==========================================
export async function salvarSimulacao(formData: FormData) {
  const custoLente = parseFloat(formData.get('custoLente') as string) || 0;
  const valorTabela = parseFloat(formData.get('valorTabela') as string) || 0;
  const taxaCartao = parseFloat(formData.get('taxaCartao') as string) || 0;

  const valorParcela = valorTabela / 6;
  const descontoCartao = valorTabela * (taxaCartao / 100);
  const diferenca = valorTabela - descontoCartao;
  const ganho = diferenca - custoLente;

  await db.insert(simulacoesLentes).values({
    marcaLente: formData.get('marcaLente') as string,
    cliente: formData.get('cliente') as string || null,
    custoLente,
    valorTabela,
    taxaCartao,
    valorParcela,
    descontoCartao,
    diferenca,
    ganho,
  });

  revalidatePath('/simulacoes');
  redirect('/simulacoes');
}