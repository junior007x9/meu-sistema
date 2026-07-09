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
import { comprasOnline, contasMensais } from '@/db/schema';

// ==========================================
// AÇÕES: COMPRAS ONLINE / ENCOMENDAS
// ==========================================
export async function salvarCompra(formData: FormData) {
  const valorUnitario = parseFloat(formData.get('valorUnitario') as string) || 0;
  const quantidade = parseInt(formData.get('quantidade') as string) || 1;
  const valorTotal = valorUnitario * quantidade;

  await db.insert(comprasOnline).values({
    dataCompra: formData.get('dataCompra') as string,
    produto: formData.get('produto') as string,
    loja: formData.get('loja') as string,
    quemComprou: formData.get('quemComprou') as string,
    quemVaiPagar: formData.get('quemVaiPagar') as string,
    rastreio: formData.get('rastreio') as string,
    valorUnitario,
    quantidade,
    valorTotal,
    metodoPagamento: formData.get('metodoPagamento') as string,
    situacaoPagamento: formData.get('situacaoPagamento') as string,
  });

  revalidatePath('/compras');
  redirect('/compras');
}

// ==========================================
// AÇÕES: CONTAS E REPASSES MENSAIS
// ==========================================
export async function salvarContaMensal(formData: FormData) {
  await db.insert(contasMensais).values({
    mesReferencia: formData.get('mesReferencia') as string,
    
    totalKwh: parseFloat(formData.get('totalKwh') as string) || 0,
    totalRs: parseFloat(formData.get('totalRs') as string) || 0,
    mediaBarbosaKwh: parseFloat(formData.get('mediaBarbosaKwh') as string) || 0,
    icms: parseFloat(formData.get('icms') as string) || 0,
    pis: parseFloat(formData.get('pis') as string) || 0,
    cofins: parseFloat(formData.get('cofins') as string) || 0,
    descontoAlinePerc: parseFloat(formData.get('descontoAlinePerc') as string) || 20,
    
    aguaAline: parseFloat(formData.get('aguaAline') as string) || 0,
    aguaBarbosa: parseFloat(formData.get('aguaBarbosa') as string) || 0,
    
    equatorialBarbosa: parseFloat(formData.get('equatorialBarbosa') as string) || 0,
    equatorialAline: parseFloat(formData.get('equatorialAline') as string) || 0,
    totalAlineGeral: parseFloat(formData.get('totalAlineGeral') as string) || 0,
  });

  revalidatePath('/contas-mensais');
  redirect('/contas-mensais');
}
// ==========================================
// AÇÕES DE ATUALIZAÇÃO (EDIÇÃO)
// ==========================================
export async function atualizarSimulacao(id: number, formData: FormData) {
  const custoLente = parseFloat(formData.get('custoLente') as string) || 0;
  const valorTabela = parseFloat(formData.get('valorTabela') as string) || 0;
  const taxaCartao = parseFloat(formData.get('taxaCartao') as string) || 0;

  const valorParcela = valorTabela / 6;
  const descontoCartao = valorTabela * (taxaCartao / 100);
  const diferenca = valorTabela - descontoCartao;
  const ganho = diferenca - custoLente;

  await db.update(simulacoesLentes).set({
    marcaLente: formData.get('marcaLente') as string,
    cliente: formData.get('cliente') as string || null,
    custoLente, valorTabela, taxaCartao, valorParcela, descontoCartao, diferenca, ganho,
  }).where(eq(simulacoesLentes.id, id));

  revalidatePath('/simulacoes');
  redirect('/simulacoes');
}

export async function atualizarCompra(id: number, formData: FormData) {
  const valorUnitario = parseFloat(formData.get('valorUnitario') as string) || 0;
  const quantidade = parseInt(formData.get('quantidade') as string) || 1;
  
  await db.update(comprasOnline).set({
    dataCompra: formData.get('dataCompra') as string,
    produto: formData.get('produto') as string,
    loja: formData.get('loja') as string,
    quemComprou: formData.get('quemComprou') as string,
    quemVaiPagar: formData.get('quemVaiPagar') as string,
    rastreio: formData.get('rastreio') as string,
    valorUnitario,
    quantidade,
    valorTotal: valorUnitario * quantidade,
    metodoPagamento: formData.get('metodoPagamento') as string,
    situacaoPagamento: formData.get('situacaoPagamento') as string,
  }).where(eq(comprasOnline.id, id));

  revalidatePath('/compras');
  redirect('/compras');
}

export async function atualizarContaMensal(id: number, formData: FormData) {
  await db.update(contasMensais).set({
    mesReferencia: formData.get('mesReferencia') as string,
    totalKwh: parseFloat(formData.get('totalKwh') as string) || 0,
    totalRs: parseFloat(formData.get('totalRs') as string) || 0,
    mediaBarbosaKwh: parseFloat(formData.get('mediaBarbosaKwh') as string) || 0,
    descontoAlinePerc: parseFloat(formData.get('descontoAlinePerc') as string) || 20,
    aguaAline: parseFloat(formData.get('aguaAline') as string) || 0,
    aguaBarbosa: parseFloat(formData.get('aguaBarbosa') as string) || 0,
    equatorialBarbosa: parseFloat(formData.get('equatorialBarbosa') as string) || 0,
    equatorialAline: parseFloat(formData.get('equatorialAline') as string) || 0,
    totalAlineGeral: parseFloat(formData.get('totalAlineGeral') as string) || 0,
  }).where(eq(contasMensais.id, id));

  revalidatePath('/contas-mensais');
  redirect('/contas-mensais');
}