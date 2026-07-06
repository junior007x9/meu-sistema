"use server";

import { db } from '@/db';
import { 
  servicosJoaozinho, 
  contaStyllo, 
  contaUti, 
  controleCarne, 
  clientesDevedoresUti, 
  servicosIndicados, 
  controleFuncionarios, 
  faturamentoDiario, 
  balancoAnual, 
  balancoDiario, 
  balancoDiarioUti 
} from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ==========================================
// 1. SERVIÇOS JOÃOZINHO
// ==========================================
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

// ==========================================
// 2. CONTA STYLLO ÓTICA
// ==========================================
export async function salvarContaStyllo(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  
  const pix = parseFloat(formData.get('pix') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const saida = parseFloat(formData.get('saida') as string) || 0;

  const total = (pix + credito + debito) - saida;

  await db.insert(contaStyllo).values({
    data, mesReferencia, anoBase, pix, credito, debito, saida, total
  });

  revalidatePath('/faturamento/conta-styllo');
  redirect('/faturamento/conta-styllo');
}

// ==========================================
// 3. CONTA UTI
// ==========================================
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
    data, mesReferencia, anoBase, pix, credito, debito, saida, total
  });

  revalidatePath('/faturamento/conta-uti');
  redirect('/faturamento/conta-uti');
}

// ==========================================
// 4. CARNÊS
// ==========================================
export async function salvarCarne(formData: FormData) {
  const cliente = formData.get('cliente') as string;
  const contato = formData.get('contato') as string;
  const dataCompra = formData.get('dataCompra') as string;
  const anoBase = formData.get('anoBase') as string;
  const valorVenda = parseFloat(formData.get('valorVenda') as string) || 0;
  const valorEntrada = parseFloat(formData.get('valorEntrada') as string) || 0;

  const p1Valor = parseFloat(formData.get('p1Valor') as string) || 0;
  const p1Data = formData.get('p1Data') as string;
  const p2Valor = parseFloat(formData.get('p2Valor') as string) || 0;
  const p2Data = formData.get('p2Data') as string;
  const p3Valor = parseFloat(formData.get('p3Valor') as string) || 0;
  const p3Data = formData.get('p3Data') as string;
  const p4Valor = parseFloat(formData.get('p4Valor') as string) || 0;
  const p4Data = formData.get('p4Data') as string;
  const p5Valor = parseFloat(formData.get('p5Valor') as string) || 0;
  const p5Data = formData.get('p5Data') as string;
  const p6Valor = parseFloat(formData.get('p6Valor') as string) || 0;
  const p6Data = formData.get('p6Data') as string;
  const p7Valor = parseFloat(formData.get('p7Valor') as string) || 0;
  const p7Data = formData.get('p7Data') as string;
  const p8Valor = parseFloat(formData.get('p8Valor') as string) || 0;
  const p8Data = formData.get('p8Data') as string;
  const p9Valor = parseFloat(formData.get('p9Valor') as string) || 0;
  const p9Data = formData.get('p9Data') as string;
  const p10Valor = parseFloat(formData.get('p10Valor') as string) || 0;
  const p10Data = formData.get('p10Data') as string;

  await db.insert(controleCarne).values({
    cliente, contato, dataCompra, anoBase, valorVenda, valorEntrada,
    p1Valor, p1Data, p2Valor, p2Data, p3Valor, p3Data, p4Valor, p4Data, p5Valor, p5Data,
    p6Valor, p6Data, p7Valor, p7Data, p8Valor, p8Data, p9Valor, p9Data, p10Valor, p10Data
  });

  revalidatePath('/faturamento/carne');
  redirect('/faturamento/carne');
}

// ==========================================
// 5. DEVEDORES UTI
// ==========================================
export async function salvarDevedorUti(formData: FormData) {
  const cliente = formData.get('cliente') as string;
  const contato = formData.get('contato') as string;
  const servicos = formData.get('servicos') as string;
  const valor = parseFloat(formData.get('valor') as string) || 0;
  const data = formData.get('data') as string;
  const pago = formData.get('pago') as string;

  await db.insert(clientesDevedoresUti).values({
    cliente, contato, servicos, valor, data, pago
  });

  revalidatePath('/faturamento/devedores-uti');
  redirect('/faturamento/devedores-uti');
}

