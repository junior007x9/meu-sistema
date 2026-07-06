"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Wrench } from 'lucide-react';
import { atualizarServicoJoaozinho } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const [mValor, setMValor] = useState(registro.montagemValor);
  const [tValor, setTValor] = useState(registro.transposicaoValor);
  const [cValor, setCValor] = useState(registro.coloracaoValor);
  const total = mValor + tValor + cValor;

  const actionAtualizar = atualizarServicoJoaozinho.bind(null, registro.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/joaozinho" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Serviços Joãozinho</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize os valores e informações deste lançamento.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Data *</label>
             <input type="date" name="data" defaultValue={registro.data} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all font-semibold text-slate-800" />
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Mês Base *</label>
             <select name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all font-semibold text-slate-800">
               <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
               <option value="JULHO">JULHO</option><option value="AGOSTO">AGOSTO</option>
               <option value="SETEMBRO">SETEMBRO</option><option value="OUTUBRO">OUTUBRO</option>
               <option value="NOVEMBRO">NOVEMBRO</option><option value="DEZEMBRO">DEZEMBRO</option>
             </select>
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Ano Base *</label>
             <input type="text" name="anoBase" defaultValue={registro.anoBase} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all font-semibold text-slate-800" />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Wrench className="h-4 w-4 text-slate-400" /> Serviços Realizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Montagem</label><input type="text" name="montagem" defaultValue={registro.montagem} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium text-slate-700" /></div>
             <div className="space-y-1.5"><label className="text-xs font-bold text-blue-600 uppercase ml-1">Valor Montagem (R$)</label><input type="number" step="0.01" name="montagemValor" value={mValor} onChange={e => setMValor(Number(e.target.value))} className="w-full px-4 py-3 bg-blue-50/30 border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-black text-blue-700" /></div>
             
             <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Transposição</label><input type="text" name="transposicao" defaultValue={registro.transposicao} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-medium text-slate-700" /></div>
             <div className="space-y-1.5"><label className="text-xs font-bold text-orange-600 uppercase ml-1">Valor Transposição (R$)</label><input type="number" step="0.01" name="transposicaoValor" value={tValor} onChange={e => setTValor(Number(e.target.value))} className="w-full px-4 py-3 bg-orange-50/30 border border-orange-200 rounded-xl outline-none focus:border-orange-500 font-black text-orange-700" /></div>

             <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Coloração</label><input type="text" name="coloracao" defaultValue={registro.coloracao} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium text-slate-700" /></div>
             <div className="space-y-1.5"><label className="text-xs font-bold text-purple-600 uppercase ml-1">Valor Coloração (R$)</label><input type="number" step="0.01" name="coloracaoValor" value={cValor} onChange={e => setCValor(Number(e.target.value))} className="w-full px-4 py-3 bg-purple-50/30 border border-purple-200 rounded-xl outline-none focus:border-purple-500 font-black text-purple-700" /></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
          <div className="bg-emerald-50/50 border border-emerald-200 px-6 py-3 rounded-2xl flex flex-col w-full sm:w-auto"><span className="text-[10px] uppercase font-black tracking-widest text-emerald-600">Total Devido no Lançamento</span><span className="text-2xl font-black text-emerald-900">R$ {total.toFixed(2)}</span></div>
          <BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="slate" />
        </div>
      </form>
    </div>
  );
}