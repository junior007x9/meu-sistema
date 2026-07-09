"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Zap, Droplets, Calculator } from 'lucide-react';
import { salvarContaMensal } from '@/actions/operacional';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function NovaContaMensalPage() {
  const [totalKwh, setTotalKwh] = useState(0);
  const [totalRs, setTotalRs] = useState(0);
  const [mediaBarbosaKwh, setMediaBarbosaKwh] = useState(0);
  const [percDescAline, setPercDescAline] = useState(20);
  
  const [aguaAline, setAguaAline] = useState(0);

  // Cálculos Automáticos de Repasse da Energia (Regra de 3 Básica)
  const percentualBarbosa = totalKwh > 0 ? (mediaBarbosaKwh / totalKwh) : 0;
  const equatorialBarbosaBruto = totalRs * percentualBarbosa;
  
  // A Aline paga o restante da luz, MAS tem um desconto acordado (%) em cima da parte dela
  const equatorialAlineBruto = totalRs - equatorialBarbosaBruto;
  const equatorialAlineFinal = equatorialAlineBruto - (equatorialAlineBruto * (percDescAline / 100));
  
  // Total Geral da Aline
  const totalAlineGeral = equatorialAlineFinal + aguaAline;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/contas-mensais" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Novo Repasse Mensal</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Insira os dados da fatura para calcular a divisão automática.</p>
        </div>
      </div>

      <form action={salvarContaMensal} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        <div className="space-y-1.5 max-w-xs">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês / Ano de Referência *</label>
          <input type="text" name="mesReferencia" required placeholder="Ex: MAIO 2026" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 font-black text-slate-800 uppercase" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Fatura Equatorial</h2>
             <div className="grid grid-cols-2 gap-4 bg-yellow-50/30 p-6 rounded-2xl border border-yellow-100">
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Total Consumo (kWh)</label><input type="number" step="0.01" name="totalKwh" value={totalKwh || ''} onChange={e => setTotalKwh(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg outline-none focus:border-yellow-500 font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Total Fatura (R$)</label><input type="number" step="0.01" name="totalRs" value={totalRs || ''} onChange={e => setTotalRs(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg outline-none focus:border-yellow-500 font-black text-slate-900" /></div>
                
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Média Barbosa (kWh)</label><input type="number" step="0.01" name="mediaBarbosaKwh" value={mediaBarbosaKwh || ''} onChange={e => setMediaBarbosaKwh(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg outline-none focus:border-yellow-500 font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Desconto Aline (%)</label><input type="number" step="0.01" name="descontoAlinePerc" value={percDescAline} onChange={e => setPercDescAline(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg outline-none focus:border-yellow-500 font-bold text-slate-800" /></div>
             </div>

             <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 mt-4 space-y-3">
               <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-1.5"><Droplets className="h-4 w-4 text-blue-500" /> Águas de Teresina</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5"><label className="text-[10px] font-bold text-blue-800 uppercase ml-1">Cota Barbosa (R$)</label><input type="number" step="0.01" name="aguaBarbosa" className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg outline-none focus:border-blue-500 font-bold text-slate-800" defaultValue="0" /></div>
                 <div className="space-y-1.5"><label className="text-[10px] font-bold text-blue-800 uppercase ml-1">Cota Aline (R$)</label><input type="number" step="0.01" name="aguaAline" value={aguaAline || ''} onChange={e => setAguaAline(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg outline-none focus:border-blue-500 font-bold text-slate-800" /></div>
               </div>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Calculator className="h-4 w-4 text-emerald-600" /> Resumo do Cálculo</h2>
             
             {/* CAMPOS OCULTOS PARA GRAVAR NO BANCO OS TOTAIS */}
             <input type="hidden" name="equatorialBarbosa" value={equatorialBarbosaBruto} />
             <input type="hidden" name="equatorialAline" value={equatorialAlineFinal} />
             <input type="hidden" name="totalAlineGeral" value={totalAlineGeral} />

             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-inner">
               <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Luz - Cota Barbosa</span>
                 <span className="font-bold text-slate-700">R$ {equatorialBarbosaBruto.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Luz - Cota Aline (-{percDescAline}%)</span>
                 <span className="font-bold text-slate-700">R$ {equatorialAlineFinal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center pb-2">
                 <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Água - Cota Aline</span>
                 <span className="font-bold text-blue-600">R$ {aguaAline.toFixed(2)}</span>
               </div>
               
               <div className="bg-emerald-100 border border-emerald-200 p-4 rounded-xl flex justify-between items-center">
                 <span className="font-black text-emerald-900 text-[11px] uppercase tracking-widest">Total Repasse (Aline)</span>
                 <span className="font-black text-emerald-700 text-2xl">R$ {totalAlineGeral.toFixed(2)}</span>
               </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Contas do Mês" icone={<Save className="h-5 w-5" />} cor="yellow" />
        </div>
      </form>
    </div>
  );
}