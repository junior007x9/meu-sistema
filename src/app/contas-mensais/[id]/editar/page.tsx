"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Zap, Droplets, Calculator } from 'lucide-react';
import { atualizarContaMensal } from '@/actions/operacional';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';

export default function FormEditar({ registro }: { registro: any }) {
  const [totalKwh, setTotalKwh] = useState(registro.totalKwh || 0);
  const [totalRs, setTotalRs] = useState(registro.totalRs || 0);
  const [mediaBarbosaKwh, setMediaBarbosaKwh] = useState(registro.mediaBarbosaKwh || 0);
  const [percDescAline, setPercDescAline] = useState(registro.descontoAlinePerc || 20);
  const [aguaAline, setAguaAline] = useState(registro.aguaAline || 0);
  
  const percentualBarbosa = totalKwh > 0 ? (mediaBarbosaKwh / totalKwh) : 0;
  const equatorialBarbosaBruto = totalRs * percentualBarbosa;
  const equatorialAlineBruto = totalRs - equatorialBarbosaBruto;
  const equatorialAlineFinal = equatorialAlineBruto - (equatorialAlineBruto * (percDescAline / 100));
  const totalAlineGeral = equatorialAlineFinal + aguaAline;

  const actionAtualizar = atualizarContaMensal.bind(null, registro.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/contas-mensais" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Repasse</h1>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="space-y-1.5 max-w-xs">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês / Ano *</label>
          <input type="text" name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-black text-slate-800 uppercase" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Equatorial</h2>
             <div className="grid grid-cols-2 gap-4 bg-yellow-50/30 p-6 rounded-2xl border border-yellow-100">
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Total kWh</label><input type="number" step="0.01" name="totalKwh" defaultValue={registro.totalKwh} onChange={e => setTotalKwh(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg outline-none font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Fatura (R$)</label><InputMoeda name="totalRs" defaultValue={registro.totalRs} onChange={setTotalRs} className="py-2 bg-white border border-yellow-200 rounded-lg font-black text-slate-900" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Média Barbosa</label><input type="number" step="0.01" name="mediaBarbosaKwh" defaultValue={registro.mediaBarbosaKwh} onChange={e => setMediaBarbosaKwh(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-bold text-yellow-800 uppercase ml-1">Desc. Aline (%)</label><input type="number" step="0.01" name="descontoAlinePerc" defaultValue={registro.descontoAlinePerc} onChange={e => setPercDescAline(Number(e.target.value))} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg font-bold text-slate-800" /></div>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Calculator className="h-4 w-4 text-emerald-600" /> Resumo</h2>
             <input type="hidden" name="equatorialBarbosa" value={equatorialBarbosaBruto} />
             <input type="hidden" name="equatorialAline" value={equatorialAlineFinal} />
             <input type="hidden" name="totalAlineGeral" value={totalAlineGeral} />
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-inner">
               <div className="bg-emerald-100 border border-emerald-200 p-4 rounded-xl flex justify-between items-center mt-4">
                 <span className="font-black text-emerald-900 text-[11px] uppercase tracking-widest">Total Repasse</span>
                 <span className="font-black text-emerald-700 text-2xl">R$ {totalAlineGeral.toFixed(2)}</span>
               </div>
             </div>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Guardar" icone={<Save className="h-5 w-5" />} cor="yellow" />
        </div>
      </form>
    </div>
  );
}