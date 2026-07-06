"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Users } from 'lucide-react';
import { atualizarFuncionario } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const DIAS = Array.from({ length: 31 }, (_, i) => i + 1);
  const diasSalvos = JSON.parse(registro.diasJson || '[]');

  const actionAtualizar = atualizarFuncionario.bind(null, registro.id);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/funcionarios" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Folha de Funcionário</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Ajuste os dias, vales e salários deste colaborador.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome do Funcionário *</label><input type="text" name="nome" defaultValue={registro.nome} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold uppercase text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês Base *</label>
             <select name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-800 appearance-none">
               <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option><option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option><option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
               <option value="JULHO">JULHO</option><option value="AGOSTO">AGOSTO</option><option value="SETEMBRO">SETEMBRO</option><option value="OUTUBRO">OUTUBRO</option><option value="NOVEMBRO">NOVEMBRO</option><option value="DEZEMBRO">DEZEMBRO</option>
             </select>
          </div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data Início do Período *</label><input type="date" name="dataInicio" defaultValue={registro.dataInicio} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-800" /></div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2"><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><Users className="h-4 w-4 text-emerald-600" /> Preenchimento Diário</h2><span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full uppercase">Se usar a letra F o sistema anula o dia</span></div>
          <div className="overflow-x-auto scrollbar-thin border border-slate-200 rounded-2xl shadow-inner select-none bg-slate-50/30">
            <table className="w-full text-center border-collapse min-w-[2000px]">
              <thead>
                <tr className="bg-emerald-50 text-emerald-950 font-black text-[10px] uppercase tracking-wider">
                  <th className="p-3 border-r border-slate-200 w-16">DIA</th><th className="p-3 border-r border-slate-200 w-24">STATUS ( P / F )</th><th className="p-3 border-r border-slate-200">VALE TRANS. (R$)</th><th className="p-3 border-r border-slate-200">VALE ALIMEN. (R$)</th><th className="p-3 border-r border-slate-200">SALÁRIO COMER. (R$)</th><th className="p-3 border-r border-slate-200">FÉRIAS (R$)</th><th className="p-3">13º SALÁRIO (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {DIAS.map((dia) => {
                  const dSalvo = diasSalvos.find((d: any) => parseInt(d.dia) === dia) || {};
                  return (
                    <tr key={dia} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2 border-r border-slate-100 font-black text-slate-900 bg-slate-50">{dia}</td>
                      <td className="p-2 border-r border-slate-100"><input type="text" name={`d${dia}_status`} defaultValue={dSalvo.status || 'P'} className="w-full text-center outline-none bg-transparent font-black text-slate-800 uppercase focus:bg-emerald-50 focus:text-emerald-900 rounded py-1" maxLength={1} /></td>
                      <td className="p-2 border-r border-slate-100"><input type="number" step="0.01" name={`d${dia}_vt`} defaultValue={dSalvo.vt || ''} className="w-full text-center outline-none bg-transparent font-medium text-slate-700 focus:bg-slate-100 rounded py-1" /></td>
                      <td className="p-2 border-r border-slate-100"><input type="number" step="0.01" name={`d${dia}_va`} defaultValue={dSalvo.va || ''} className="w-full text-center outline-none bg-transparent font-medium text-slate-700 focus:bg-slate-100 rounded py-1" /></td>
                      <td className="p-2 border-r border-slate-100"><input type="number" step="0.01" name={`d${dia}_sal`} defaultValue={dSalvo.sal || ''} className="w-full text-center outline-none bg-transparent font-medium text-slate-700 focus:bg-slate-100 rounded py-1" /></td>
                      <td className="p-2 border-r border-slate-100"><input type="number" step="0.01" name={`d${dia}_fer`} defaultValue={dSalvo.fer || ''} className="w-full text-center outline-none bg-transparent font-medium text-slate-700 focus:bg-slate-100 rounded py-1" /></td>
                      <td className="p-2"><input type="number" step="0.01" name={`d${dia}_d13`} defaultValue={dSalvo.d13 || ''} className="w-full text-center outline-none bg-transparent font-medium text-slate-700 focus:bg-slate-100 rounded py-1" /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100"><BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="emerald" /></div>
      </form>
    </div>
  );
}