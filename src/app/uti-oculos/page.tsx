import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { ordensServico, clientes } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Plus, Search, Wrench, MoreVertical, Calendar } from 'lucide-react';

export default async function UTIPage() {
  const listaOS = await db
    .select({
      id: ordensServico.id,
      clienteNome: clientes.nome,
      modelo: ordensServico.modeloArmacao,
      defeito: ordensServico.descricaoDefeito,
      status: ordensServico.status,
      valor: ordensServico.valorTotal,
      data: ordensServico.dataEntrada,
    })
    .from(ordensServico)
    .leftJoin(clientes, eq(ordensServico.clienteId, clientes.id))
    .orderBy(desc(ordensServico.dataEntrada));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">UTI dos Óculos</h1>
          <p className="text-slate-500 mt-1">Controle de consertos e manutenções.</p>
        </div>
        <Link href="/uti-oculos/nova" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Nova OS (Ticket)
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input type="text" placeholder="Buscar por número da OS, cliente ou defeito..." className="bg-transparent border-none outline-none w-full text-slate-700" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaOS.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">UTI Vazia</h3>
            <p className="text-slate-500 max-w-sm mt-1">Nenhum óculos em conserto no momento. Crie uma OS para começar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4">Ticket OS</th>
                  <th className="p-4">Cliente & Óculos</th>
                  <th className="p-4 hidden md:table-cell">Entrada</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Valor Total</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaOS.map((os) => (
                  <tr key={os.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-black text-slate-900">
                      #{os.id.toString().padStart(5, '0')}
                    </td>
                    <td className="p-4 text-sm">
                      <div className="font-bold text-slate-800">{os.clienteNome || 'Cliente não encontrado'}</div>
                      <div className="text-xs text-slate-500 mt-0.5 max-w-[200px] truncate" title={os.defeito}>
                        {os.modelo ? `${os.modelo} - ` : ''}{os.defeito}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {os.data ? new Date(os.data).toLocaleDateString('pt-BR') : '-'}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-wider ${
                        os.status === 'RECEBIDO' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        os.status === 'EM_CONSERTO' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        os.status === 'PRONTO' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {os.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-800 text-right">
                      R$ {os.valor.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 p-1 transition-colors"><MoreVertical className="h-5 w-5" /></button>
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