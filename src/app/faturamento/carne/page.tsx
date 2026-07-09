import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { controleCarne } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function ControleCarnePage() {
  const carnes = await db.select().from(controleCarne).orderBy(desc(controleCarne.dataCompra)).limit(100);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><BookOpen className="h-8 w-8" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Controlo de Carnês</h1>
            <p className="text-sm text-slate-500 font-medium">Gestão de vendas parceladas (Até 10x) e acompanhamento de pagamentos.</p>
          </div>
        </div>
        <Link href="/faturamento/carne/novo" className="flex items-center gap-2 bg-slate-900 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
          <Plus className="h-5 w-5" /> Novo Carnê
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Cliente / Contato</th>
                <th className="p-5 text-center">Data Compra</th>
                <th className="p-5 text-right bg-amber-50/20">Venda Total</th>
                <th className="p-5 text-right bg-emerald-50/30">Total Pago (Entrada + Parcelas)</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {carnes.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-slate-500">Nenhum carnê registado.</td></tr>
              ) : (
                carnes.map((c) => {
                  // Calcular automaticamente o total pago lendo as 10 parcelas do banco
                  let totalPago = c.valorEntrada || 0;
                  for (let i = 1; i <= 10; i++) {
                    const valorParcela = c[`p${i}Valor` as keyof typeof c] as number;
                    if (valorParcela) totalPago += valorParcela;
                  }
                  
                  const valorVenda = c.valorVenda || 0;
                  const pendente = valorVenda - totalPago;
                  const quitado = pendente <= 0.01 && valorVenda > 0; // Margem de 1 cêntimo para arredondamentos

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5">
                        <p className="font-bold text-slate-900 uppercase">{c.cliente}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{c.contato || 'Sem Contato'}</p>
                      </td>
                      <td className="p-5 text-center">
                        <span className="font-bold text-slate-700">{new Date(c.dataCompra).toLocaleDateString('pt-BR')}</span>
                      </td>
                      <td className="p-5 text-right bg-amber-50/10">
                        <span className="font-black text-amber-700">R$ {valorVenda.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </td>
                      <td className="p-5 text-right bg-emerald-50/10">
                        <span className="font-black text-emerald-600 text-lg">R$ {totalPago.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                        {pendente > 0 && <p className="text-[10px] text-rose-500 mt-1 font-bold">Falta: R$ {pendente.toFixed(2)}</p>}
                      </td>
                      <td className="p-5 text-center">
                        {quitado ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black tracking-widest"><CheckCircle2 className="h-4 w-4"/> QUITADO</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-black tracking-widest"><AlertCircle className="h-4 w-4"/> PENDENTE</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}