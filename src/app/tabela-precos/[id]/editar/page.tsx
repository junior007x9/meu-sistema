import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { tabelaPrecos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save } from 'lucide-react';

export default async function EditarPrecoPage({ params }: { params: { id: string } }) {
  const precoId = parseInt(params.id);
  const preco = await db.select().from(tabelaPrecos).where(eq(tabelaPrecos.id, precoId)).get();

  if (!preco) redirect('/tabela-precos');

  async function atualizarPreco(formData: FormData) {
    "use server";
    await db.update(tabelaPrecos).set({
      tipoConserto: formData.get('tipoConserto') as string,
      lojaPix: parseFloat(formData.get('lojaPix') as string) || 0,
      lojaCartao: parseFloat(formData.get('lojaCartao') as string) || 0,
      deliveryPix: parseFloat(formData.get('deliveryPix') as string) || 0,
      deliveryCartao: parseFloat(formData.get('deliveryCartao') as string) || 0,
      oticasPix: parseFloat(formData.get('oticasPix') as string) || 0,
      oticasCartao: parseFloat(formData.get('oticasCartao') as string) || 0,
    }).where(eq(tabelaPrecos.id, precoId));
      
    revalidatePath('/tabela-precos');
    redirect('/tabela-precos');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tabela-precos" className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft className="h-6 w-6" /></Link>
        <div><h1 className="text-3xl font-bold">Editar Preço de Serviço</h1></div>
      </div>
      <form action={atualizarPreco} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div>
          <label className="block font-bold mb-2">Tipo de Conserto</label>
          <input type="text" name="tipoConserto" defaultValue={preco.tipoConserto} required className="w-full px-4 py-2 bg-slate-50 border rounded-lg font-bold" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#ccffcc]/30 p-4 rounded-xl border border-[#ccffcc]">
            <h3 className="font-black mb-2 text-green-700">NA LOJA</h3>
            <label className="text-xs font-bold">PIX</label><input type="number" step="0.01" name="lojaPix" defaultValue={preco.lojaPix} className="w-full mb-2 p-2 border border-green-300 rounded" />
            <label className="text-xs font-bold">Cartão</label><input type="number" step="0.01" name="lojaCartao" defaultValue={preco.lojaCartao} className="w-full p-2 border border-green-300 rounded" />
          </div>
          <div className="bg-[#fae3d2]/40 p-4 rounded-xl border border-[#fae3d2]">
            <h3 className="font-black mb-2 text-orange-700">DELIVERY</h3>
            <label className="text-xs font-bold">PIX</label><input type="number" step="0.01" name="deliveryPix" defaultValue={preco.deliveryPix} className="w-full mb-2 p-2 border border-orange-300 rounded" />
            <label className="text-xs font-bold">Cartão</label><input type="number" step="0.01" name="deliveryCartao" defaultValue={preco.deliveryCartao} className="w-full p-2 border border-orange-300 rounded" />
          </div>
          <div className="bg-[#dce8f5]/50 p-4 rounded-xl border border-[#dce8f5]">
            <h3 className="font-black mb-2 text-blue-700">ÓTICAS</h3>
            <label className="text-xs font-bold">PIX</label><input type="number" step="0.01" name="oticasPix" defaultValue={preco.oticasPix} className="w-full mb-2 p-2 border border-blue-300 rounded" />
            <label className="text-xs font-bold">Cartão</label><input type="number" step="0.01" name="oticasCartao" defaultValue={preco.oticasCartao} className="w-full p-2 border border-blue-300 rounded" />
          </div>
        </div>
        <div className="flex justify-end pt-4"><button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl font-bold shadow-md"><Save className="h-5 w-5 inline mr-2"/> Atualizar Tabela</button></div>
      </form>
    </div>
  );
}