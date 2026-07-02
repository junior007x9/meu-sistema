"use server";

import { db } from '@/db';
import { ordensServico } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criarOrdemServico(formData: FormData) {
  const clienteIdStr = formData.get('clienteId') as string;
  const clienteId = clienteIdStr ? parseInt(clienteIdStr, 10) : 0;
  
  const modeloArmacao = formData.get('modeloArmacao') as string;
  const descricaoDefeito = formData.get('descricaoDefeito') as string;
  
  const valorTotalStr = formData.get('valorTotal') as string;
  const valorTotal = valorTotalStr ? parseFloat(valorTotalStr) : 0;

  if (!clienteId || !descricaoDefeito) {
    throw new Error('Cliente e defeito são obrigatórios.');
  }

  await db.insert(ordensServico).values({
    clienteId,
    modeloArmacao: modeloArmacao || null,
    descricaoDefeito,
    valorTotal,
    status: 'RECEBIDO', // Toda OS nova entra como RECEBIDO
  });

  revalidatePath('/uti-oculos');
  redirect('/uti-oculos');
}