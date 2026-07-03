import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clientes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Users } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function ClientesPage() {
  const listaClientes = await db.select().from(clientes).orderBy(desc(clientes.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fichas de Clientes</h1>
          <p className="text-slate-500 mt-1">Gestão de contatos da ótica.</p>
        </div>
        <Link href="/clientes/novo" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all">
          <Plus className="h-5 w-5" /> Novo Cliente
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaClientes.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Users className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum cliente cadastrado</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-black border-b border-slate-200">
                  <th className="p-4">Nome do Cliente</th>
                  <th className="p-4">Telefone / Contato</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{cliente.nome}</td>
                    <td className="p-4 font-medium text-slate-600">{cliente.telefone || '-'}</td>
                    <td className="p-4 bg-slate-50 border-l border-slate-100 w-32">
                      <BotoesAcao 
                        id={cliente.id} 
                        tabela="cliente" 
                        caminho="/clientes" 
                        linkEditar={`/clientes/${cliente.id}/editar`} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}