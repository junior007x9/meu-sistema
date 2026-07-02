"use server";

import { db } from '@/db';
import { simulacoesLentes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function salvarSimulacao(formData: FormData) {
  const marcaLente = formData.get('marcaLente') as string;
  const cliente = formData.get('cliente') as string;
  
  const custoLente = parseFloat(formData.get('custoLente') as string) || 0;
  const valorTabela = parseFloat(formData.get('valorTabela') as string) || 0;
  const taxaCartao = parseFloat(formData.get('taxaCartao') as string) || 0;

  // O Servidor faz a matemática exata para evitar erros de manipulação
  const valorParcela = valorTabela / 6;
  const descontoCartao = valorTabela * (taxaCartao / 100);
  const diferenca = valorTabela - descontoCartao;
  const ganho = diferenca - custoLente;

  if (!marcaLente || valorTabela <= 0) {
    throw new Error('A marca da lente e o valor da tabela são obrigatórios.');
  }

  await db.insert(simulacoesLentes).values({
    marcaLente,
    cliente: cliente || null,
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