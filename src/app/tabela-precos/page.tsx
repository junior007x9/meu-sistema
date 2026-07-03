import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { tabelaPrecos } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { Plus, ListChecks } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function TabelaPrecosPage() {
  const listaPrecos = await db.select().from(tabelaPrecos).orderBy(asc(tabelaPrecos.tipoConserto));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Preços de Serviços</h1>
          <p className="text-slate-500 mt-1">Tabela oficial de consertos da UTI dos Óculos.</p>
        </div>
        <Link href="/tabela-precos/nova" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5 w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Novo Serviço
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-300 shadow-md overflow-hidden">
        {listaPrecos.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <ListChecks className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum serviço cadastrado</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[1000px] border border-slate-400">
              <thead>
                <tr>
                  <th colSpan={8} className="bg-[#00bdf2] text-black py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">
                    TABELA DE PREÇOS DE SERVIÇOS - 2026
                  </th>
                </tr>
                <tr className="text-xs uppercase tracking-wider font-black text-black">
                  <th className="p-3 bg-[#ffffcc] border border-slate-400">LOJA STYLLO ÓTICA</th>
                  <th colSpan={2} className="p-3 bg-[#ccffcc] border border-slate-400">NA LOJA</th>
                  <th colSpan={2} className="p-3 bg-[#fae3d2] border border-slate-400">DELIVERY</th>
                  <th colSpan={2} className="p-3 bg-[#dce8f5] border border-slate-400">ÓTICAS</th>
                  <th rowSpan={2} className="p-3 bg-slate-200 border border-slate-400">AÇÕES</th>
                </tr>
                <tr className="text-[10px] uppercase font-black text-black">
                  <th className="p-2 bg-[#ffffcc] border border-slate-400">TIPOS DE CONSERTOS</th>
                  <th className="p-2 bg-[#ccffcc] border border-slate-400">ESPÉCIE / PIX</th>
                  <th className="p-2 bg-[#ccffcc] border border-slate-400">CARTÃO</th>
                  <th className="p-2 bg-[#fae3d2] border border-slate-400">ESPÉCIE / PIX</th>
                  <th className="p-2 bg-[#fae3d2] border border-slate-400">CARTÃO</th>
                  <th className="p-2 bg-[#dce8f5] border border-slate-400">ESPÉCIE / PIX</th>
                  <th className="p-2 bg-[#dce8f5] border border-slate-400">CARTÃO</th>
                </tr>
              </thead>
              <tbody>
                {listaPrecos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-xs text-slate-800">
                    <td className="p-3 border border-slate-400 bg-[#ffffcc]/50 text-left uppercase">{item.tipoConserto}</td>
                    <td className="p-3 border border-slate-400 bg-[#ccffcc]/30">R$ {item.lojaPix.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#ccffcc]/30">R$ {item.lojaCartao.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#fae3d2]/30">R$ {item.deliveryPix.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#fae3d2]/30">R$ {item.deliveryCartao.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#dce8f5]/30">R$ {item.oticasPix.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#dce8f5]/30">R$ {item.oticasCartao.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white">
                      <BotoesAcao id={item.id} tabela="preco" caminho="/tabela-precos" linkEditar={`/tabela-precos/${item.id}/editar`} />
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