"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Calculator } from 'lucide-react';
import { atualizarSimulacao } from '@/actions/operacional';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function FormEditar({ registro }: { registro: any }) {
  const [custo, setCusto] = useState(registro.custoLente || 0);
  const [tabela, setTabela] = useState(registro.valorTabela || 0);
  const [taxa, setTaxa] = useState(registro.taxaCartao || 0);

  const parcela = tabela / 6;
  const retidoCartao = tabela * (taxa / 100);
  const lucroReal = (tabela - retidoCartao) - custo;

  const actionAtualizar = atualizarSimulacao.bind(null, registro.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/simulacoes" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Simulação</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Reajuste os valores para recalcular a viabilidade.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Marca / Modelo *</label><input type="text" name="marcaLente" defaultValue={registro.marcaLente} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 font-bold text-slate-800 uppercase" /></div>
          <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Cliente / Paciente</label><input type="text" name="cliente" defaultValue={registro.cliente} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 font-medium text-slate-700 uppercase" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center">Valor de Custo <InfoAjuda texto="Digite apenas números."/></label>
            <InputMoeda name="custoLente" defaultValue={registro.custoLente} onChange={setCusto} required className="py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-blue-500" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase ml-1 flex items-center">Preço na Tabela <InfoAjuda texto="Preço de venda bruto."/></label>
            <InputMoeda name="valorTabela" defaultValue={registro.valorTabela} onChange={setTabela} required className="py-3 bg-white border border-slate-200 rounded-xl font-black text-slate-900 focus:border-blue-500 text-lg" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-red-600 uppercase ml-1">Taxa Maquininha (%) *</label>
            <input type="number" step="0.01" name="taxaCartao" defaultValue={registro.taxaCartao} onChange={e => setTaxa(Number(e.target.value))} required className="w-full px-4 py-3 border border-red-200 bg-white rounded-xl font-bold text-red-700 outline-none focus:border-red-500" />
          </div>
        </div>

        <div className="border border-slate-200/60 rounded-2xl p-6 bg-gradient-to-r from-slate-50 to-blue-50/20 space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Calculator className="h-4 w-4 text-blue-500" /> Projeção Atualizada</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-100"><span className="text-[10px] text-slate-400 font-bold uppercase block">Parcela (6x)</span><span className="text-base font-black text-slate-700">6x de R$ {parcela.toFixed(2)}</span></div>
            <div className="bg-white p-3 rounded-xl border border-slate-100"><span className="text-[10px] text-red-400 font-bold uppercase block">Taxa Retida</span><span className="text-base font-black text-red-600">R$ {retidoCartao.toFixed(2)}</span></div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100"><span className="text-[10px] text-emerald-600 font-bold uppercase block">Lucro Líquido</span><span className="text-lg font-black text-emerald-700">R$ {lucroReal.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Simulação" icone={<Save className="h-5 w-5" />} cor="blue" />
        </div>
      </form>
    </div>
  );
}