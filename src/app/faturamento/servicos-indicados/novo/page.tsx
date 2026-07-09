"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Handshake } from 'lucide-react';
import { salvarServicoIndicado } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function NovoServicoIndicadoPage() {
  const dataHoje = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/servicos-indicados" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Registar Indicação</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Gira os valores e comissões de parceiros que enviaram clientes.</p>
        </div>
      </div>

      <form action={salvarServicoIndicado} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label><input type="date" name="data" defaultValue={dataHoje} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Quem Indicou? *</label><input type="text" name="quemIndicou" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Contatos do Cliente</label><input type="text" name="contatos" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold text-slate-700 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Serviço Executado *</label><input type="text" name="servico" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold text-slate-800 uppercase" /></div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Valor Total (Venda)</label>
            <InputMoeda name="valor" className="py-3 border border-slate-200 focus:border-indigo-500 font-bold text-slate-800" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-indigo-600 uppercase ml-1 flex items-center">Comissão Devida <InfoAjuda texto="Quanto você vai repassar ao parceiro."/></label>
            <InputMoeda name="valorDevido" className="py-3 border border-indigo-200 focus:border-indigo-500 font-black text-indigo-800 text-lg" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Comissão Já Foi Paga? *</label>
            <select name="servicoPago" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-black text-slate-700 cursor-pointer">
              <option value="NÃO">NÃO (Aguardando Pagamento ao Parceiro)</option>
              <option value="SIM">SIM (Comissão já paga)</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Indicação" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}