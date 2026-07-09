"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, PackagePlus, Calculator, Truck, Tag } from 'lucide-react';
import { salvarProduto } from '@/actions/produtos';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function NovoProdutoPage() {
  const [precoCusto, setPrecoCusto] = useState<number>(0);
  const [precoVenda, setPrecoVenda] = useState<number>(0);

  // Cálculos automáticos de lucro em tempo real
  const lucro = precoVenda - precoCusto;
  const margem = precoVenda > 0 ? (lucro / precoVenda) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/produtos" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Adicionar Produto</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Cadastre uma nova armação, lente ou acessório no estoque.</p>
        </div>
      </div>

      <form action={salvarProduto} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* INFORMAÇÕES BÁSICAS */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><PackagePlus className="h-5 w-5 text-teal-600" /> Detalhes do Produto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome / Descrição *</label>
              <input type="text" name="nome" required placeholder="Ex: Armação Ray-Ban Hexagonal" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-800 uppercase" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Código (SKU)</label>
              <input type="text" name="codigo" placeholder="Ex: RB-3548" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-slate-700 uppercase" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Categoria *</label>
              <select name="categoria" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-700 cursor-pointer appearance-none">
                <option value="ARMAÇÃO">ARMAÇÃO</option>
                <option value="LENTE">LENTE</option>
                <option value="ÓCULOS DE SOL">ÓCULOS DE SOL</option>
                <option value="ACESSÓRIO">ACESSÓRIO</option>
                <option value="OUTROS">OUTROS</option>
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Fornecedor / Representante</label>
              <input type="text" name="fornecedor" placeholder="Ex: Luxottica / Representante João" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-slate-700 uppercase" />
            </div>
          </div>
        </div>

        {/* VALORES E ESTOQUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Tag className="h-5 w-5 text-emerald-600" /> Custos e Estoque</h2>
             <div className="grid grid-cols-2 gap-4 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-800 uppercase ml-1">Preço de Custo (R$)</label>
                  <input type="number" step="0.01" name="precoCusto" value={precoCusto || ''} onChange={e => setPrecoCusto(Number(e.target.value))} className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-emerald-900 transition-colors" placeholder="0.00" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-800 uppercase ml-1">Qtd. em Estoque *</label>
                  <input type="number" name="estoque" required defaultValue="1" className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 font-black text-emerald-900 transition-colors" />
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Calculator className="h-5 w-5 text-blue-600" /> Venda e Lucro</h2>
             <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-blue-800 uppercase ml-1">Preço Venda (R$) *</label>
                    <input type="number" step="0.01" name="precoVenda" required value={precoVenda || ''} onChange={e => setPrecoVenda(Number(e.target.value))} className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-black text-blue-900 text-lg transition-colors" placeholder="0.00" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-blue-800 uppercase ml-1">Desconto Máx (%)</label>
                    <input type="number" step="0.01" name="porcentagemDesconto" defaultValue="0" className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-bold text-blue-800 transition-colors" />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <div className="flex-1 bg-white border border-blue-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Lucro Bruto</span>
                    <span className={`font-black ${lucro >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>R$ {lucro.toFixed(2)}</span>
                  </div>
                  <div className="flex-1 bg-white border border-blue-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Margem</span>
                    <span className={`font-black ${margem >= 0 ? 'text-blue-600' : 'text-red-500'}`}>{margem.toFixed(1)}%</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Produto" icone={<Save className="h-5 w-5" />} cor="emerald" />
        </div>
      </form>
    </div>
  );
}