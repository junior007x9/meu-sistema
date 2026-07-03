"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Handshake } from 'lucide-react';
import { salvarServicoIndicado } from '@/actions/faturamento';

export default function NovoServicoIndicadoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/servicos-indicados" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Nova Indicação</h1>
          <p className="text-sm text-slate-500 font-medium">Lançamento de serviço indicado por ótica parceira.</p>
        </div>
      </div>

      <form action={salvarServicoIndicado} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        
        <div className="flex items-center gap-2 mb-2 border-b pb-3">
          <Handshake className="h-5 w-5 text-indigo-600" />
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Detalhes da Parceria</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Quem Indicou *</label>
            <input type="text" name="quemIndicou" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contatos (Telefone)</label>
            <input type="text" name="contatos" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-medium focus:ring-2 focus:ring-indigo-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Serviço Realizado *</label>
            <input type="text" name="servico" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-medium focus:ring-2 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Serviço Pago? *</label>
            <select name="servicoPago" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-black text-slate-700 focus:ring-2 focus:ring-indigo-600">
               <option value="NÃO">NÃO</option>
               <option value="SIM">SIM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Valor do Serviço (R$) *</label>
            <input type="number" step="0.01" name="valor" required className="w-full px-4 py-3 border border-blue-300 bg-blue-50 rounded-lg font-black text-blue-800 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Valor Devido (R$) *</label>
            <input type="number" step="0.01" name="valorDevido" required className="w-full px-4 py-3 border border-red-300 bg-red-50 rounded-lg font-black text-red-700 outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data *</label>
            <input type="date" name="data" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold focus:ring-2 focus:ring-indigo-600" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 mt-6">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3.5 rounded-xl font-black text-white shadow-md transition-transform hover:-translate-y-0.5">
            <Save className="h-5 w-5 inline mr-2"/> Gravar Indicação
          </button>
        </div>
      </form>
    </div>
  );
}