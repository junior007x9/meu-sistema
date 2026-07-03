import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { simulacoesLentes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save } from 'lucide-react';

export default async function EditarSimulacaoPage({ params }: { params: { id: string } }) {
  const simId = parseInt(params.id);
  const sim = await db.select().from(simulacoesLentes).where(eq(simulacoesLentes.id, simId)).get();

  if (!sim) redirect('/simulacoes');

  async function atualizarSimulacao(formData: FormData) {
    "use server";
    const custoLente = parseFloat(formData.get('custoLente') as string) || 0;
    const valorTabela = parseFloat(formData.get('valorTabela') as string) || 0;
    const taxaCartao = parseFloat(formData.get('taxaCartao') as string) || 0;

    // Recalcula a matemática
    const valorParcela = valorTabela / 6;
    const descontoCartao = valorTabela * (taxaCartao / 100);
    const diferenca = valorTabela - descontoCartao;
    const ganho = diferenca - custoLente;

    await db.update(simulacoesLentes).set({
      marcaLente: formData.get('marcaLente') as string,
      cliente: formData.get('cliente') as string,
      custoLente, valorTabela, taxaCartao, valorParcela, descontoCartao, diferenca, ganho
    }).where(eq(simulacoesLentes.id, simId));
      
    revalidatePath('/simulacoes');
    redirect('/simulacoes');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/simulacoes" className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft className="h-6 w-6" /></Link>
        <div><h1 className="text-3xl font-bold">Editar Simulação</h1></div>
      </div>
      <form action={atualizarSimulacao} className="bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-700 space-y-4 text-white">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="font-bold text-sm text-slate-400">Marca da Lente</label><input type="text" name="marcaLente" defaultValue={sim.marcaLente} className="w-full px-4 py-2 bg-slate-800 border-slate-600 rounded-lg text-white" /></div>
          <div><label className="font-bold text-sm text-slate-400">Cliente</label><input type="text" name="cliente" defaultValue={sim.cliente || ''} className="w-full px-4 py-2 bg-slate-800 border-slate-600 rounded-lg text-white" /></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div><label className="font-bold text-sm text-slate-400">Custo Lente (R$)</label><input type="number" step="0.01" name="custoLente" defaultValue={sim.custoLente} className="w-full px-4 py-2 bg-slate-800 border-slate-600 rounded-lg text-white" /></div>
          <div><label className="font-bold text-sm text-slate-400">Valor Tabela (R$)</label><input type="number" step="0.01" name="valorTabela" defaultValue={sim.valorTabela} className="w-full px-4 py-2 bg-slate-800 border-slate-600 rounded-lg text-white" /></div>
          <div><label className="font-bold text-sm text-yellow-500">Taxa Cartão (%)</label><input type="number" step="0.01" name="taxaCartao" defaultValue={sim.taxaCartao} className="w-full px-4 py-2 bg-slate-800 border-slate-600 rounded-lg text-yellow-500 font-bold" /></div>
        </div>
        <p className="text-xs text-slate-500 mt-4">* Os resultados (Ganho, Parcela e Diferença) serão recalculados automaticamente ao salvar.</p>
        <div className="flex justify-end pt-4"><button type="submit" className="bg-yellow-500 text-slate-900 hover:bg-yellow-600 px-8 py-3 rounded-xl font-bold shadow-md"><Save className="h-5 w-5 inline mr-2"/> Atualizar Cálculos</button></div>
      </form>
    </div>
  );
}