// ==========================================
// 6. SERVIÇOS INDICADOS
// ==========================================
export async function salvarServicoIndicado(formData: FormData) {
  const quemIndicou = formData.get('quemIndicou') as string;
  const contatos = formData.get('contatos') as string;
  const servicoPago = formData.get('servicoPago') as string;
  const servico = formData.get('servico') as string;
  const valor = parseFloat(formData.get('valor') as string) || 0;
  const data = formData.get('data') as string;
  const valorDevido = parseFloat(formData.get('valorDevido') as string) || 0;

  await db.insert(servicosIndicados).values({
    quemIndicou, contatos, servicoPago, servico, valor, data, valorDevido
  });

  revalidatePath('/faturamento/servicos-indicados');
  redirect('/faturamento/servicos-indicados');
}

// ==========================================
// 7. CONTROLE DE FUNCIONÁRIOS
// ==========================================
export async function salvarFuncionario(formData: FormData) {
  const nome = formData.get('nome') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const dataInicio = formData.get('dataInicio') as string;

  const dias = [];
  let totalVt = 0, totalVa = 0, totalSalario = 0, totalFerias = 0, total13 = 0;

  for (let i = 1; i <= 31; i++) {
    const status = formData.get(`d${i}_status`) as string || 'P';
    const vt = parseFloat(formData.get(`d${i}_vt`) as string) || 0;
    const va = parseFloat(formData.get(`d${i}_va`) as string) || 0;
    const sal = parseFloat(formData.get(`d${i}_sal`) as string) || 0;
    const fer = parseFloat(formData.get(`d${i}_fer`) as string) || 0;
    const d13 = parseFloat(formData.get(`d${i}_d13`) as string) || 0;

    dias.push({ dia: i, status, vt, va, sal, fer, d13 });

    if (status !== 'F') {
      totalVt += vt; totalVa += va; totalSalario += sal; totalFerias += fer; total13 += d13;
    }
  }

  const diasJson = JSON.stringify(dias);
  const totalGeral = totalVt + totalVa + totalSalario + totalFerias + total13;

  await db.insert(controleFuncionarios).values({
    nome, mesReferencia, dataInicio, diasJson, totalVt, totalVa, totalSalario, totalFerias, total13, totalGeral
  });

  revalidatePath('/faturamento/funcionarios');
  redirect('/faturamento/funcionarios');
}

