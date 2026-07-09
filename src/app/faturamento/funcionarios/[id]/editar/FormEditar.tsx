"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, CalendarDays } from 'lucide-react';
import { atualizarFuncionario } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';

export default function FormEditar({ registro }: { registro: any }) {
  const dataFormatada = registro.dataInicio ? new Date(registro.dataInicio).toISOString().split('T')[0] : '';
  
  // Transformar os dias salvos no banco num formato legível
  const diasSalvos = JSON.parse(registro.diasJson || '[]');

  const actionAtualizar = atualizarFuncionario.bind(null, registro.id);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/funcionarios" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Folha de Funcionário</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Corrija ausências, vales ou salários de {registro.nome}.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome do Funcionário *</label><input type="text" name="nome" defaultValue={registro.nome} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-black text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês de Referência *</label><input type="text" name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data Início</label><input type="date" name="dataInicio" defaultValue={dataFormatada} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold text-slate-800" /></div>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-end border-b border-slate-100 pb-2">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><CalendarDays className="h-5 w-5 text-indigo-500" /> Grelha de 31 Dias</h2>
             <p className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-md">Total Atual: R$ {registro.totalGeral.toFixed(2)}</p>
           </div>
           
           <div className="overflow-x-auto border border-slate-200 rounded-2xl">
             <table className="w-full text-left border-collapse min-w-[1000px]">
               <thead>
                 <tr className="bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest">
                   <th className="p-3 w-16 text-center border-r border-slate-200">Dia</th>
                   <th className="p-3 w-32 border-r border-slate-200">Status</th>
                   <th className="p-3 border-r border-slate-200">VT (Transporte)</th>
                   <th className="p-3 border-r border-slate-200">VA (Alimentação)</th>
                   <th className="p-3 border-r border-slate-200">Salário Dia</th>
                   <th className="p-3 border-r border-slate-200">Férias</th>
                   <th className="p-3">13º Dia</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200 bg-white">
                 {Array.from({ length: 31 }).map((_, index) => {
                   const dia = index + 1;
                   // Procurar os dados do dia específico no JSON
                   const dadosDoDia = diasSalvos.find((d: any) => d.dia === dia) || {};

                   return (
                     <tr key={dia} className="hover:bg-indigo-50/30 transition-colors group">
                       <td className="p-2 text-center font-black text-slate-400 border-r border-slate-200 group-hover:text-indigo-600">{dia}</td>
                       <td className="p-2 border-r border-slate-200">
                         <select name={`d${dia}_status`} defaultValue={dadosDoDia.status || 'P'} className="w-full px-2 py-1.5 text-[11px] font-bold bg-slate-50 border border-slate-200 rounded outline-none focus:border-indigo-500 text-slate-700 cursor-pointer">
                           <option value="P">Presente</option>
                           <option value="F">Falta (Desconta)</option>
                           <option value="ME">Meio Expediente</option>
                           <option value="DSR">DSR / Folga</option>
                         </select>
                       </td>
                       <td className="p-2 border-r border-slate-200"><InputMoeda name={`d${dia}_vt`} defaultValue={dadosDoDia.vt} className="py-1 text-xs font-bold focus:border-indigo-500 rounded bg-slate-50 border border-slate-200" /></td>
                       <td className="p-2 border-r border-slate-200"><InputMoeda name={`d${dia}_va`} defaultValue={dadosDoDia.va} className="py-1 text-xs font-bold focus:border-indigo-500 rounded bg-slate-50 border border-slate-200" /></td>
                       <td className="p-2 border-r border-slate-200"><InputMoeda name={`d${dia}_sal`} defaultValue={dadosDoDia.sal} className="py-1 text-xs font-bold text-indigo-700 focus:border-indigo-500 rounded bg-indigo-50/50 border border-indigo-100" /></td>
                       <td className="p-2 border-r border-slate-200"><InputMoeda name={`d${dia}_fer`} defaultValue={dadosDoDia.fer} className="py-1 text-xs font-bold focus:border-emerald-500 rounded bg-slate-50 border border-slate-200" /></td>
                       <td className="p-2"><InputMoeda name={`d${dia}_d13`} defaultValue={dadosDoDia.d13} className="py-1 text-xs font-bold focus:border-amber-500 rounded bg-slate-50 border border-slate-200" /></td>
                     </tr>
                   )
                 })}
               </tbody>
             </table>
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Guardar e Recalcular" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}