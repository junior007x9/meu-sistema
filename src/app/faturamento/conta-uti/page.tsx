import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { contaUti } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Landmark, Wrench, Activity } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function ContaUtiPage() {
  const registros = await db.select().from(contaUti).orderBy(desc(contaUti.data));
  const somaTotal = registros.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Faturamento por Mês</h1>
          <p className="text-slate-500 mt-1">Controle de entradas, repasses e serviços.</p>
        </div>
        <Link href="/faturamento/conta-uti/novo" className="flex items-center gap-2 bg-[#00bdf2] hover:bg-[#009bc2] text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Novo Valor Diário (UTI)
        </Link>
      </div>

      {/* SISTEMA DE ABAS ATUALIZADO */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap">
            <Wrench className="h-4 w-4" /> Serviços Joãozinho
         </Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap">
            <Landmark className="h-4 w-4" /> Conta Styllo Ótica
         </Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-[#00bdf2] text-black font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap">
            <Activity className="h-4 w-4" /> Conta UTI
         </Link>
      </div>

      <div className="bg-white rounded-b-xl rounded-tr-xl border border-slate-300 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Activity className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum valor diário registrado na UTI</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[900px] border border-slate-400">
              <thead>
                <tr>
                  <th colSpan={7} className="bg-[#00bdf2] text-black py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">
                    VALOR DIÁRIO QUE CAI NA CONTA (UTI)
                  </th>
                </tr>
                <tr className="text-xs uppercase tracking-wider font-black text-black bg-[#e6f9fd]">
                  <th className="p-3 border border-slate-400">DATA</th>
                  <th className="p-3 border border-slate-400">PIX</th>
                  <th className="p-3 border border-slate-400">CRÉDITO</th>
                  <th className="p-3 border border-slate-400">DÉBITO</th>
                  <th className="p-3 border border-slate-400 text-red-600">SAÍDA</th>
                  <th className="p-3 border border-slate-400">TOTAL DIÁRIO</th>
                  <th className="p-3 border border-slate-400 bg-slate-200">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-sm text-slate-800">
                    <td className="p-3 border border-slate-400">
                      {item.data.split('-').reverse().join('/')} <br/>
                      <span className="text-[9px] text-slate-400">{item.mesReferencia}/{item.anoBase}</span>
                    </td>
                    <td className="p-3 border border-slate-400 text-slate-600">R$ {item.pix.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 text-slate-600">R$ {item.credito.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 text-slate-600">R$ {item.debito.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 text-red-600">R$ {item.saida.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-[#e6f9fd] text-blue-900 font-black">R$ {item.total.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-white">
                      <BotoesAcao id={item.id} tabela="conta-uti" caminho="/faturamento/conta-uti" linkEditar={`/faturamento/conta-uti/${item.id}/editar`} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr>
                    <td colSpan={5} className="p-3 border border-slate-400 text-right font-black uppercase text-slate-700 bg-slate-100">Total Acumulado (UTI):</td>
                    <td className="p-3 border border-slate-400 bg-[#00bdf2] text-black font-black text-lg">R$ {somaTotal.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-slate-100"></td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}