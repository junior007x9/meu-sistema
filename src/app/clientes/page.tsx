import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clientes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Search, MoreVertical, UserCircle2, Phone, MapPin, CalendarDays } from 'lucide-react';

export default async function ClientesPage() {
  const listaClientes = await db.select().from(clientes).orderBy(desc(clientes.criadoEm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clientes</h1>
          <p className="text-slate-500 mt-1">Fichas de cadastro da ótica.</p>
        </div>
        <Link href="/clientes/novo" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Novo Cliente
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input type="text" placeholder="Buscar por nome, CPF ou telefone..." className="bg-transparent border-none outline-none w-full text-slate-700" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaClientes.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <UserCircle2 className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">Nenhum cliente cadastrado</h3>
            <p className="text-slate-500 max-w-sm mt-1">Adicione o primeiro cliente para começar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4">Cliente</th>
                  <th className="p-4 hidden md:table-cell">Endereço</th>
                  <th className="p-4 hidden lg:table-cell">Consulta?</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50">
                    <td className="p-4 text-sm font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {cliente.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          {cliente.nome}
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {cliente.telefone || 'Sem telefone'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 hidden md:table-cell">
                       <div className="flex items-center gap-1">
                         <MapPin className="h-3 w-3 text-slate-400" />
                         {cliente.bairro ? `${cliente.bairro}, ${cliente.cidade}` : 'Não informado'}
                       </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 hidden lg:table-cell">
                      {cliente.pretendeConsultar === 'SIM' ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded w-max">
                          <CalendarDays className="h-3 w-3" /> 
                          Sim ({cliente.turnoConsulta || 'A combinar'})
                        </span>
                      ) : (
                        <span className="text-slate-400">Não</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600"><MoreVertical className="h-5 w-5" /></button>
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