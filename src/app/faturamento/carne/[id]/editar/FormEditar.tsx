"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, BookOpen, Calendar } from 'lucide-react';
import { atualizarCarne } from '@/actions/faturamento';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const [valorVenda, setValorVenda] = useState(registro.valorVenda);
  const [valorEntrada, setValorEntrada] = useState(registro.valorEntrada);
  const totalParcelado = Math.max(0, valorVenda - valorEntrada);

  const actionAtualizar = atualizarCarne.bind(null, registro.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/carne" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Carnê de Vendas</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize o parcelamento e o controle das prestações.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-5 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><BookOpen className="h-4 w-4 text-amber-500" /> Dados da Venda e do Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome do Cliente *</label><input type="text" name="cliente" defaultValue={registro.cliente} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-semibold uppercase text-slate-800" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Contacto / WhatsApp</label><input type="text" name="contato" defaultValue={registro.contato} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-slate-700" /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data da Compra *</label><input type="date" name="dataCompra" defaultValue={registro.dataCompra} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-bold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Ano Base *</label><input type="text" name="anoBase" defaultValue={registro.anoBase} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-bold text-slate-800" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Valor Total da Venda (R$) *</label><input type="number" step="0.01" name="valorVenda" value={valorVenda} onChange={e => setValorVenda(Number(e.target.value))} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-black text-slate-900 text-lg" /></div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-400" /> Entrada e Plano de Parcelamento</h2>
          
          <div className="max-w-xs space-y-1.5 mb-6"><label className="text-xs font-bold text-emerald-600 uppercase ml-1">Valor da Entrada (R$)</label><input type="number" step="0.01" name="valorEntrada" value={valorEntrada} onChange={e => setValorEntrada(Number(e.target.value))} className="w-full px-4 py-3 bg-emerald-50/30 border border-emerald-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-black text-emerald-700" /></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/60 space-y-2 transition-all hover:border-amber-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">{i+1}ª Prestação</span>
                <input type="number" step="0.01" name={`p${i+1}Valor`} defaultValue={registro[`p${i+1}Valor`] || ''} placeholder="Valor R$" className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-amber-500 font-bold text-slate-800" />
                <input type="date" name={`p${i+1}Data`} defaultValue={registro[`p${i+1}Data`] || ''} className="w-full px-2 py-1 text-[11px] bg-white border border-slate-200 rounded-lg outline-none focus:border-amber-500 font-semibold text-slate-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
          <div className="bg-amber-50/60 border border-amber-200 px-6 py-3 rounded-2xl flex flex-col w-full sm:w-auto"><span className="text-[10px] uppercase font-black tracking-widest text-amber-700">Saldo Restante no Carnê</span><span className="text-2xl font-black text-amber-950">R$ {totalParcelado.toFixed(2)}</span></div>
          <BotaoSubmit texto="Salvar Alterações do Carnê" icone={<Save className="h-5 w-5" />} cor="yellow" />
        </div>
      </form>
    </div>
  );
}