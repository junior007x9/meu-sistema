import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clientes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Save, User } from 'lucide-react';

export default async function EditarClientePage({ params }: { params: { id: string } }) {
  const clienteId = parseInt(params.id);
  
  // 1. Busca os dados atuais do cliente no banco
  const clienteData = await db.select().from(clientes).where(eq(clientes.id, clienteId)).get();

  // Se não achar o cliente, volta pra lista
  if (!clienteData) redirect('/clientes');

  // 2. Função que salva a alteração no banco
  async function atualizarCliente(formData: FormData) {
    "use server";
    const nome = formData.get('nome') as string;
    const telefone = formData.get('telefone') as string;

    await db.update(clientes)
      .set({ nome, telefone })
      .where(eq(clientes.id, clienteId));
      
    revalidatePath('/clientes');
    redirect('/clientes');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/clientes" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Editar Cliente</h1>
          <p className="text-sm text-slate-500 font-medium">Atualize os dados de contato.</p>
        </div>
      </div>

      <form action={atualizarCliente} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <User className="h-5 w-5 text-yellow-500" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Ficha Cadastral</h2>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo *</label>
          <input 
            type="text" 
            name="nome" 
            defaultValue={clienteData.nome} 
            required 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Telefone (WhatsApp)</label>
          <input 
            type="text" 
            name="telefone" 
            defaultValue={clienteData.telefone || ''} 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" 
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Link href="/clientes" className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all">
            <Save className="h-5 w-5" /> Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}