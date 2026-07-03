"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, UserMinus } from 'lucide-react';
import { salvarDevedorUti } from '@/actions/faturamento';

export default function NovoDevedorUtiPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/devedores-uti" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Novo Cliente Devedor</h1>
          <p className="text-sm text-slate-500 font-medium">Lançamento de dívida na UTI dos Óculos.</p>
        </div>
      </div>

      <form action={salvarDevedorUti} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        
        <div className="flex items-center gap-2 mb-2 border-b pb-3">
          <UserMinus className="h-5 w-5 text-red-500" />
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informações da Dívida</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cliente Devedor *</label>
            <input type="text" name="cliente" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold text-slate-900 focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contato / WhatsApp</label>
            <input type="text" name="contato" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-medium focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Serviços Realizados *</label>
          <input type="text" name="servicos" placeholder="Ex: Solda, Troca de plaquetas..." required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-medium focus:ring-2 focus:ring-red-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Valor Devido (R$) *</label>
            <input type="number" step="0.01" name="valor" required className="w-full px-4 py-3 border border-red-300 bg-red-50 rounded-lg font-black text-red-700 outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data *</label>
            <input type="date" name="data" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-bold focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Já Foi Pago? *</label>
            <select name="pago" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-black text-slate-700 focus:ring-2 focus:ring-red-500">
               <option value="NÃO">NÃO (Pendente)</option>
               <option value="SIM">SIM (Pago)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 mt-6">
          <button type="submit" className="bg-red-600 hover:bg-red-700 px-8 py-3.5 rounded-xl font-black text-white shadow-md transition-transform hover:-translate-y-0.5">
            <Save className="h-5 w-5 inline mr-2"/> Gravar Dívida
          </button>
        </div>
      </form>
    </div>
  );
}