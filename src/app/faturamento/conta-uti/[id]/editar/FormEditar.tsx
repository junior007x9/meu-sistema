"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Activity } from 'lucide-react';
import { atualizarContaUti } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const [pix, setPix] = useState(registro.pix);
  const [credito, setCredito] = useState(registro.credito);
  const [debito, setDebito] = useState(registro.debito);
  const [saida, setSaida] = useState(registro.saida);

  const total = (pix + credito + debito) - saida;
  const actionAtualizar = atualizarContaUti.bind(null, registro.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/conta-uti" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Conta UTI</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Corrija as movimentações do dia na UTI.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Data *</label><input type="date" name="data" defaultValue={registro.data} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00bdf2] font-semibold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Mês Base *</label>
             <select name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00bdf2] font-semibold text-slate-800">
               <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
               <option value="JULHO">JULHO</option><option value="AGOSTO">AGOSTO</option>
               <option value="SETEMBRO">SETEMBRO</option><option value="OUTUBRO">OUTUBRO</option>
               <option value="NOVEMBRO">NOVEMBRO</option><option value="DEZEMBRO">DEZEMBRO</option>
             </select>
          </div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">Ano Base *</label><input type="text" name="anoBase" defaultValue={registro.anoBase} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00bdf2] font-semibold text-slate-800" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Activity className="h-4 w-4 text-[#00bdf2]" /> Entradas (R$)</h2>
             <div className="space-y-4">
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">PIX</label><input type="number" step="0.01" name="pix" value={pix} onChange={e => setPix(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00bdf2] font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Cartão Crédito</label><input type="number" step="0.01" name="credito" value={credito} onChange={e => setCredito(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00bdf2] font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Cartão Débito</label><input type="number" step="0.01" name="debito" value={debito} onChange={e => setDebito(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00bdf2] font-bold text-slate-800" /></div>
             </div>
          </div>
          <div className="space-y-6">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Saídas</h2>
             <div className="space-y-1.5"><label className="text-xs font-bold text-red-600 uppercase ml-1">Saída Diária (R$)</label><input type="number" step="0.01" name="saida" value={saida} onChange={e => setSaida(Number(e.target.value))} className="w-full px-4 py-4 bg-red-50/30 border border-red-200 rounded-xl outline-none focus:border-red-500 font-black text-red-700 text-lg" /></div>
             <div className="bg-[#e6f9fd] border border-[#00bdf2]/30 p-6 rounded-2xl flex flex-col justify-center mt-4"><span className="text-[10px] uppercase font-black tracking-widest text-[#007090] mb-1">Total Diário Atualizado</span><span className="text-4xl font-black text-[#003848]">R$ {total.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100"><BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="blue" /></div>
      </form>
    </div>
  );
}