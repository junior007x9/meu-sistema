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
  const servicoRealizado = formData.get('servicoRealizado') as string; // O que foi feito
  
  const valorPix = parseFloat(formData.get('valorPix') as string) || 0;
  const valorEspecie = parseFloat(formData.get('valorEspecie') as string) || 0;
  const valorCartao = parseFloat(formData.get('valorCartao') as string) || 0;
  
  // O sistema calcula o valor total automaticamente
  const valorTotal = valorPix + valorEspecie + valorCartao;

  if (!clienteId || !descricaoDefeito) {
    throw new Error('Cliente e defeito são obrigatórios.');
  }

  await db.insert(ordensServico).values({
    clienteId,
    modeloArmacao: modeloArmacao || null,
    descricaoDefeito,
    servicoRealizado: servicoRealizado || null,
    valorTotal,
    valorPix,
    valorEspecie,
    valorCartao,
    status: 'RECEBIDO', 
  });

  revalidatePath('/uti-oculos');
  // Redireciona de volta para o relatório principal da UTI
  redirect('/uti-oculos');
}