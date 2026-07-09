"use server";

import { db } from '@/db';
import { 
  contasBancarias, categoriasFinanceiras, transacoes, 
  contaStyllo, contaUti 
} from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ==========================================
// 1. CONTAS BANCÁRIAS E CATEGORIAS
// ==========================================
export async function salvarContaBancaria(formData: FormData) {
  await db.insert(contasBancarias).values({
    nome: formData.get('nome') as string,
    escopo: formData.get('escopo') as string,
    saldoInicial: parseFloat(formData.get('saldoInicial') as string) || 0,
  });
  revalidatePath('/financeiro');
  redirect('/financeiro');
}

export async function salvarCategoria(formData: FormData) {
  await db.insert(categoriasFinanceiras).values({
    nome: formData.get('nome') as string,
    tipo: formData.get('tipo') as string,
    escopo: formData.get('escopo') as string,
  });
  revalidatePath('/financeiro');
  redirect('/financeiro');
}

// ==========================================
// 2. TRANSAÇÕES BANCÁRIAS (RECEITAS / DESPESAS)
// ==========================================
export async function salvarTransacao(formData: FormData) {
  await db.insert(transacoes).values({
    contaId: parseInt(formData.get('contaId') as string),
    categoriaId: parseInt(formData.get('categoriaId') as string),
    descricao: formData.get('descricao') as string,
    valor: parseFloat(formData.get('valor') as string) || 0,
    tipo: formData.get('tipo') as string,
    escopo: formData.get('escopo') as string,
    status: formData.get('status') as string,
    dataTransacao: new Date(formData.get('dataTransacao') as string),
  });
  
  revalidatePath('/financeiro');
  redirect('/financeiro');
}