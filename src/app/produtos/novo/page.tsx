"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, PackagePlus, Calculator, Truck, Tag } from 'lucide-react';
import { criarProduto } from '@/actions/produtos';

export default function NovoProdutoPage() {
  // Estados para os cálculos em tempo real
  const [custoUnt, setCustoUnt] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [valorVenda, setValorVenda] = useState<number>(0);
  const [porcentagem, setPorcentagem] = useState<number>(0);

  // A inteligência: O sistema calcula sozinho!
  const valorTotalCusto = custoUnt * quantidade;
  const valorComDesconto = valorVenda - (valorVenda * (porcentagem / 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/produtos" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Entrada de Mercadoria</h1>
          <p className="text-sm text-slate-500 font-medium">Cadastro de Fornecedores e Precificação Automática.</p>
        </div>
      </div>

      <form action={criarProduto} className="space-y-6">
        
        {/* BLOCO 1: PRODUTO E FORNECEDOR */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Truck className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Fornecedor & Produto</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-12">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Fornecedor / Representante *</label>
              <input type="text" name="fornecedor" required className="w-full px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-amber-900" placeholder="Ex: REPRESENTANTE - ARMAÇÃO E CIA" />
            </div>
            
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Descrição do Produto *</label>
              <input type="text" name="nome" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" placeholder="Ex: ARMAÇÃO FEMININA 100% NYLON" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Código</label>
              <input type="text" name="codigo" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium" placeholder="Ex: 68312" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Categoria *</label>
              <select name="categoria" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                <option value="Armação">Armação</option>
                <option value="Lente">Lente</option>
                <option value="Bolsa">Bolsa</option>
                <option value="Chapéu">Chapéu</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>
        </div>

        {/* BLOCO 2: CUSTOS E PRECIFICAÇÃO (A Calculadora) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Calculator className="h-5 w-5 text-emerald-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Custos, Venda e Descontos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Lado Esquerdo: A Compra (Custo) */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Entrada de Estoque</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Valor Unt. (R$)</label>
                    <input type="number" step="0.01" name="precoCusto" value={custoUnt || ''} onChange={(e) => setCustoUnt(Number(e.target.value))} required className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium" placeholder="38,00" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Quant. (Estoque)</label>
                    <input type="number" name="estoque" value={quantidade || ''} onChange={(e) => setQuantidade(Number(e.target.value))} required className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium" placeholder="2" />
                 </div>
               </div>
               <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500">VALOR TOTAL:</span>
                  <span className="text-xl font-black text-slate-800">R$ {valorTotalCusto.toFixed(2).replace('.', ',')}</span>
               </div>
            </div>

            {/* Lado Direito: A Venda (Desconto) */}
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 space-y-4">
               <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Precificação Final</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1 uppercase">Valor Venda (R$)</label>
                    <input type="number" step="0.01" name="precoVenda" value={valorVenda || ''} onChange={(e) => setValorVenda(Number(e.target.value))} required className="w-full px-4 py-2.5 border border-emerald-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-emerald-900" placeholder="290,00" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-emerald-800 mb-1 uppercase">Desconto (%)</label>
                    <div className="relative">
                      <input type="number" step="0.01" name="porcentagemDesconto" value={porcentagem || ''} onChange={(e) => setPorcentagem(Number(e.target.value))} required className="w-full px-4 py-2.5 border border-emerald-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-900" placeholder="10" />
                      <span className="absolute right-4 top-2.5 font-bold text-emerald-500">%</span>
                    </div>
                 </div>
               </div>
               <div className="pt-3 border-t border-emerald-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-emerald-700">R$ COM DESCONTO:</span>
                  <span className="text-2xl font-black text-emerald-600">R$ {valorComDesconto.toFixed(2).replace('.', ',')}</span>
               </div>
            </div>

          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-4 pb-12">
          <Link href="/produtos" className="px-8 py-3.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1">
            <Save className="h-6 w-6" /> Salvar no Estoque
          </button>
        </div>

      </form>
    </div>
  );
}