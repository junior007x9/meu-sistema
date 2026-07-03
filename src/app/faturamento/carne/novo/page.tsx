"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { salvarCarne } from '@/actions/faturamento';

export default function NovoCarnePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/carne" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Novo Carnê</h1>
          <p className="text-sm text-slate-500 font-medium">Cadastre um novo plano de pagamento em carnê.</p>
        </div>
      </div>

      <form action={salvarCarne} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        {/* IDENTIFICAÇÃO DO CARNÊ */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b pb-2">
            <BookOpen className="h-5 w-5 text-yellow-500" /> Dados do Cliente e da Venda
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ano Base *</label>
              <input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-2.5 bg-yellow-50 border border-yellow-300 rounded outline-none font-black text-yellow-900 text-center" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Cliente *</label>
              <input type="text" name="cliente" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded outline-none font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contato / Telefone</label>
              <input type="text" name="contato" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data da Compra *</label>
              <input type="date" name="dataCompra" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded outline-none font-bold text-slate-600" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Valor Venda (R$) *</label>
              <input type="number" step="0.01" name="valorVenda" required className="w-full px-4 py-2.5 border border-blue-300 bg-blue-50 rounded font-black text-blue-800 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Entrada (R$)</label>
              <input type="number" step="0.01" name="valorEntrada" className="w-full px-4 py-2.5 border border-green-300 bg-green-50 rounded font-black text-green-800 outline-none" />
            </div>
          </div>
        </div>

        {/* GRADE DE PARCELAS */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 border-b pb-2">
            Plano de Parcelamento (Até 10x)
          </h2>
          <p className="text-xs text-slate-500 font-bold mb-4">Preencha apenas as parcelas que vão ser geradas para este carnê.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm hover:border-yellow-400 transition-colors">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-2 border-b border-slate-200 pb-1">Parcela {i + 1}</div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Valor (R$)</label>
                    <input type="number" step="0.01" name={`p${i + 1}Valor`} className="w-full px-2 py-1.5 border border-slate-300 rounded font-bold text-sm text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Data Pgto</label>
                    <input type="date" name={`p${i + 1}Data`} className="w-full px-2 py-1.5 border border-slate-300 rounded font-medium text-xs text-slate-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-200">
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-10 py-3.5 rounded-xl font-black text-slate-900 shadow-md transition-transform hover:-translate-y-0.5">
            <Save className="h-5 w-5 inline mr-2"/> Gravar Carnê
          </button>
        </div>
      </form>
    </div>
  );
}