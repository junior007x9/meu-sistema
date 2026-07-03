"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Users, FileSpreadsheet } from 'lucide-react';
import { salvarFuncionario } from '@/actions/faturamento';

export default function NovoFuncionarioPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/funcionarios" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Planilha do Funcionário</h1>
          <p className="text-sm text-slate-500 font-medium">Lançamento de despesas e vales do mês.</p>
        </div>
      </div>

      <form action={salvarFuncionario} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        {/* CABEÇALHO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#c2d69b]/20 p-5 rounded-xl border border-[#c2d69b]">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Funcionário *</label>
            <input type="text" name="nome" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg outline-none font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mês/Ano Referência *</label>
            <input type="text" name="mesReferencia" placeholder="Ex: MARÇO 2025" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg outline-none font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data Início Estágio *</label>
            <input type="text" name="dataInicio" placeholder="Ex: 13/03/2025" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg outline-none font-bold" />
          </div>
        </div>

        {/* PLANILHA DINÂMICA (Estilo Excel) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Lançamentos Diários</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-4">
            Preencha apenas as linhas dos dias trabalhados. Coloque o <strong>Dia (Ex: 13)</strong>. Se o funcionário faltou, mude o status para <strong>"F"</strong> e o sistema zera tudo automaticamente.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-300">
            <table className="w-full text-center text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-700 border-b border-slate-300">
                  <th className="p-3 border-r">Dia do Mês</th>
                  <th className="p-3 border-r">Situação</th>
                  <th className="p-3 border-r">V. Transp.</th>
                  <th className="p-3 border-r">V. Alim.</th>
                  <th className="p-3 border-r">Salário</th>
                  <th className="p-3 border-r">Férias</th>
                  <th className="p-3">13º Sal.</th>
                </tr>
              </thead>
              <tbody>
                {/* Gera 25 linhas em branco com os valores padrões para facilitar a vida! */}
                {[...Array(25)].map((_, i) => (
                  <tr key={i} className="hover:bg-slate-50 border-b border-slate-200">
                    <td className="p-1 border-r bg-white"><input type="text" name={`dia_${i}`} placeholder="Ex: 13" className="w-full text-center outline-none bg-transparent font-black text-slate-800 py-2" /></td>
                    <td className="p-1 border-r bg-white">
                      <select name={`status_${i}`} className="w-full text-center outline-none bg-transparent font-black text-slate-700 py-2 cursor-pointer">
                        <option value="P">P (Presente)</option>
                        <option value="F">F (Falta)</option>
                      </select>
                    </td>
                    <td className="p-1 border-r"><input type="number" step="0.01" name={`vt_${i}`} defaultValue="4.10" className="w-full text-center outline-none bg-transparent py-2 text-slate-600 font-medium" /></td>
                    <td className="p-1 border-r"><input type="number" step="0.01" name={`va_${i}`} defaultValue="15.00" className="w-full text-center outline-none bg-transparent py-2 text-slate-600 font-medium" /></td>
                    <td className="p-1 border-r"><input type="number" step="0.01" name={`sal_${i}`} defaultValue="50.60" className="w-full text-center outline-none bg-transparent py-2 text-slate-600 font-medium" /></td>
                    <td className="p-1 border-r"><input type="number" step="0.01" name={`fer_${i}`} defaultValue="50.60" className="w-full text-center outline-none bg-transparent py-2 text-slate-600 font-medium" /></td>
                    <td className="p-1"><input type="number" step="0.01" name={`d13_${i}`} defaultValue="50.60" className="w-full text-center outline-none bg-transparent py-2 text-slate-600 font-medium" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 mt-6">
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-10 py-3.5 rounded-xl font-black text-white shadow-md transition-transform hover:-translate-y-0.5">
            <Save className="h-5 w-5 inline mr-2"/> Gravar e Calcular Mês
          </button>
        </div>
      </form>
    </div>
  );
}