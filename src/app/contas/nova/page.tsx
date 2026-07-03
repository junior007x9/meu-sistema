"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Zap, Droplet, Calculator } from 'lucide-react';
import { salvarContaMensal } from '@/actions/contas';

export default function NovaContaPage() {
  const [totalKwh, setTotalKwh] = useState<number>(1053);
  const [totalRs, setTotalRs] = useState<number>(1019.93);
  const [mediaBarbosa, setMediaBarbosa] = useState<number>(425);
  
  const [icms, setIcms] = useState<number>(217.25);
  const [pis, setPis] = useState<number>(12.55);
  const [cofins, setCofins] = useState<number>(57.83);
  const [descontoAline, setDescontoAline] = useState<number>(20);

  const [aguaAline, setAguaAline] = useState<number>(50);
  const [aguaBarbosa, setAguaBarbosa] = useState<number>(50);

  // MATEMÁTICA EM TEMPO REAL
  const tarifa = totalKwh > 0 ? totalRs / totalKwh : 0;
  const barbosaConsumoRs = mediaBarbosa * tarifa;
  const diferencaKwh = totalKwh - mediaBarbosa;
  const diferencaRs = diferencaKwh * tarifa;
  
  const valorDescAline = diferencaRs * (descontoAline / 100);
  const impostosTotal = icms + pis + cofins;
  const impostoMetade = impostosTotal / 2;

  const totalEquatorialBarbosa = barbosaConsumoRs + impostoMetade;
  const totalEquatorialAline = (diferencaRs - valorDescAline) + impostoMetade;
  const repasseFinalAline = totalEquatorialAline + aguaAline;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/contas" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Repasse de Contas</h1>
          <p className="text-sm text-slate-500 font-medium">Calculadora de divisão de Equatorial e Águas de Teresina.</p>
        </div>
      </div>

      <form action={salvarContaMensal} className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-4">
           <label className="block text-sm font-black text-slate-800 uppercase mb-2">Mês de Referência *</label>
           <input type="text" name="mesReferencia" required placeholder="Ex: MAIO 2026" className="w-full md:w-1/3 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EQUATORIAL */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2"><Zap className="text-yellow-500 h-6 w-6" /> Dados Equatorial</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Total KWH</label>
                <input type="number" name="totalKwh" value={totalKwh || ''} onChange={e => setTotalKwh(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-yellow-300 rounded outline-none font-bold" />
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Total R$ (Fatura)</label>
                <input type="number" step="0.01" name="totalRs" value={totalRs || ''} onChange={e => setTotalRs(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-yellow-300 rounded outline-none font-bold" />
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
               <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Média Barbosa KWH</label>
               <input type="number" name="mediaBarbosaKwh" value={mediaBarbosa || ''} onChange={e => setMediaBarbosa(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-yellow-300 rounded outline-none font-bold" />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">ICMS (R$)</label>
                <input type="number" step="0.01" name="icms" value={icms || ''} onChange={e => setIcms(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-yellow-300 rounded outline-none text-sm font-bold" />
              </div>
              <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">PIS (R$)</label>
                <input type="number" step="0.01" name="pis" value={pis || ''} onChange={e => setPis(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-yellow-300 rounded outline-none text-sm font-bold" />
              </div>
              <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">COFINS (R$)</label>
                <input type="number" step="0.01" name="cofins" value={cofins || ''} onChange={e => setCofins(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-yellow-300 rounded outline-none text-sm font-bold" />
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex justify-between items-center">
               <label className="block text-xs font-bold text-slate-600 uppercase">Desconto Aline (%)</label>
               <input type="number" name="descontoAlinePerc" value={descontoAline || ''} onChange={e => setDescontoAline(Number(e.target.value))} className="w-20 px-2 py-1 bg-white border border-yellow-300 rounded outline-none font-bold text-center" />
            </div>
          </div>

          {/* ÁGUAS DE TERESINA E RESULTADOS */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2"><Droplet className="text-blue-500 h-6 w-6" /> Águas de Teresina</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Aline (R$)</label>
                  <input type="number" step="0.01" name="aguaAline" value={aguaAline || ''} onChange={e => setAguaAline(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-blue-300 rounded outline-none font-bold" />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Barbosa (R$)</label>
                  <input type="number" step="0.01" name="aguaBarbosa" value={aguaBarbosa || ''} onChange={e => setAguaBarbosa(Number(e.target.value))} className="w-full px-2 py-1 bg-white border border-blue-300 rounded outline-none font-bold" />
                </div>
              </div>
            </div>

            {/* PAINEL VERMELHO (Resultados Finais) */}
            <div className="bg-[#ff3300] p-6 rounded-2xl shadow-lg text-white">
              <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Calculator className="h-5 w-5" /> Repasses Finais</h2>
              <div className="space-y-3">
                 <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="font-bold text-sm">Equatorial Barbosa:</span>
                    <span className="text-xl font-black">R$ {totalEquatorialBarbosa.toFixed(2).replace('.', ',')}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="font-bold text-sm">Equatorial Aline:</span>
                    <span className="text-xl font-black">R$ {totalEquatorialAline.toFixed(2).replace('.', ',')}</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-yellow-300 uppercase tracking-wider">Total Aline (Luz + Água):</span>
                    <span className="text-3xl font-black text-yellow-300">R$ {repasseFinalAline.toFixed(2).replace('.', ',')}</span>
                 </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-3 pb-10 mt-6">
          <Link href="/contas" className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-3 rounded-lg font-bold shadow-md transition-transform hover:scale-105">
            <Save className="h-5 w-5" /> Salvar Repasse do Mês
          </button>
        </div>

      </form>
    </div>
  );
}