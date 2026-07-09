"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Store, Truck, Handshake } from 'lucide-react';
import { salvarPreco } from '@/actions/operacional';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function NovoPrecoPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tabela-precos" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Adicionar ao Catálogo</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Defina os preços padrão para os consertos e manutenções efetuadas.</p>
        </div>
      </div>

      <form action={salvarPreco} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center">
            Nome do Serviço / Tipo de Conserto * <InfoAjuda texto="Ex: Solda de Titânio, Troca de Plaqueta, Ajuste de Hastes." />
          </label>
          <input type="text" name="tipoConserto" required placeholder="Ex: Solda de Titânio" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-bold text-slate-800 uppercase" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* GRUPO BALCÃO */}
          <div className="bg-slate-50/50 border border-slate-200/80 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 border-b pb-2"><Store className="h-4 w-4 text-slate-500" /> 1. Na Loja / Balcão</h3>
            <div className="space-y-3">
              <div><label className="text-[10px] font-bold text-slate-500 uppercase flex items-center mb-1">Preço PIX <InfoAjuda texto="Digite apenas números (Ex: 3500 vira R$ 35,00)" /></label><InputMoeda name="lojaPix" className="py-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-800 focus:border-indigo-500" /></div>
              <div><label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Preço Cartão</label><InputMoeda name="lojaCartao" className="py-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-800 focus:border-indigo-500" /></div>
            </div>
          </div>

          {/* GRUPO DELIVERY */}
          <div className="bg-blue-50/20 border border-blue-100 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-blue-100 pb-2"><Truck className="h-4 w-4 text-blue-500" /> 2. No Delivery</h3>
            <div className="space-y-3">
              <div><label className="text-[10px] font-bold text-blue-900 uppercase flex items-center mb-1">Preço PIX <InfoAjuda texto="Geralmente inclui a taxa de deslocamento do motoboy." /></label><InputMoeda name="deliveryPix" className="py-2 bg-white border border-blue-200 rounded-lg outline-none font-bold text-blue-800 focus:border-blue-500" /></div>
              <div><label className="text-[10px] font-bold text-blue-900 uppercase mb-1 block">Preço Cartão</label><InputMoeda name="deliveryCartao" className="py-2 bg-white border border-blue-200 rounded-lg outline-none font-bold text-blue-800 focus:border-blue-500" /></div>
            </div>
          </div>

          {/* GRUPO ATACADO */}
          <div className="bg-emerald-50/20 border border-emerald-100 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-emerald-950 uppercase tracking-widest flex items-center gap-1.5 border-b border-emerald-100 pb-2"><Handshake className="h-4 w-4 text-emerald-600" /> 3. Óticas Parceiras</h3>
            <div className="space-y-3">
              <div><label className="text-[10px] font-bold text-emerald-900 uppercase flex items-center mb-1">Preço PIX <InfoAjuda texto="Preço especial de atacado/B2B para lojas parceiras." /></label><InputMoeda name="oticasPix" className="py-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-800 focus:border-emerald-500" /></div>
              <div><label className="text-[10px] font-bold text-emerald-900 uppercase mb-1 block">Preço Cartão</label><InputMoeda name="oticasCartao" className="py-2 bg-white border border-slate-200 rounded-lg outline-none font-bold text-slate-800 focus:border-emerald-500" /></div>
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <BotaoSubmit texto="Salvar no Catálogo" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}