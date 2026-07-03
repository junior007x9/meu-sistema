"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Calculator } from 'lucide-react';
import { salvarFaturamentoDiario } from '@/actions/faturamento';

export default function NovoFaturamentoDiarioPage() {
  const [especie, setEspecie] = useState(0);
  const [credito, setCredito] = useState(0);
  const [debito, setDebito] = useState(0);
  const [pix, setPix] = useState(0);
  const [saidaDinheiro, setSaidaDinheiro] = useState(0);
  const [dizimo, setDizimo] = useState(0);

  // Cálculos Automáticos
  const total = especie + credito + debito + pix;
  const fatEspecie = especie - saidaDinheiro;

  // Sugere automaticamente os 10% do Dízimo sempre que o Total muda
  useEffect(() => {
    setDizimo(total * 0.10);
  }, [total]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/diario" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lançamento Diário</h1>
          <p className="text-sm text-slate-500 font-medium">Controle de caixa, vendas e dízimo.</p>
        </div>
      </div>

      <form action={salvarFaturamentoDiario} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        {/* IDENTIFICAÇÃO E COMPRA */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data *</label>
             <input type="date" name="data" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded outline-none font-bold text-slate-800" />
          </div>
          <div>
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mês Base *</label>
             <select name="mesReferencia" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded outline-none font-bold">
               <option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option>
               <option value="JUNHO">JUNHO</option>
               {/* Adicione os outros meses se quiser */}
             </select>
          </div>
          <div className="md:col-span-2">
             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vendas / Serviços *</label>
             <input type="text" name="descricao" placeholder="Ex: Fechamento de Vendas" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded outline-none font-bold text-slate-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ENTRADAS (Pagamentos) */}
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b pb-2">Entradas (Forma de Pagamento)</h2>
             
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">R$ Espécie</label>
                  <input type="number" step="0.01" name="especie" value={especie || ''} onChange={e => setEspecie(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">R$ PIX</label>
                  <input type="number" step="0.01" name="pix" value={pix || ''} onChange={e => setPix(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cartão Crédito</label>
                  <input type="number" step="0.01" name="credito" value={credito || ''} onChange={e => setCredito(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Cartão Débito</label>
                  <input type="number" step="0.01" name="debito" value={debito || ''} onChange={e => setDebito(Number(e.target.value))} className="w-full px-4 py-2 border rounded font-bold text-slate-800" />
                </div>
             </div>

             <div className="bg-[#eaf1dd] border border-[#c2d69b] p-3 rounded-lg flex justify-between items-center mt-2">
                <span className="font-black text-green-900 uppercase text-xs">Total Recebido (Bruto):</span>
                <span className="text-xl font-black text-green-900">R$ {total.toFixed(2)}</span>
             </div>
          </div>

          {/* SAÍDAS E DÍZIMO */}
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b pb-2">Custos, Saídas e Dízimo</h2>
             
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">R$ Compra (Mercadoria)</label>
                  <input type="number" step="0.01" name="compra" className="w-full px-4 py-2 border rounded font-bold text-orange-700 bg-orange-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Saída Pgto (PIX)</label>
                  <input type="number" step="0.01" name="saidaPix" className="w-full px-4 py-2 border border-red-300 rounded font-bold text-red-700 bg-red-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Saída Pgto (Espécie)</label>
                  <input type="number" step="0.01" name="saidaDinheiro" value={saidaDinheiro || ''} onChange={e => setSaidaDinheiro(Number(e.target.value))} className="w-full px-4 py-2 border border-red-300 rounded font-bold text-red-700 bg-red-50" />
                </div>
                <div>
                  <label className="block text-xs font-black text-green-700 uppercase mb-1 flex items-center gap-1"><Calculator className="w-3 h-3"/> Dízimo (10%)</label>
                  {/* Este campo preenche sozinho, mas permite edição manual! */}
                  <input type="number" step="0.01" name="dizimo" value={dizimo || ''} onChange={e => setDizimo(Number(e.target.value))} className="w-full px-4 py-2 border border-green-300 rounded font-black text-green-800 bg-green-50" />
                </div>
             </div>

             <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex justify-between items-center mt-2">
                <span className="font-black text-blue-900 uppercase text-xs">Fat. Diário (Espécie):</span>
                <span className="text-xl font-black text-blue-900">R$ {fatEspecie.toFixed(2)}</span>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 mt-6">
          <button type="submit" className="bg-slate-900 hover:bg-slate-800 px-10 py-3.5 rounded-xl font-black text-white shadow-md transition-transform hover:-translate-y-0.5">
            <Save className="h-5 w-5 inline mr-2"/> Fechar Caixa do Dia
          </button>
        </div>
      </form>
    </div>
  );
}