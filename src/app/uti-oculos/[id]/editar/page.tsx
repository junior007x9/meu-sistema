import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { ordensServico, clientes } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save, Wrench } from 'lucide-react';

export default async function EditarOSPage({ params }: { params: { id: string } }) {
  const osId = parseInt(params.id);
  const osData = await db.select().from(ordensServico).where(eq(ordensServico.id, osId)).get();
  const listaClientes = await db.select().from(clientes).orderBy(asc(clientes.nome));

  if (!osData) redirect('/uti-oculos');

  async function atualizarOS(formData: FormData) {
    "use server";
    const clienteId = parseInt(formData.get('clienteId') as string, 10);
    const servicoRealizado = formData.get('servicoRealizado') as string;
    const tecnico = formData.get('tecnico') as string;
    
    const valorPix = parseFloat(formData.get('valorPix') as string) || 0;
    const valorEspecie = parseFloat(formData.get('valorEspecie') as string) || 0;
    const valorCartao = parseFloat(formData.get('valorCartao') as string) || 0;
    const valorTotal = valorPix + valorEspecie + valorCartao;

    await db.update(ordensServico).set({
      clienteId,
      servicoRealizado,
      tecnico: tecnico || null,
      valorPix, valorEspecie, valorCartao, valorTotal
    }).where(eq(ordensServico.id, osId));
      
    revalidatePath('/uti-oculos');
    redirect('/uti-oculos');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/uti-oculos" className="p-2 hover:bg-slate-200 rounded-full"><ArrowLeft className="h-6 w-6" /></Link>
        <div><h1 className="text-3xl font-bold">Editar Ordem de Serviço</h1></div>
      </div>
      <form action={atualizarOS} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Cliente *</label>
            <select name="clienteId" defaultValue={osData.clienteId || ''} required className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-500">
              {listaClientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Técnico</label>
            <select name="tecnico" defaultValue={osData.tecnico || ''} className="w-full px-4 py-2 bg-emerald-50 border border-emerald-300 font-bold rounded-lg outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="">Nenhum</option>
              <option value="BARBOSA">BARBOSA</option>
              <option value="CLEYTON">CLEYTON</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Serviço Realizado</label>
          <input type="text" name="servicoRealizado" defaultValue={osData.servicoRealizado || ''} className="w-full px-4 py-2 bg-slate-50 border rounded-lg outline-none" />
        </div>
        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border">
          <div>
            <label className="block text-xs font-bold text-slate-700">PIX (R$)</label>
            <input type="number" step="0.01" name="valorPix" defaultValue={osData.valorPix} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700">Espécie (R$)</label>
            <input type="number" step="0.01" name="valorEspecie" defaultValue={osData.valorEspecie} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700">Cartão (R$)</label>
            <input type="number" step="0.01" name="valorCartao" defaultValue={osData.valorCartao} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>
        <div className="flex justify-end pt-4"><button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl font-bold shadow-md flex items-center gap-2"><Save className="h-5 w-5"/> Salvar</button></div>
      </form>
    </div>
  );
}