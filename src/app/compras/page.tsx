import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { comprasOnline } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { ShoppingBag, Plus, Search, ExternalLink, CreditCard } from 'lucide-react';

export default async function ComprasPage() {
  const compras = await db.select().from(comprasOnline).orderBy(desc(comprasOnline.id));

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><ShoppingBag className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Compras Online & Encomendas</h1>
            <p className="text-sm text-slate-500 font-medium">Controlo de pedidos de armações, peças e rastreios.</p>
          </div>
        </div>
        <Link href="/compras/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center shadow-md">
          <Plus className="h-5 w-5" /> Registar Compra
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Data / Produto</th>
                <th className="p-5">Loja / Rastreio</th>
                <th className="p-5 text-center">Responsáveis</th>
                <th className="p-5 text-right">Valor Total</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {compras.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500">Nenhuma compra registada.</td>
                </tr>
              ) : (
                compras.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-slate-900 uppercase">{c.produto}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{c.dataCompra} • {c.quantidade} unid.</p>
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-slate-700 uppercase">{c.loja}</p>
                      {c.rastreio && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 font-bold tracking-widest"><ExternalLink className="h-3 w-3" /> {c.rastreio}</span>
                      )}
                    </td>
                    <td className="p-5 text-center text-xs space-y-1">
                      <div><span className="text-slate-400">Comprou:</span> <span className="font-bold text-slate-800">{c.quemComprou}</span></div>
                      <div><span className="text-slate-400">Paga:</span> <span className="font-bold text-rose-600">{c.quemVaiPagar}</span></div>
                    </td>
                    <td className="p-5 text-right">
                      <p className="font-black text-slate-900 text-base">R$ {(c.valorTotal || 0).toFixed(2)}</p>
                      <p className="text-[10px] text-slate-400 uppercase mt-0.5 flex items-center justify-end gap-1"><CreditCard className="h-3 w-3" /> {c.metodoPagamento}</p>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${c.situacaoPagamento === 'PAGO' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                        {c.situacaoPagamento}
                      </span>
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