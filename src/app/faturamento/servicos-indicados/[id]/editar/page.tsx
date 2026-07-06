"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, UserMinus } from 'lucide-react';
import { atualizarDevedorUti } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const actionAtualizar = atualizarDevedorUti.bind(null, registro.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/devedores-uti" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Cliente Devedor</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize os dados e o status de pagamento da dívida.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3"><UserMinus className="h-5 w-5 text-red-500" /><h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informações da Dívida</h2></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome do Cliente Devedor *</label><input type="text" name="cliente" defaultValue={registro.cliente} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-black uppercase text-slate-900" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Telemóvel / WhatsApp de Contato</label><input type="text" name="contato" defaultValue={registro.contato} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-slate-700" /></div>
        </div>

        <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Serviços Realizados na UTI *</label><input type="text" name="servicos" defaultValue={registro.servicos} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium text-slate-700" /></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-red-600 uppercase ml-1">Valor Devido (R$) *</label><input type="number" step="0.01" name="valor" defaultValue={registro.valor} required className="w-full px-4 py-3 border border-red-200 bg-white rounded-xl font-black text-red-700 text-lg outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data do Lançamento *</label><input type="date" name="data" defaultValue={registro.data} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-bold text-slate-800" /></div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Status do Pagamento *</label>
            <select name="pago" defaultValue={registro.pago} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-black text-slate-700 cursor-pointer appearance-none">
               <option value="NÃO">NÃO (Pendente)</option>
               <option value="SIM">SIM (Liquidado)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6"><BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="rose" /></div>
      </form>
    </div>
  );
}