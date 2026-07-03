import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { contasMensais } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, Receipt } from 'lucide-react';

export default async function ContasMensaisPage() {
  const listaContas = await db.select().from(contasMensais).orderBy(desc(contasMensais.criadoEm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Repasses Mensais</h1>
          <p className="text-slate-500 mt-1">Histórico de divisão de contas (Equatorial e Águas de Teresina).</p>
        </div>
        <Link href="/contas/nova" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5 w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Novo Repasse (Mês)
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-300 shadow-md overflow-hidden">
        {listaContas.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <Receipt className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum repasse registrado</h3>
            <p className="text-slate-500 max-w-sm mt-1">Clique no botão acima para iniciar os cálculos do mês.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[900px] border border-slate-400">
              <thead>
                <tr>
                  <th colSpan={8} className="bg-slate-900 text-white py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">
                    HISTÓRICO DE REPASSES ALINE / BARBOSA
                  </th>
                </tr>
                <tr className="text-xs uppercase tracking-wider font-black text-black">
                  <th className="p-3 bg-slate-200 border border-slate-400">Mês Referência</th>
                  <th className="p-3 bg-yellow-100 border border-slate-400">Total Fatura (R$)</th>
                  <th className="p-3 bg-yellow-100 border border-slate-400">Equatorial Barbosa</th>
                  <th className="p-3 bg-yellow-100 border border-slate-400">Equatorial Aline</th>
                  <th className="p-3 bg-blue-100 border border-slate-400">Água Barbosa</th>
                  <th className="p-3 bg-blue-100 border border-slate-400">Água Aline</th>
                  <th className="p-3 bg-[#ff3300] text-white border border-slate-400">TOTAL ALINE (Repasse)</th>
                </tr>
              </thead>
              <tbody>
                {listaContas.map((conta) => (
                  <tr key={conta.id} className="hover:bg-slate-50 transition-colors font-bold text-sm text-slate-800">
                    <td className="p-3 border border-slate-400 bg-slate-50 text-left uppercase">{conta.mesReferencia}</td>
                    <td className="p-3 border border-slate-400">R$ {conta.totalRs.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400">R$ {conta.equatorialBarbosa.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400">R$ {conta.equatorialAline.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400">R$ {conta.aguaBarbosa.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400">R$ {conta.aguaAline.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400 bg-red-50 text-red-700 font-black text-lg">R$ {conta.totalAlineGeral.toFixed(2)}</td>
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