"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Wallet } from 'lucide-react';
import { atualizarBalancoDiario } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const [compras, setCompras] = useState(registro.compras);
  const [dinheiro, setDinheiro] = useState(registro.entradaDinheiro);
  const [credito, setCredito] = useState(registro.entradaCredito);
  const [debito, setDebito] = useState(registro.entradaDebito);
  const [pix, setPix] = useState(registro.entradaPix);
  const [saidas, setSaidas] = useState(registro.saidaPagamentos);

  const totalEntradas = dinheiro + credito + debito + pix;
  const totalLiquido = totalEntradas - compras - saidas;

  const actionAtualizar = atualizarBalancoDiario.bind(null, registro.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/balanco-diario" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Balanço Diário (Styllo)</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize os valores de liquidez e caixa deste dia.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label>
             <input type="date" name="data" defaultValue={registro.data} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-slate-800" />
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mês Base *</label>
             <select name="mesReferencia" defaultValue={registro.mesReferencia} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-slate-800 appearance-none">
               <option value="JANEIRO">JANEIRO</option><option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option><option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option><option value="JUNHO">JUNHO</option>
               <option value="JULHO">JULHO</option><option value="AGOSTO">AGOSTO</option>
               <option value="SETEMBRO">SETEMBRO</option><option value="OUTUBRO">OUTUBRO</option>
               <option value="NOVEMBRO">NOVEMBRO</option><option value="DEZEMBRO">DEZEMBRO</option>
             </select>
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Ano Base *</label>
             <input type="text" name="anoBase" defaultValue={registro.anoBase} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-slate-800" />
          </div>
          <div className="space-y-1.5">
             <label className="text-xs font-bold text-orange-700 uppercase ml-1">Total Compras (R$)</label>
             <input type="number" step="0.01" name="compras" value={compras} onChange={e => setCompras(Number(e.target.value))} className="w-full px-4 py-3 bg-orange-50/50 border border-orange-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-black text-orange-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-5">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Wallet className="h-4 w-4 text-indigo-600" /> Entradas do Dia</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">R$ Espécie</label><input type="number" step="0.01" name="entradaDinheiro" value={dinheiro} onChange={e => setDinheiro(Number(e.target.value))} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg focus:bg-white outline-none focus:border-indigo-500 font-bold text-green-800 transition-colors" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">Cartão Crédito</label><input type="number" step="0.01" name="entradaCredito" value={credito} onChange={e => setCredito(Number(e.target.value))} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg focus:bg-white outline-none focus:border-indigo-500 font-bold text-green-800 transition-colors" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">Cartão Débito</label><input type="number" step="0.01" name="entradaDebito" value={debito} onChange={e => setDebito(Number(e.target.value))} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg focus:bg-white outline-none focus:border-indigo-500 font-bold text-green-800 transition-colors" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase ml-1">PIX</label><input type="number" step="0.01" name="entradaPix" value={pix} onChange={e => setPix(Number(e.target.value))} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg focus:bg-white outline-none focus:border-indigo-500 font-bold text-green-800 transition-colors" /></div>
             </div>
             <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                <span className="font-black text-green-900 text-[10px] uppercase tracking-widest">Total Entradas</span>
                <span className="font-black text-green-700 text-lg">R$ {totalEntradas.toFixed(2)}</span>
             </div>
          </div>

          <div className="space-y-5 flex flex-col justify-between">
             <div className="space-y-5">
               <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Saídas de Caixa</h2>
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-red-600 uppercase ml-1">Saída Pagamentos (Cartão/PIX)</label>
                  <input type="number" step="0.01" name="saidaPagamentos" value={saidas} onChange={e => setSaidas(Number(e.target.value))} className="w-full px-4 py-4 border border-red-200 bg-red-50/50 rounded-xl outline-none focus:bg-white focus:border-red-500 font-black text-red-800 text-lg transition-colors" />
               </div>
             </div>
             
             <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-800 mb-2">PREVISÃO DO TOTAL LÍQUIDO</p>
                <h3 className={`text-4xl font-black ${totalLiquido >= 0 ? 'text-indigo-950' : 'text-red-600'}`}>
                  R$ {totalLiquido.toFixed(2)}
                </h3>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Alterações" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}