"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ShoppingCart, PackageOpen, CreditCard } from 'lucide-react';
import { criarCompra } from '@/actions/compras';

export default function NovaCompraPage() {
  const [valorUnt, setValorUnt] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const valorTotal = valorUnt * quantidade;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/compras" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Nova Compra Online</h1>
          <p className="text-sm text-slate-500 font-medium">Registro de encomendas da internet.</p>
        </div>
      </div>

      <form action={criarCompra} className="space-y-6">
        
        {/* BLOCO 1: PRODUTO E LOGÍSTICA */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <PackageOpen className="h-5 w-5 text-indigo-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Detalhes do Pedido</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Data da Compra *</label>
              <input type="text" name="dataCompra" placeholder="DD/MM/AAAA" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-medium" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Produto *</label>
              <input type="text" name="produto" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Loja / Site</label>
              <input type="text" name="loja" placeholder="Ex: Mercado Livre, Shopee" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-medium" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nº Rastreio</label>
              <input type="text" name="rastreio" placeholder="Ex: LB123456789HK" className="w-full px-4 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-bold tracking-widest" />
            </div>
          </div>
        </div>

        {/* BLOCO 2: FINANCEIRO E RESPONSÁVEIS */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <CreditCard className="h-5 w-5 text-emerald-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Financeiro</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Quem Comprou?</label>
              <input type="text" name="quemComprou" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Quem Vai Pagar?</label>
              <input type="text" name="quemVaiPagar" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Valor Unt. (R$)</label>
              <input type="number" step="0.01" name="valorUnitario" value={valorUnt || ''} onChange={(e) => setValorUnt(Number(e.target.value))} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Quant.</label>
              <input type="number" name="quantidade" value={quantidade || ''} onChange={(e) => setQuantidade(Number(e.target.value))} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
            </div>
            <div className="bg-emerald-50 px-4 py-2.5 rounded-lg border border-emerald-200 flex flex-col justify-center h-[46px]">
              <span className="text-[10px] font-bold text-emerald-600 uppercase leading-none">Valor Total</span>
              <span className="text-lg font-black text-emerald-700 leading-none">R$ {valorTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Método Pagam.</label>
              <input type="text" name="metodoPagamento" placeholder="Ex: Cartão, Pix" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Situação do Pagamento</label>
             <select name="situacaoPagamento" className="w-full md:w-1/3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium">
                <option value="PAGO">Pago</option>
                <option value="PENDENTE">Pendente</option>
                <option value="AGUARDANDO FATURA">Aguardando Fatura</option>
             </select>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-4 pb-12">
          <Link href="/compras" className="px-8 py-3.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1">
            <ShoppingCart className="h-6 w-6" /> Registrar Compra
          </button>
        </div>

      </form>
    </div>
  );
}