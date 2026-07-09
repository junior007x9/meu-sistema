"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, BookOpen, Calculator } from 'lucide-react';
import { salvarCarne } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function NovoCarnePage() {
  const dataHoje = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/carne" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Emitir Carnê</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Gere a venda em até 10 parcelas no carnê para o cliente.</p>
        </div>
      </div>

      <form action={salvarCarne} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* DADOS PRINCIPAIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome do Cliente *</label><input type="text" name="cliente" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Contato (Telefone)</label><input type="text" name="contato" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-medium text-slate-700 uppercase" /></div>
          
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data da Compra *</label><input type="date" name="dataCompra" defaultValue={dataHoje} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-bold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Ano Base *</label><input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-bold text-slate-800" /></div>
          
          <div className="space-y-1.5"><label className="text-xs font-bold text-amber-600 uppercase ml-1 flex items-center">Valor Total da Venda * <InfoAjuda texto="Ex: 500,00" /></label><InputMoeda name="valorVenda" required className="py-3 bg-white border border-amber-200 focus:border-amber-500 font-black text-amber-900" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-emerald-600 uppercase ml-1 flex items-center">Valor da Entrada <InfoAjuda texto="Dinheiro dado no ato da compra." /></label><InputMoeda name="valorEntrada" className="py-3 bg-white border border-emerald-200 focus:border-emerald-500 font-black text-emerald-900" /></div>
        </div>

        {/* AS 10 PARCELAS GERADAS AUTOMATICAMENTE */}
        <div className="space-y-4">
           <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><BookOpen className="h-5 w-5 text-amber-500" /> Planeamento das Parcelas</h2>
           <p className="text-xs text-slate-500">Deixe em branco as parcelas que não forem utilizadas.</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
             {Array.from({ length: 10 }).map((_, index) => {
               const i = index + 1;
               return (
                 <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3 shadow-sm hover:border-amber-300 transition-colors">
                   <h3 className="text-[10px] font-black uppercase text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded w-fit">{i}ª Parcela</h3>
                   <div><label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Valor Pago (R$)</label><InputMoeda name={`p${i}Valor`} className="py-2 text-sm font-bold text-slate-800 focus:border-amber-500" /></div>
                   <div><label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Data Pagamento</label><input type="date" name={`p${i}Data`} className="w-full px-2 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg outline-none focus:border-amber-500 text-slate-700" /></div>
                 </div>
               )
             })}
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Gerar Carnê" icone={<Save className="h-5 w-5" />} cor="amber" />
        </div>
      </form>
    </div>
  );
}