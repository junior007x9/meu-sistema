import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { comprasOnline } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save } from 'lucide-react';

export default async function EditarCompraPage({ params }: { params: { id: string } }) {
  const compraId = parseInt(params.id);
  const compra = await db.select().from(comprasOnline).where(eq(comprasOnline.id, compraId)).get();

  if (!compra) redirect('/compras');

  async function atualizarCompra(formData: FormData) {
    "use server";
    await db.update(comprasOnline).set({
      produto: formData.get('produto') as string,
      loja: formData.get('loja') as string,
      quemComprou: formData.get('quemComprou') as string,
      quemVaiPagar: formData.get('quemVaiPagar') as string,
      rastreio: formData.get('rastreio') as string,
      quantidade: parseInt(formData.get('quantidade') as string) || 1,
      valorTotal: parseFloat(formData.get('valorTotal') as string) || 0,
      situacaoPagamento: formData.get('situacaoPagamento') as string,
    }).where(eq(comprasOnline.id, compraId));
      
    revalidatePath('/compras');
    redirect('/compras');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/compras" className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft className="h-6 w-6" /></Link>
        <div><h1 className="text-3xl font-bold">Editar Compra</h1></div>
      </div>
      <form action={atualizarCompra} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="font-bold text-sm">Produto</label><input type="text" name="produto" defaultValue={compra.produto || ''} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
          <div><label className="font-bold text-sm">Loja</label><input type="text" name="loja" defaultValue={compra.loja || ''} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="font-bold text-sm">Quem Comprou</label><input type="text" name="quemComprou" defaultValue={compra.quemComprou || ''} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
          <div><label className="font-bold text-sm">Quem vai Pagar</label><input type="text" name="quemVaiPagar" defaultValue={compra.quemVaiPagar || ''} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
          <div><label className="font-bold text-sm">Rastreio</label><input type="text" name="rastreio" defaultValue={compra.rastreio || ''} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="font-bold text-sm">Quantidade</label><input type="number" name="quantidade" defaultValue={compra.quantidade} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
          <div><label className="font-bold text-sm">Valor Total (R$)</label><input type="number" step="0.01" name="valorTotal" defaultValue={compra.valorTotal} className="w-full px-4 py-2 bg-slate-50 border rounded-lg" /></div>
          <div>
            <label className="font-bold text-sm">Situação</label>
            {/* CORREÇÃO APLICADA AQUI NO defaultValue */}
            <select name="situacaoPagamento" defaultValue={compra.situacaoPagamento || 'A PAGAR'} className="w-full px-4 py-2 bg-slate-50 border rounded-lg font-bold">
              <option value="A PAGAR">A PAGAR</option>
              <option value="PAGO">PAGO</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-4"><button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl font-bold shadow-md"><Save className="h-5 w-5 inline mr-2"/> Salvar</button></div>
      </form>
    </div>
  );
}