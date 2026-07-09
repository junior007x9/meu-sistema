import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { ordensServico, clientes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { ClipboardList, Plus, Search, Eye, Edit3, Clock, CheckCircle } from 'lucide-react';

export default async function OSDashboardPage() {
  // Fazemos um "Join" inteligente: Busca a OS e cruza com a tabela de Clientes para pegar o nome
  const listaOS = await db.select({
    id: ordensServico.id,
    status: ordensServico.status,
    modeloArmacao: ordensServico.modeloArmacao,
    valorTotal: ordensServico.valorTotal,
    dataEntrada: ordensServico.dataEntrada,
    dataEntrega: ordensServico.dataEntregaPrevista,
    clienteNome: clientes.nome,
    clienteTelefone: clientes.telefone,
  })
  .from(ordensServico)
  .leftJoin(clientes, eq(ordensServico.clienteId, clientes.id))
  .orderBy(desc(ordensServico.id));

  const formatarData = (data: Date | null) => {
    if (!data) return '---';
    return data.toLocaleDateString('pt-BR');
  };

  const getStatusStyle = (status: string | null) => {
    switch(status) {
      case 'RECEBIDO': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'EM ANDAMENTO': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CONCLUÍDO': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ENTREGUE': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      {/* HEADER E BOTÃO NOVA OS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><ClipboardList className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ordens de Serviço</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de laboratório, consertos e montagens.</p>
          </div>
        </div>
        <Link href="/os/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
          <Plus className="h-5 w-5" /> Nova O.S.
        </Link>
      </div>

      {/* BARRA DE PESQUISA */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Procurar O.S. por número, nome do cliente ou telemóvel..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium text-slate-700 shadow-sm"
        />
      </div>

      {/* TABELA DE ORDENS DE SERVIÇO */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5 w-20">Nº O.S.</th>
                <th className="p-5">Cliente</th>
                <th className="p-5">Armação / Serviço</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5">Datas</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listaOS.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500 font-medium">
                    Nenhuma Ordem de Serviço registada. Clique em "Nova O.S." para criar a primeira.
                  </td>
                </tr>
              ) : (
                listaOS.map((os) => (
                  <tr key={os.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 font-black text-slate-400 text-xs">#{String(os.id).padStart(5, '0')}</td>
                    <td className="p-5">
                      <p className="font-bold text-slate-800 uppercase">{os.clienteNome || 'Cliente Removido'}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{os.clienteTelefone}</p>
                    </td>
                    <td className="p-5 text-sm font-medium text-slate-700">{os.modeloArmacao || 'Não especificado'}</td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${getStatusStyle(os.status)} shadow-sm`}>
                        {os.status}
                      </span>
                    </td>
                    <td className="p-5 text-xs text-slate-600 font-medium space-y-1">
                      <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue-400" /> {formatarData(os.dataEntrada)}</div>
                      <div className="flex items-center gap-1.5 text-slate-400"><CheckCircle className="h-3.5 w-3.5" /> Prev: {formatarData(os.dataEntrega)}</div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors" title="Imprimir Recibo">
                          <Eye className="h-4 w-4" />
                        </button>
                        <Link href={`/os/${os.id}/editar`} className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors" title="Editar O.S.">
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