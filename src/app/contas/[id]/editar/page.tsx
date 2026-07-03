import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { contasMensais } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save } from 'lucide-react';

export default async function EditarContaPage({ params }: { params: { id: string } }) {
  const contaId = parseInt(params.id);
  const conta = await db.select().from(contasMensais).where(eq(contasMensais.id, contaId)).get();

  if (!conta) redirect('/contas');

  async function atualizarConta(formData: FormData) {
    "use server";
    const totalKwh = parseFloat(formData.get('totalKwh') as string) || 0;
    const totalRs = parseFloat(formData.get('totalRs') as string) || 0;
    const mediaBarbosaKwh = parseFloat(formData.get('mediaBarbosaKwh') as string) || 0;
    const icms = parseFloat(formData.get('icms') as string) || 0;
    const pis = parseFloat(formData.get('pis') as string) || 0;
    const cofins = parseFloat(formData.get('cofins') as string) || 0;
    const descontoAlinePerc = parseFloat(formData.get('descontoAlinePerc') as string) || 20;
    
    const aguaAline = parseFloat(formData.get('aguaAline') as string) || 0;
    const aguaBarbosa = parseFloat(formData.get('aguaBarbosa') as string) || 0;

    // Recalcula toda a matemática da divisão
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

    await db.update(contasMensais).set({
      mesReferencia: formData.get('mesReferencia') as string,
      totalKwh, totalRs, mediaBarbosaKwh,
      icms, pis, cofins, descontoAlinePerc,
      aguaAline, aguaBarbosa,
      equatorialBarbosa, equatorialAline, totalAlineGeral
    }).where(eq(contasMensais.id, contaId));
      
    revalidatePath('/contas');
    redirect('/contas');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/contas" className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft className="h-6 w-6" /></Link>
        <div><h1 className="text-3xl font-bold">Editar Repasse Mensal</h1></div>
      </div>
      <form action={atualizarConta} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div>
          <label className="font-bold">Mês de Referência</label>
          <input type="text" name="mesReferencia" defaultValue={conta.mesReferencia} className="w-1/3 px-4 py-2 bg-slate-50 border rounded-lg ml-4 font-bold" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <h3 className="font-black mb-4">EQUATORIAL</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div><label className="text-xs font-bold">Total KWH</label><input type="number" name="totalKwh" defaultValue={conta.totalKwh} className="w-full p-2 border border-yellow-300 rounded" /></div>
              <div><label className="text-xs font-bold">Total R$</label><input type="number" step="0.01" name="totalRs" defaultValue={conta.totalRs} className="w-full p-2 border border-yellow-300 rounded" /></div>
            </div>
            <div className="mb-2"><label className="text-xs font-bold">Média Barbosa KWH</label><input type="number" name="mediaBarbosaKwh" defaultValue={conta.mediaBarbosaKwh} className="w-full p-2 border border-yellow-300 rounded" /></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div><label className="text-[10px] font-bold">ICMS</label><input type="number" step="0.01" name="icms" defaultValue={conta.icms} className="w-full p-1 border border-yellow-300 rounded" /></div>
              <div><label className="text-[10px] font-bold">PIS</label><input type="number" step="0.01" name="pis" defaultValue={conta.pis} className="w-full p-1 border border-yellow-300 rounded" /></div>
              <div><label className="text-[10px] font-bold">COFINS</label><input type="number" step="0.01" name="cofins" defaultValue={conta.cofins} className="w-full p-1 border border-yellow-300 rounded" /></div>
            </div>
            <div><label className="text-xs font-bold text-red-600">% Desconto Aline</label><input type="number" name="descontoAlinePerc" defaultValue={conta.descontoAlinePerc} className="w-full p-2 border border-red-300 rounded font-bold" /></div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h3 className="font-black mb-4">ÁGUAS DE TERESINA</h3>
            <div className="mb-4"><label className="text-xs font-bold">Aline (R$)</label><input type="number" step="0.01" name="aguaAline" defaultValue={conta.aguaAline} className="w-full p-2 border border-blue-300 rounded" /></div>
            <div><label className="text-xs font-bold">Barbosa (R$)</label><input type="number" step="0.01" name="aguaBarbosa" defaultValue={conta.aguaBarbosa} className="w-full p-2 border border-blue-300 rounded" /></div>
          </div>
        </div>

        <p className="text-xs text-slate-500">* Os repasses finais serão recalculados automaticamente ao salvar.</p>
        <div className="flex justify-end pt-2"><button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl font-bold shadow-md"><Save className="h-5 w-5 inline mr-2"/> Atualizar Cálculos</button></div>
      </form>
    </div>
  );
}