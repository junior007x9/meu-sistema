"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, UserMinus } from 'lucide-react';
import { atualizarDevedorUti } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';

export default function FormEditar({ registro }: { registro: any }) {
  const actionAtualizar = atualizarDevedorUti.bind(null, registro.id);
  const dataFormatada = registro.data ? new Date(registro.data).toISOString().split('T')[0] : '';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/devedores-uti" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Atualizar Dívida</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Marque como pago ou corrija os valores desta pendência.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label><input type="date" name="data" defaultValue={dataFormatada} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Cliente / Ótica *</label><input type="text" name="cliente" defaultValue={registro.cliente} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Contato</label><input type="text" name="contato" defaultValue={registro.contato} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-700 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Serviço Realizado *</label><input type="text" name="servicos" defaultValue={registro.servicos} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-rose-600 uppercase ml-1">Valor a Receber</label>
            <InputMoeda name="valor" defaultValue={registro.valor} className="py-3 border border-rose-200 focus:border-rose-500 font-black text-rose-800 text-lg" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Dívida Paga? *</label>
            <select name="pago" defaultValue={registro.pago} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-black text-slate-700 cursor-pointer">
              <option value="NÃO">NÃO (Pendente)</option>
              <option value="SIM">SIM (Já foi pago)</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Guardar Alterações" icone={<Save className="h-5 w-5" />} cor="rose" />
        </div>
      </form>
    </div>
  );
}