// ==========================================
// 8. FATURAMENTO DIÁRIO
// ==========================================
export async function salvarDiario(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const descricao = formData.get('descricao') as string;

  const compra = parseFloat(formData.get('compra') as string) || 0;
  const especie = parseFloat(formData.get('especie') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const pix = parseFloat(formData.get('pix') as string) || 0;
  
  const saidaDinheiro = parseFloat(formData.get('saidaDinheiro') as string) || 0;
  const saidaPix = parseFloat(formData.get('saidaPix') as string) || 0;
  const dizimo = parseFloat(formData.get('dizimo') as string) || 0;
  const fatEspecie = parseFloat(formData.get('fatEspecie') as string) || 0;

  const total = especie + credito + debito + pix;

  await db.insert(faturamentoDiario).values({
    data, mesReferencia, descricao, compra, especie, credito, debito, pix, total, saidaDinheiro, saidaPix, dizimo, fatEspecie
  });

  revalidatePath('/faturamento/diario');
  redirect('/faturamento/diario');
}

// ==========================================
// 9. BALANÇO ANUAL
// ==========================================
export async function salvarBalanco(formData: FormData) {
  const ano = formData.get('ano') as string;
  const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  
  const mesesData = [];
  let totalCompras = 0, totalEntrada = 0, totalSaida = 0;

  for (const mes of MESES) {
    const compras = parseFloat(formData.get(`compras_${mes}`) as string) || 0;
    const entrada = parseFloat(formData.get(`entrada_${mes}`) as string) || 0;
    const saida = parseFloat(formData.get(`saida_${mes}`) as string) || 0;

    mesesData.push({ mes, compras, entrada, saida });
    totalCompras += compras;
    totalEntrada += entrada;
    totalSaida += saida;
  }

  const mesesJson = JSON.stringify(mesesData);

  await db.insert(balancoAnual).values({
    ano, mesesJson, totalCompras, totalEntrada, totalSaida
  });

  revalidatePath('/faturamento/balanco');
  redirect('/faturamento/balanco');
}

// ==========================================
// 10. BALANÇO DIÁRIO
// ==========================================
export async function salvarBalancoDiario(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  
  const compras = parseFloat(formData.get('compras') as string) || 0;
  const entradaDinheiro = parseFloat(formData.get('entradaDinheiro') as string) || 0;
  const entradaCredito = parseFloat(formData.get('entradaCredito') as string) || 0;
  const entradaDebito = parseFloat(formData.get('entradaDebito') as string) || 0;
  const entradaPix = parseFloat(formData.get('entradaPix') as string) || 0;
  const saidaPagamentos = parseFloat(formData.get('saidaPagamentos') as string) || 0;

  await db.insert(balancoDiario).values({
    data, mesReferencia, anoBase,
    compras, entradaDinheiro, entradaCredito, entradaDebito, entradaPix, saidaPagamentos
  });

  revalidatePath('/faturamento/balanco-diario');
  redirect('/faturamento/balanco-diario');
}

// ==========================================
// 11. BALANÇO DIÁRIO (UTI)
// ==========================================
export async function salvarBalancoUti(formData: FormData) {
  const data = formData.get('data') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  
  const compras = parseFloat(formData.get('compras') as string) || 0;
  const entradaDinheiro = parseFloat(formData.get('entradaDinheiro') as string) || 0;
  const entradaCredito = parseFloat(formData.get('entradaCredito') as string) || 0;
  const entradaDebito = parseFloat(formData.get('entradaDebito') as string) || 0;
  const entradaPix = parseFloat(formData.get('entradaPix') as string) || 0;
  const saidaPagamentos = parseFloat(formData.get('saidaPagamentos') as string) || 0;

  await db.insert(balancoDiarioUti).values({
    data, mesReferencia, anoBase,
    compras, entradaDinheiro, entradaCredito, entradaDebito, entradaPix, saidaPagamentos
  });

  revalidatePath('/faturamento/balanco-uti');
  redirect('/faturamento/balanco-uti');
}
import { eq } from 'drizzle-orm'; // Adicione isto lá no topo do ficheiro junto aos outros imports!

// ==========================================
// FUNÇÕES DE ATUALIZAÇÃO (EDITAR)
// ==========================================

export async function atualizarServicoJoaozinho(id: number, formData: FormData) {
  const montagemValor = parseFloat(formData.get('montagemValor') as string) || 0;
  const transposicaoValor = parseFloat(formData.get('transposicaoValor') as string) || 0;
  const coloracaoValor = parseFloat(formData.get('coloracaoValor') as string) || 0;
  const total = montagemValor + transposicaoValor + coloracaoValor;

  await db.update(servicosJoaozinho).set({
    data: formData.get('data') as string,
    mesReferencia: formData.get('mesReferencia') as string,
    anoBase: formData.get('anoBase') as string,
    montagem: formData.get('montagem') as string,
    montagemValor,
    transposicao: formData.get('transposicao') as string,
    transposicaoValor,
    coloracao: formData.get('coloracao') as string,
    coloracaoValor,
    total
  }).where(eq(servicosJoaozinho.id, id));

  revalidatePath('/faturamento/joaozinho');
  redirect('/faturamento/joaozinho');
}

export async function atualizarContaStyllo(id: number, formData: FormData) {
  const pix = parseFloat(formData.get('pix') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const saida = parseFloat(formData.get('saida') as string) || 0;
  const total = (pix + credito + debito) - saida;

  await db.update(contaStyllo).set({
    data: formData.get('data') as string,
    mesReferencia: formData.get('mesReferencia') as string,
    anoBase: formData.get('anoBase') as string,
    pix, credito, debito, saida, total
  }).where(eq(contaStyllo.id, id));

  revalidatePath('/faturamento/conta-styllo');
  redirect('/faturamento/conta-styllo');
}

export async function atualizarContaUti(id: number, formData: FormData) {
  const pix = parseFloat(formData.get('pix') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const saida = parseFloat(formData.get('saida') as string) || 0;
  const total = (pix + credito + debito) - saida;

  await db.update(contaUti).set({
    data: formData.get('data') as string,
    mesReferencia: formData.get('mesReferencia') as string,
    anoBase: formData.get('anoBase') as string,
    pix, credito, debito, saida, total
  }).where(eq(contaUti.id, id));

  revalidatePath('/faturamento/conta-uti');
  redirect('/faturamento/conta-uti');
}

export async function atualizarCarne(id: number, formData: FormData) {
  const parcelas: any = {};
  for (let i = 1; i <= 10; i++) {
    parcelas[`p${i}Valor`] = parseFloat(formData.get(`p${i}Valor`) as string) || 0;
    parcelas[`p${i}Data`] = formData.get(`p${i}Data`) as string || null;
  }

  await db.update(controleCarne).set({
    anoBase: formData.get('anoBase') as string,
    cliente: formData.get('cliente') as string,
    contato: formData.get('contato') as string,
    dataCompra: formData.get('dataCompra') as string,
    valorVenda: parseFloat(formData.get('valorVenda') as string) || 0,
    valorEntrada: parseFloat(formData.get('valorEntrada') as string) || 0,
    ...parcelas
  }).where(eq(controleCarne.id, id));

  revalidatePath('/faturamento/carne');
  redirect('/faturamento/carne');
}

export async function atualizarDevedorUti(id: number, formData: FormData) {
  await db.update(clientesDevedoresUti).set({
    cliente: formData.get('cliente') as string,
    contato: formData.get('contato') as string,
    servicos: formData.get('servicos') as string,
    valor: parseFloat(formData.get('valor') as string) || 0,
    data: formData.get('data') as string,
    pago: formData.get('pago') as string
  }).where(eq(clientesDevedoresUti.id, id));

  revalidatePath('/faturamento/devedores-uti');
  redirect('/faturamento/devedores-uti');
}

export async function atualizarServicoIndicado(id: number, formData: FormData) {
  await db.update(servicosIndicados).set({
    quemIndicou: formData.get('quemIndicou') as string,
    contatos: formData.get('contatos') as string,
    servicoPago: formData.get('servicoPago') as string,
    servico: formData.get('servico') as string,
    valor: parseFloat(formData.get('valor') as string) || 0,
    data: formData.get('data') as string,
    valorDevido: parseFloat(formData.get('valorDevido') as string) || 0
  }).where(eq(servicosIndicados.id, id));

  revalidatePath('/faturamento/servicos-indicados');
  redirect('/faturamento/servicos-indicados');
}

export async function atualizarDiario(id: number, formData: FormData) {
  const compra = parseFloat(formData.get('compra') as string) || 0;
  const especie = parseFloat(formData.get('especie') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const pix = parseFloat(formData.get('pix') as string) || 0;
  const saidaDinheiro = parseFloat(formData.get('saidaDinheiro') as string) || 0;
  const saidaPix = parseFloat(formData.get('saidaPix') as string) || 0;
  const dizimo = parseFloat(formData.get('dizimo') as string) || 0;
  const fatEspecie = parseFloat(formData.get('fatEspecie') as string) || 0;
  const total = especie + credito + debito + pix;

  await db.update(faturamentoDiario).set({
    data: formData.get('data') as string,
    mesReferencia: formData.get('mesReferencia') as string,
    descricao: formData.get('descricao') as string,
    compra, especie, credito, debito, pix, total, saidaDinheiro, saidaPix, dizimo, fatEspecie
  }).where(eq(faturamentoDiario.id, id));

  revalidatePath('/faturamento/diario');
  redirect('/faturamento/diario');
}
export async function atualizarFuncionario(id: number, formData: FormData) {
  const nome = formData.get('nome') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const dataInicio = formData.get('dataInicio') as string;

  const dias = [];
  let totalVt = 0, totalVa = 0, totalSalario = 0, totalFerias = 0, total13 = 0;

  for (let i = 1; i <= 31; i++) {
    const status = formData.get(`d${i}_status`) as string || 'P';
    const vt = parseFloat(formData.get(`d${i}_vt`) as string) || 0;
    const va = parseFloat(formData.get(`d${i}_va`) as string) || 0;
    const sal = parseFloat(formData.get(`d${i}_sal`) as string) || 0;
    const fer = parseFloat(formData.get(`d${i}_fer`) as string) || 0;
    const d13 = parseFloat(formData.get(`d${i}_d13`) as string) || 0;

    dias.push({ dia: i, status, vt, va, sal, fer, d13 });
    if (status !== 'F') { totalVt += vt; totalVa += va; totalSalario += sal; totalFerias += fer; total13 += d13; }
  }

  const diasJson = JSON.stringify(dias);
  const totalGeral = totalVt + totalVa + totalSalario + totalFerias + total13;

  await db.update(controleFuncionarios).set({
    nome, mesReferencia, dataInicio, diasJson, totalVt, totalVa, totalSalario, totalFerias, total13, totalGeral
  }).where(eq(controleFuncionarios.id, id));

  revalidatePath('/faturamento/funcionarios');
  redirect('/faturamento/funcionarios');
}

export async function atualizarBalanco(id: number, formData: FormData) {
  const ano = formData.get('ano') as string;
  const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const mesesData = [];
  let totalCompras = 0, totalEntrada = 0, totalSaida = 0;

  for (const mes of MESES) {
    const compras = parseFloat(formData.get(`compras_${mes}`) as string) || 0;
    const entrada = parseFloat(formData.get(`entrada_${mes}`) as string) || 0;
    const saida = parseFloat(formData.get(`saida_${mes}`) as string) || 0;
    mesesData.push({ mes, compras, entrada, saida });
    totalCompras += compras; totalEntrada += entrada; totalSaida += saida;
  }

  await db.update(balancoAnual).set({
    ano, mesesJson: JSON.stringify(mesesData), totalCompras, totalEntrada, totalSaida
  }).where(eq(balancoAnual.id, id));

  revalidatePath('/faturamento/balanco');
  redirect('/faturamento/balanco');
}

export async function atualizarBalancoDiario(id: number, formData: FormData) {
  const compras = parseFloat(formData.get('compras') as string) || 0;
  const entradaDinheiro = parseFloat(formData.get('entradaDinheiro') as string) || 0;
  const entradaCredito = parseFloat(formData.get('entradaCredito') as string) || 0;
  const entradaDebito = parseFloat(formData.get('entradaDebito') as string) || 0;
  const entradaPix = parseFloat(formData.get('entradaPix') as string) || 0;
  const saidaPagamentos = parseFloat(formData.get('saidaPagamentos') as string) || 0;

  await db.update(balancoDiario).set({
    data: formData.get('data') as string, mesReferencia: formData.get('mesReferencia') as string, anoBase: formData.get('anoBase') as string,
    compras, entradaDinheiro, entradaCredito, entradaDebito, entradaPix, saidaPagamentos
  }).where(eq(balancoDiario.id, id));

  revalidatePath('/faturamento/balanco-diario');
  redirect('/faturamento/balanco-diario');
}

export async function atualizarBalancoUti(id: number, formData: FormData) {
  const compras = parseFloat(formData.get('compras') as string) || 0;
  const entradaDinheiro = parseFloat(formData.get('entradaDinheiro') as string) || 0;
  const entradaCredito = parseFloat(formData.get('entradaCredito') as string) || 0;
  const entradaDebito = parseFloat(formData.get('entradaDebito') as string) || 0;
  const entradaPix = parseFloat(formData.get('entradaPix') as string) || 0;
  const saidaPagamentos = parseFloat(formData.get('saidaPagamentos') as string) || 0;

  await db.update(balancoDiarioUti).set({
    data: formData.get('data') as string, mesReferencia: formData.get('mesReferencia') as string, anoBase: formData.get('anoBase') as string,
    compras, entradaDinheiro, entradaCredito, entradaDebito, entradaPix, saidaPagamentos
  }).where(eq(balancoDiarioUti.id, id));

  revalidatePath('/faturamento/balanco-uti');
  redirect('/faturamento/balanco-uti');
}