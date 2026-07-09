"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ShoppingBag, Truck, CircleDollarSign } from 'lucide-react';
import { atualizarCompra } from '@/actions/operacional';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function FormEditar({ registro }: { registro: any }) {
  const [unt, setUnt] = useState(registro.valorUnitario || 0);
  const [qtd, setQtd] = useState(registro.quantidade || 1);
  const total = unt * qtd;

  const actionAtualizar = atualizarCompra.bind(null, registro.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/compras" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Compra</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize informações de pagamento e rastreio.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label><input type="date" name="dataCompra" defaultValue={registro.dataCompra} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-800" /></div>
          <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Produto *</label><input type="text" name="produto" defaultValue={registro.produto} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Loja *</label><input type="text" name="loja" defaultValue={registro.loja} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-medium text-slate-700 uppercase" /></div>
          <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Rastreio</label><input type="text" name="rastreio" defaultValue={registro.rastreio} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-medium text-slate-700 uppercase" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><ShoppingBag className="h-4 w-4 text-rose-500" /> Detalhes Financeiros</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center">Valor Un. <InfoAjuda texto="Digite o valor corrigido."/></label>
                  <InputMoeda name="valorUnitario" defaultValue={registro.valorUnitario} onChange={setUnt} required className="py-3 border border-slate-200 bg-slate-50 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-rose-500" />
                </div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">Quantidade</label><input type="number" name="quantidade" defaultValue={registro.quantidade} onChange={e => setQtd(Number(e.target.value))} required className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-rose-500" /></div>
             </div>
             <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex justify-between items-center">
                <span className="font-black text-rose-900 text-xs uppercase tracking-widest">Valor Total</span>
                <span className="font-black text-rose-700 text-2xl">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CircleDollarSign className="h-4 w-4 text-emerald-600" /> Responsáveis e Pagamento</h2>
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">Comprou?</label><input type="text" name="quemComprou" defaultValue={registro.quemComprou} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-rose-500 uppercase text-sm" /></div>
                 <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">Paga?</label><input type="text" name="quemVaiPagar" defaultValue={registro.quemVaiPagar} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-rose-500 uppercase text-sm" /></div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-600 uppercase ml-1">Método</label>
                   <select name="metodoPagamento" defaultValue={registro.metodoPagamento} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-rose-500 text-sm font-bold">
                     <option value="CARTÃO DE CRÉDITO">Cartão de Crédito</option><option value="PIX">PIX</option><option value="BOLETO">Boleto</option>
                   </select>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-600 uppercase ml-1">Status</label>
                   <select name="situacaoPagamento" defaultValue={registro.situacaoPagamento} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-rose-500 text-sm font-bold">
                     <option value="PAGO">Já Pago</option><option value="PENDENTE">Pendente</option>
                   </select>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Compra" icone={<Save className="h-5 w-5" />} cor="rose" />
        </div>
      </form>
    </div>
  );
}