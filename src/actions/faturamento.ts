"use server";

import { db } from '@/db';
import { servicosJoaozinho } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { contaStyllo } from '@/db/schema';
import { contaUti } from '@/db/schema';
import { controleCarne } from '@/db/schema';
import { clientesDevedoresUti} from '@/db/schema';
import { servicosIndicados } from '@/db/schema';
import { controleFuncionarios } from '@/db/schema';
import { faturamentoDiario } from '@/db/schema';
import { balancoAnual } from '@/db/schema';
import { balancoDiario } from '@/db/schema';

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
export async function salvarDevedorUti(formData: FormData) {
  const cliente = formData.get('cliente') as string;
  const contato = formData.get('contato') as string || '';
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
export async function salvarServicoIndicado(formData: FormData) {
  const quemIndicou = formData.get('quemIndicou') as string;
  const contatos = formData.get('contatos') as string || '';
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
export async function salvarFuncionario(formData: FormData) {
  const nome = formData.get('nome') as string;
  const mesReferencia = formData.get('mesReferencia') as string;
  const dataInicio = formData.get('dataInicio') as string;
  
  let totalVt = 0, totalVa = 0, totalSalario = 0, totalFerias = 0, total13 = 0;
  const dias = [];

  // O sistema varre as 25 linhas do formulário
  for(let i = 0; i < 25; i++) {
    const dia = formData.get(`dia_${i}`) as string;
    if(!dia) continue; // Se o dia estiver vazio, ignora
    
    const status = formData.get(`status_${i}`) as string;
    let vt = 0, va = 0, sal = 0, fer = 0, d13 = 0;
    
    // Se estiver presente (P), lê os valores da linha
    if (status === 'P') {
      vt = parseFloat(formData.get(`vt_${i}`) as string) || 0;
      va = parseFloat(formData.get(`va_${i}`) as string) || 0;
      sal = parseFloat(formData.get(`sal_${i}`) as string) || 0;
      fer = parseFloat(formData.get(`fer_${i}`) as string) || 0;
      d13 = parseFloat(formData.get(`d13_${i}`) as string) || 0;
    }

    totalVt += vt; totalVa += va; totalSalario += sal; totalFerias += fer; total13 += d13;
    dias.push({ dia, status, vt, va, sal, fer, d13 });
  }

  const totalGeral = totalVt + totalVa + totalSalario + totalFerias + total13;

  await db.insert(controleFuncionarios).values({
    nome, mesReferencia, dataInicio,
    diasJson: JSON.stringify(dias), // Salva a planilha inteira aqui
    totalVt, totalVa, totalSalario, totalFerias, total13, totalGeral
  });

  revalidatePath('/faturamento/funcionarios');
  redirect('/faturamento/funcionarios');
}
export async function salvarFaturamentoDiario(formData: FormData) {
  const mesReferencia = formData.get('mesReferencia') as string;
  const anoBase = formData.get('anoBase') as string;
  const data = formData.get('data') as string;
  const descricao = formData.get('descricao') as string;
  
  const compra = parseFloat(formData.get('compra') as string) || 0;
  
  const especie = parseFloat(formData.get('especie') as string) || 0;
  const credito = parseFloat(formData.get('credito') as string) || 0;
  const debito = parseFloat(formData.get('debito') as string) || 0;
  const pix = parseFloat(formData.get('pix') as string) || 0;
  
  const saidaDinheiro = parseFloat(formData.get('saidaDinheiro') as string) || 0;
  const saidaPix = parseFloat(formData.get('saidaPix') as string) || 0;
  
  // A Matemática Base
  const total = especie + credito + debito + pix;
  const dizimo = parseFloat(formData.get('dizimo') as string) || (total * 0.10); // Pega do form, ou calcula 10%
  const fatEspecie = especie - saidaDinheiro;

  await db.insert(faturamentoDiario).values({
    mesReferencia, anoBase, data, descricao,
    compra, especie, credito, debito, pix, total,
    saidaDinheiro, saidaPix, dizimo, fatEspecie
  });

  revalidatePath('/faturamento/diario');
  redirect('/faturamento/diario');
}
export async function salvarBalanco(formData: FormData) {
  const ano = formData.get('ano') as string;
  
  let totalCompras = 0, totalEntrada = 0, totalSaida = 0;
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const dadosMeses = [];

  // Loop que passa pelos 12 meses e soma tudo automaticamente
  for (const mes of meses) {
    const compras = parseFloat(formData.get(`compras_${mes}`) as string) || 0;
    const entrada = parseFloat(formData.get(`entrada_${mes}`) as string) || 0;
    const saida = parseFloat(formData.get(`saida_${mes}`) as string) || 0;

    totalCompras += compras;
    totalEntrada += entrada;
    totalSaida += saida;

    dadosMeses.push({ mes, compras, entrada, saida });
  }

  await db.insert(balancoAnual).values({
    ano,
    mesesJson: JSON.stringify(dadosMeses),
    totalCompras, totalEntrada, totalSaida
  });

  revalidatePath('/faturamento/balanco');
  redirect('/faturamento/balanco');
}
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