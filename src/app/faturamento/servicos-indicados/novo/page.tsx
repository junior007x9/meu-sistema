"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Handshake } from 'lucide-react';
import { salvarServicoIndicado } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function NovoServicoIndicadoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/servicos-indicados" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nova Indicação de Óticas</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Lançamento focado no controle de parcerias e comissões externas.</p>
        </div>
      </div>

      <form action={salvarServicoIndicado} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
        
        <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-3">
          <Handshake className="h-5 w-5 text-indigo-600" />
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Detalhes da Parceria Comercial</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Quem Indicou o Serviço? *</label>
            <input type="text" name="quemIndicou" required placeholder="Ex: Ótica Paris - Filial Centro" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-black text-indigo-950 uppercase" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Contactos da Ótica / Gerente</label>
            <input type="text" name="contatos" placeholder="Ex: Tel / WhatsApp corporativo" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium text-slate-700" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Descrição do Serviço Executado *</label>
            <input type="text" name="servico" placeholder="Ex: Conserto de charneira + polimento de acetato" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-medium text-slate-700" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">O Cliente Já Pagou? *</label>
            <select name="servicoPago" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-black text-slate-700 cursor-pointer appearance-none">
               <option value="NÃO">NÃO</option>
               <option value="SIM">SIM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-blue-600 uppercase ml-1">Valor do Serviço (R$) *</label>
            <input type="number" step="0.01" name="valor" required className="w-full px-4 py-3 border border-blue-200 bg-white rounded-xl font-black text-blue-800 text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="0.00" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-red-600 uppercase ml-1">Valor Devido / Comissão (R$) *</label>
            <input type="number" step="0.01" name="valorDevido" required className="w-full px-4 py-3 border border-red-200 bg-white rounded-xl font-black text-red-700 text-lg outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all" placeholder="0.00" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data da Indicação *</label>
            <input type="date" name="data" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-slate-800" />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
          <button type="submit" className="hidden"/> {/* Fallback sem bugs */}
          <BotaoSubmit texto="Gravar Registro de Indicação" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}