"use server";

import { db } from '@/db';
import { ordensServico } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export async function salvarOS(formData: FormData) {
  const clienteId = parseInt(formData.get('clienteId') as string);
  
  const valorPix = parseFloat(formData.get('valorPix') as string) || 0;
  const valorEspecie = parseFloat(formData.get('valorEspecie') as string) || 0;
  const valorCartao = parseFloat(formData.get('valorCartao') as string) || 0;
  const valorTotal = valorPix + valorEspecie + valorCartao;

  const dataEntradaRaw = formData.get('dataEntrada') as string;
  const dataEntregaRaw = formData.get('dataEntregaPrevista') as string;

  await db.insert(ordensServico).values({
    clienteId,
    modeloArmacao: formData.get('modeloArmacao') as string,
    descricaoDefeito: formData.get('descricaoDefeito') as string,
    servicoRealizado: formData.get('servicoRealizado') as string,
    tecnico: formData.get('tecnico') as string,
    status: formData.get('status') as string || 'RECEBIDO',
    valorPix,
    valorEspecie,
    valorCartao,
    valorTotal,
    dataEntrada: dataEntradaRaw ? new Date(dataEntradaRaw) : new Date(),
    dataEntregaPrevista: dataEntregaRaw ? new Date(dataEntregaRaw) : undefined,
  });

  revalidatePath('/os');
  redirect('/os');
}

export async function atualizarStatusOS(id: number, novoStatus: string) {
  await db.update(ordensServico)
    .set({ status: novoStatus })
    .where(eq(ordensServico.id, id));
    
  revalidatePath('/os');
}
export async function atualizarOS(id: number, formData: FormData) {
  const clienteId = parseInt(formData.get('clienteId') as string);
  
  const valorPix = parseFloat(formData.get('valorPix') as string) || 0;
  const valorEspecie = parseFloat(formData.get('valorEspecie') as string) || 0;
  const valorCartao = parseFloat(formData.get('valorCartao') as string) || 0;
  const valorTotal = valorPix + valorEspecie + valorCartao;

  const dataEntradaRaw = formData.get('dataEntrada') as string;
  const dataEntregaRaw = formData.get('dataEntregaPrevista') as string;

  await db.update(ordensServico).set({
    clienteId,
    modeloArmacao: formData.get('modeloArmacao') as string,
    descricaoDefeito: formData.get('descricaoDefeito') as string,
    servicoRealizado: formData.get('servicoRealizado') as string,
    tecnico: formData.get('tecnico') as string,
    status: formData.get('status') as string,
    valorPix,
    valorEspecie,
    valorCartao,
    valorTotal,
    dataEntrada: dataEntradaRaw ? new Date(dataEntradaRaw) : new Date(),
    dataEntregaPrevista: dataEntregaRaw ? new Date(dataEntregaRaw) : null,
  }).where(eq(ordensServico.id, id));

  revalidatePath('/os');
  redirect('/os');
}