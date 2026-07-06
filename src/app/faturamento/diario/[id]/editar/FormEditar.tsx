"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, CalendarDays } from 'lucide-react';
import { atualizarDiario } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const [especie, setEspecie] = useState(registro.especie);
  const [credito, setCredito] = useState(registro.credito);
  const [debito, setDebito] = useState(registro.debito);
  const [pix, setPix] = useState(registro.pix);
  const total = especie + credito + debito + pix;

  const actionAtualizar = atualizarDiario.bind(null, registro.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/diario" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Faturamento Diário</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize as vendas ou saídas de caixa deste dia.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CalendarDays className="h-4 w-4 text-indigo-600" /> Informações Iniciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label><input type="date" name="data" defaultValue={registro.data} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 font-bold text-slate-800" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês Base *</label>
               <select name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 font-bold text-slate-800 appearance-none cursor-pointer">
                 <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option>
                 <option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option>
                 <option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
                 <option value="JULHO">JULHO</option><option value="AGOSTO">AGOSTO</option>
                 <option value="SETEMBRO">SETEMBRO</option><option value="OUTUBRO">OUTUBRO</option>
                 <option value="NOVEMBRO">NOVEMBRO</option><option value="DEZEMBRO">DEZEMBRO</option>
               </select>
            </div>
            <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Descrição Breve das Vendas / Serviços *</label><input type="text" name="descricao" defaultValue={registro.descricao} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 font-medium text-slate-700 uppercase" /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Entradas do Dia</h3>
            <div className="grid grid-cols-2 gap-4">
               <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">R$ Espécie</label><input type="number" step="0.01" name="especie" value={especie} onChange={e => setEspecie(Number(e.target.value))} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold text-slate-800" /></div>
               <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cartão Crédito</label><input type="number" step="0.01" name="credito" value={credito} onChange={e => setCredito(Number(e.target.value))} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold text-slate-800" /></div>
               <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cartão Débito</label><input type="number" step="0.01" name="debito" value={debito} onChange={e => setDebito(Number(e.target.value))} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold text-slate-800" /></div>
               <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">PIX</label><input type="number" step="0.01" name="pix" value={pix} onChange={e => setPix(Number(e.target.value))} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold text-slate-800" /></div>
            </div>
            <div className="mt-4 p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl flex justify-between items-center"><span className="text-xs font-black text-emerald-800 uppercase tracking-widest">Total Bruto</span><span className="text-xl font-black text-emerald-950">R$ {total.toFixed(2)}</span></div>
          </div>

          <div className="space-y-4">
             <div className="bg-orange-50/30 p-5 rounded-2xl border border-orange-100"><label className="block text-xs font-bold text-orange-700 uppercase mb-1">Total em Compras (R$)</label><input type="number" step="0.01" name="compra" defaultValue={registro.compra} className="w-full px-4 py-2.5 bg-white border border-orange-200 rounded-lg outline-none focus:border-orange-500 font-bold text-orange-800" /></div>
             <div className="grid grid-cols-2 gap-4 bg-red-50/30 p-5 rounded-2xl border border-red-100">
               <div><label className="block text-xs font-bold text-red-700 uppercase mb-1">Saída (R$)</label><input type="number" step="0.01" name="saidaDinheiro" defaultValue={registro.saidaDinheiro} className="w-full px-4 py-2.5 bg-white border border-red-200 rounded-lg outline-none focus:border-red-500 font-bold text-red-800" /></div>
               <div><label className="block text-xs font-bold text-red-700 uppercase mb-1">Saída (PIX)</label><input type="number" step="0.01" name="saidaPix" defaultValue={registro.saidaPix} className="w-full px-4 py-2.5 bg-white border border-red-200 rounded-lg outline-none focus:border-red-500 font-bold text-red-800" /></div>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-2">
               <div><label className="block text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Dízimo (R$)</label><input type="number" step="0.01" name="dizimo" defaultValue={registro.dizimo} className="w-full px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg outline-none focus:border-green-500 font-bold text-green-800" /></div>
               <div><label className="block text-[10px] font-black text-blue-700 uppercase tracking-widest mb-1">Fat. Espécie (R$)</label><input type="number" step="0.01" name="fatEspecie" defaultValue={registro.fatEspecie} className="w-full px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg outline-none focus:border-blue-500 font-bold text-blue-800" /></div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100"><BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="slate" /></div>
      </form>
    </div>
  );
}