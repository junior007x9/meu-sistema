"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, HeartPulse } from 'lucide-react';
import { salvarBalancoUti } from '@/actions/faturamento';

export default function NovoBalancoUtiPage() {
  const [compras, setCompras] = useState(0);
  const [dinheiro, setDinheiro] = useState(0);
  const [credito, setCredito] = useState(0);
  const [debito, setDebito] = useState(0);
  const [pix, setPix] = useState(0);
  const [saidas, setSaidas] = useState(0);

  const totalEntradas = dinheiro + credito + debito + pix;
  const totalLiquido = totalEntradas - compras - saidas;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/balanco-uti" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Novo Lançamento UTI</h1>
          <p className="text-sm text-slate-500 font-medium">Balanço financeiro diário da UTI dos Óculos.</p>
        </div>
      </div>

      <form action={salvarBalancoUti} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data *</label>
             <input type="date" name="data" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded outline-none font-bold text-slate-800" />
          </div>
          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mês Base *</label>
             <select name="mesReferencia" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded outline-none font-bold">
               <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
             </select>
          </div>
          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ano Base *</label>
             <input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded outline-none font-bold" />
          </div>
          <div>
             <label className="block text-xs font-bold text-orange-700 uppercase mb-1">Total Compras (R$)</label>
             <input type="number" step="0.01" name="compras" value={compras || ''} onChange={e => setCompras(Number(e.target.value))} className="w-full px-4 py-2.5 bg-orange-50 border border-orange-300 rounded outline-none font-black text-orange-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b pb-2">Entradas do Dia (UTI)</h2>
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">R$ Espécie</label>
                  <input type="number" step="0.01" name="entradaDinheiro" value={dinheiro || ''} onChange={e => setDinheiro(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-rose-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cartão Crédito</label>
                  <input type="number" step="0.01" name="entradaCredito" value={credito || ''} onChange={e => setCredito(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-rose-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cartão Débito</label>
                  <input type="number" step="0.01" name="entradaDebito" value={debito || ''} onChange={e => setDebito(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-rose-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">PIX</label>
                  <input type="number" step="0.01" name="entradaPix" value={pix || ''} onChange={e => setPix(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-rose-800" />
                </div>
             </div>
             <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-right">
                <span className="font-black text-rose-900 text-sm">Total Entradas: R$ {totalEntradas.toFixed(2)}</span>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b pb-2">Saídas de Caixa</h2>
             <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Saída Pagamentos (Cartão/PIX)</label>
                <input type="number" step="0.01" name="saidaPagamentos" value={saidas || ''} onChange={e => setSaidas(Number(e.target.value))} className="w-full px-4 py-3 border border-red-300 rounded-lg font-black text-red-800 bg-red-50" />
             </div>
             
             <div className="bg-slate-100 border border-slate-300 p-4 rounded-xl text-center mt-6">
                <p className="text-xs font-black uppercase text-slate-800 mb-1">PREVISÃO DO TOTAL LÍQUIDO</p>
                <h3 className={`text-3xl font-black ${totalLiquido >= 0 ? 'text-rose-700' : 'text-red-600'}`}>
                  R$ {totalLiquido.toFixed(2)}
                </h3>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 mt-6">
          <button type="submit" className="bg-rose-600 hover:bg-rose-700 px-10 py-3.5 rounded-xl font-black text-white shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-2">
            <Save className="h-5 w-5"/> Gravar no Balanço UTI
          </button>
        </div>
      </form>
    </div>
  );
}