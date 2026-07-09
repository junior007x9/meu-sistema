"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ShoppingBag, Truck, CircleDollarSign } from 'lucide-react';
import { salvarCompra } from '@/actions/operacional';
import BotaoSubmit from '@/components/BotaoSubmit';

// Importação das nossas novas ferramentas premium
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function NovaCompraPage() {
  const [unt, setUnt] = useState(0);
  const [qtd, setQtd] = useState(1);
  const total = unt * qtd;

  const dataHoje = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/compras" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nova Compra Online</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Registe pedidos no AliExpress, Shopee, Mercado Livre, etc.</p>
        </div>
      </div>

      <form action={salvarCompra} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* ... Resto do código inicial igual ... */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><ShoppingBag className="h-4 w-4 text-rose-500" /> Detalhes Financeiros</h2>
             <div className="grid grid-cols-2 gap-4">
                
                {/* AQUI ESTÁ A MÁGICA! SUBSTITUÍMOS O INPUT NORMAL PELO NOSSO INPUT DE MOEDA E ADICIONAMOS O TUTORIAL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center">
                    Valor Unitário
                    <InfoAjuda texto="Digite apenas números. O sistema formata automaticamente para Reais (ex: digite 15000 para 150,00)." />
                  </label>
                  <InputMoeda 
                    name="valorUnitario" 
                    required 
                    onChange={setUnt}
                    className="px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl font-bold text-slate-800 outline-none focus:bg-white focus:border-rose-500" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center">
                    Quantidade
                    <InfoAjuda texto="Insira quantas unidades deste produto foram compradas. O total é multiplicado automaticamente." />
                  </label>
                  <input type="number" name="quantidade" value={qtd} onChange={e => setQtd(Number(e.target.value))} required className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl font-bold text-slate-800 outline-none focus:bg-white focus:border-rose-500" />
                </div>
             </div>
             
             <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex justify-between items-center">
                <span className="font-black text-rose-900 text-xs uppercase tracking-widest">Valor Total</span>
                <span className="font-black text-rose-700 text-2xl">
                  {/* Total também formatado lindamente */}
                  R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
             </div>
          </div>

          <div className="space-y-4">
             {/* ... Resto do código dos pagamentos ... */}
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CircleDollarSign className="h-4 w-4 text-emerald-600" /> Responsáveis e Pagamento</h2>
             {/* ... */}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Compra" icone={<Save className="h-5 w-5" />} cor="rose" />
        </div>
      </form>
    </div>
  );
}