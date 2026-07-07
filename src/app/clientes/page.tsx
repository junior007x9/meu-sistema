import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clientes } from '@/db/schema';
import { Users, Plus, Phone, Calendar, Edit3, Eye, Search } from 'lucide-react';
import { desc } from 'drizzle-orm';

export default async function ClientesPage() {
  // Busca os clientes ordenados pelos mais recentes
  const listaClientes = await db.select().from(clientes).orderBy(desc(clientes.id));

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      {/* HEADER E BOTÃO NOVO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Pacientes & Clientes</h1>
            <p className="text-sm text-slate-500 font-medium">Gestão de fichas clínicas e receitas oftalmológicas.</p>
          </div>
        </div>
        <Link href="/clientes/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
          <Plus className="h-5 w-5" /> Adicionar Cliente
        </Link>
      </div>

      {/* BARRA DE PESQUISA (VISUAL) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Procurar paciente por nome, CPF ou telefone..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 shadow-sm"
        />
      </div>

      {/* TABELA DE CLIENTES */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Cód.</th>
                <th className="p-5">Nome do Cliente</th>
                <th className="p-5">Contato</th>
                <th className="p-5">Última Consulta</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listaClientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500 font-medium">
                    Nenhum cliente registado ainda. Clique em "Adicionar Cliente" para começar.
                  </td>
                </tr>
              ) : (
                listaClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 font-black text-slate-400 text-xs">#{String(cliente.id).padStart(4, '0')}</td>
                    <td className="p-5 font-bold text-slate-800 uppercase">{cliente.nome}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                        <Phone className="h-4 w-4 text-slate-400" /> {cliente.telefone || 'Não informado'}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                        <Calendar className="h-4 w-4 text-blue-400" /> {cliente.ultimaConsulta || 'S/ Registro'}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors" title="Ver Receita">
                          <Eye className="h-4 w-4" />
                        </button>
                        <Link href={`/clientes/${cliente.id}/editar`} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Editar Ficha">
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}