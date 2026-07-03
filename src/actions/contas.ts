"use server";

import { db } from '@/db';
import { contasMensais } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function salvarContaMensal(formData: FormData) {
  const mesReferencia = formData.get('mesReferencia') as string;
  
  const totalKwh = parseFloat(formData.get('totalKwh') as string) || 0;
  const totalRs = parseFloat(formData.get('totalRs') as string) || 0;
  const mediaBarbosaKwh = parseFloat(formData.get('mediaBarbosaKwh') as string) || 0;
  const icms = parseFloat(formData.get('icms') as string) || 0;
  const pis = parseFloat(formData.get('pis') as string) || 0;
  const cofins = parseFloat(formData.get('cofins') as string) || 0;
  const descontoAlinePerc = parseFloat(formData.get('descontoAlinePerc') as string) || 20;
  
  const aguaAline = parseFloat(formData.get('aguaAline') as string) || 0;
  const aguaBarbosa = parseFloat(formData.get('aguaBarbosa') as string) || 0;

  // REFAZENDO A SUA MATEMÁTICA BRILHANTE NO SERVIDOR
  const tarifa = totalKwh > 0 ? totalRs / totalKwh : 0;
  const barbosaConsumoRs = mediaBarbosaKwh * tarifa;
  
  const diferencaKwh = totalKwh - mediaBarbosaKwh;
  const diferencaRs = diferencaKwh * tarifa;
  
  const valorDescontoAline = diferencaRs * (descontoAlinePerc / 100);
  const impostosTotal = icms + pis + cofins;
  const impostoMetade = impostosTotal / 2;

  const equatorialBarbosa = barbosaConsumoRs + impostoMetade;
  const equatorialAline = (diferencaRs - valorDescontoAline) + impostoMetade;
  const totalAlineGeral = equatorialAline + aguaAline;

  await db.insert(contasMensais).values({
    mesReferencia,
    totalKwh, totalRs, mediaBarbosaKwh,
    icms, pis, cofins, descontoAlinePerc,
    aguaAline, aguaBarbosa,
    equatorialBarbosa, equatorialAline, totalAlineGeral
  });

  revalidatePath('/contas');
  redirect('/contas');
}