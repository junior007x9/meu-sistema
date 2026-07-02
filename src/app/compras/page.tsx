import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { comprasOnline } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Search, ShoppingBag, Truck, CheckCircle2, Clock } from 'lucide-react';

export default async function ComprasPage() {
  const listaCompras = await db.select().from(comprasOnline).orderBy(desc(comprasOnline.criadoEm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Compras Online</h1>
          <p className="text-slate-500 mt-1">Gestão de encomendas e rastreio.</p>
        </div>
        <Link href="/compras/nova" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Registrar Compra
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input type="text" placeholder="Buscar por produto, loja ou rastreio..." className="bg-transparent border-none outline-none w-full text-slate-700 font-medium" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {listaCompras.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhuma compra registrada</h3>
            <p className="text-slate-500 max-w-sm mt-1">Sua lista de encomendas da internet aparecerá aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-black">
                  <th className="p-4">Data</th>
                  <th className="p-4">Produto</th>
                  <th className="p-4">Loja</th>
                  <th className="p-4">Quem Comprou / Pagar</th>
                  <th className="p-4">Nº Rastreio</th>
                  <th className="p-4 text-center">Qtd.</th>
                  <th className="p-4 text-right">Valor Total</th>
                  <th className="p-4 text-center">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaCompras.map((compra) => (
                  <tr key={compra.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-xs font-bold text-slate-500 whitespace-nowrap">{compra.dataCompra}</td>
                    <td className="p-4 text-sm font-bold text-slate-900 max-w-[200px] truncate" title={compra.produto}>{compra.produto}</td>
                    <td className="p-4 text-xs font-bold text-indigo-600">{compra.loja}</td>
                    <td className="p-4 text-xs">
                       <div className="font-bold text-slate-700">{compra.quemComprou || '-'}</div>
                       <div className="text-slate-400">Paga: {compra.quemVaiPagar || '-'}</div>
                    </td>
                    <td className="p-4 text-xs font-mono font-bold text-slate-600 bg-slate-50">
                      {compra.rastreio ? (
                        <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> {compra.rastreio}</span>
                      ) : '-'}
                    </td>
                    <td className="p-4 text-sm font-black text-slate-700 text-center">{compra.quantidade}</td>
                    <td className="p-4 text-sm font-black text-emerald-600 text-right whitespace-nowrap">
                      R$ {compra.valorTotal.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-4 text-center">
                      {compra.situacaoPagamento === 'PAGO' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                          <CheckCircle2 className="h-3 w-3" /> Pago
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                          <Clock className="h-3 w-3" /> {compra.situacaoPagamento}
                        </span>
                      )}
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