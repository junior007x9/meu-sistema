"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Save, Glasses, Percentage, TrendingUp } from 'lucide-react';
import { salvarSimulacao } from '@/actions/simulacoes';

export default function NovaSimulacaoPage() {
  const [custo, setCusto] = useState<number>(0);
  const [tabela, setTabela] = useState<number>(0);
  const [taxa, setTaxa] = useState<number>(10); // Sugestão inicial de 10% da maquininha

  // Cálculos reativos
  const parcela = tabela / 6;
  const desconto = tabela * (taxa / 100);
  const diferenca = tabela - desconto;
  const ganho = diferenca - custo;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/simulacoes" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Simulador de Valores</h1>
          <p className="text-sm text-slate-500 font-medium">Calcule margens de lucro, parcelas e taxas de cartão.</p>
        </div>
      </div>

      <form action={salvarSimulacao} className="space-y-6">
        
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Glasses className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Lente e Cliente</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Marca da Lente *</label>
              <input type="text" name="marcaLente" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" placeholder="Ex: Varilux, Hoya..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Cliente (Opcional)</label>
              <input type="text" name="cliente" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium" placeholder="Nome do cliente simulado" />
            </div>
          </div>
        </div>

        {/* ÁREA DA CALCULADORA */}
        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-8">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
            <Calculator className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Painel de Cálculo</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Custo da Lente (R$)</label>
              <input type="number" step="0.01" name="custoLente" value={custo || ''} onChange={(e) => setCusto(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg outline-none focus:border-yellow-500 font-black text-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Valor da Tabela (R$)</label>
              <input type="number" step="0.01" name="valorTabela" value={tabela || ''} onChange={(e) => setTabela(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg outline-none focus:border-yellow-500 font-black text-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Taxa Cartão em 6x (%)</label>
              <div className="relative">
                <input type="number" step="0.01" name="taxaCartao" value={taxa || ''} onChange={(e) => setTaxa(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-yellow-500 rounded-lg outline-none focus:border-yellow-500 font-black text-lg" />
                <Percentage className="absolute right-4 top-3.5 h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* RESULTADOS REATIVOS */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Parcela em 6x</p>
              <p className="text-xl font-black text-white">R$ {parcela.toFixed(2).replace('.', ',')}</p>
            </div>
            <div>
              <p className="text-[10px] text-red-400 font-bold uppercase mb-1">Desconto Cartão (Perda)</p>
              <p className="text-xl font-black text-red-400">- R$ {desconto.toFixed(2).replace('.', ',')}</p>
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Diferença (Valor Líquido)</p>
              <p className="text-xl font-black text-blue-400">R$ {diferenca.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="border-l-2 border-yellow-500/30 pl-4">
              <p className="text-[10px] text-yellow-500 font-bold uppercase mb-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Lucro (Ganho)</p>
              <p className="text-2xl font-black text-yellow-500">R$ {ganho.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-10">
          <Link href="/simulacoes" className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-3 rounded-lg font-bold shadow-md transition-transform hover:scale-105">
            <Save className="h-5 w-5" /> Salvar Simulação
          </button>
        </div>
      </form>
    </div>
  );
}