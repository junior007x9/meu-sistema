"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Calculator } from 'lucide-react';
import { salvarServicoJoaozinho } from '@/actions/faturamento';

export default function NovoJoaozinhoPage() {
  const [montagemValor, setMontagem] = useState(0);
  const [transposicaoValor, setTransposicao] = useState(0);
  const [coloracaoValor, setColoracao] = useState(0);
  
  const total = montagemValor + transposicaoValor + coloracaoValor;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/faturamento/joaozinho" className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Novo Serviço (Joãozinho)</h1>
          <p className="text-sm text-slate-500 font-medium">Lançamento de faturamento.</p>
        </div>
      </div>

      <form action={salvarServicoJoaozinho} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        
        {/* DATA E MÊS BASE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data do Serviço *</label>
            <input type="date" name="data" required className="w-full px-4 py-2 bg-white border border-slate-300 rounded outline-none font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mês Base *</label>
            <select name="mesReferencia" required className="w-full px-4 py-2 bg-white border border-slate-300 rounded outline-none font-bold">
               <option value="JANEIRO">JANEIRO</option>
               <option value="FEVEREIRO">FEVEREIRO</option>
               <option value="MARÇO">MARÇO</option>
               <option value="ABRIL">ABRIL</option>
               <option value="MAIO">MAIO</option>
               <option value="JUNHO">JUNHO</option>
               <option value="JULHO">JULHO</option>
               <option value="AGOSTO">AGOSTO</option>
               <option value="SETEMBRO">SETEMBRO</option>
               <option value="OUTUBRO">OUTUBRO</option>
               <option value="NOVEMBRO">NOVEMBRO</option>
               <option value="DEZEMBRO">DEZEMBRO</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ano Base *</label>
            <input type="text" name="anoBase" defaultValue="2026" required className="w-full px-4 py-2 bg-white border border-slate-300 rounded outline-none font-bold" />
          </div>
        </div>

        {/* VALORES E DESCRIÇÃO */}
        <div className="space-y-4">
           {/* Montagem */}
           <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição Montagem</label>
                 <input type="text" name="montagem" placeholder="Ex: 2 Armações..." className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor (R$)</label>
                 <input type="number" step="0.01" name="montagemValor" value={montagemValor || ''} onChange={e => setMontagem(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg font-bold text-blue-700" />
              </div>
           </div>

           {/* Transposição */}
           <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição Transposição</label>
                 <input type="text" name="transposicao" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor (R$)</label>
                 <input type="number" step="0.01" name="transposicaoValor" value={transposicaoValor || ''} onChange={e => setTransposicao(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg font-bold text-orange-700" />
              </div>
           </div>

           {/* Coloração */}
           <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição Coloração</label>
                 <input type="text" name="coloracao" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor (R$)</label>
                 <input type="number" step="0.01" name="coloracaoValor" value={coloracaoValor || ''} onChange={e => setColoracao(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg font-bold text-purple-700" />
              </div>
           </div>
        </div>

        {/* TOTAL AUTOMÁTICO */}
        <div className="bg-[#92d050]/20 p-4 rounded-xl border border-[#92d050] flex justify-between items-center mt-6">
           <span className="font-black text-green-800 uppercase tracking-widest flex items-center gap-2"><Calculator className="h-5 w-5" /> Total do Dia</span>
           <span className="text-3xl font-black text-green-800">R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="flex justify-end pt-4"><button type="submit" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl font-bold shadow-md"><Save className="h-5 w-5 inline mr-2"/> Salvar Faturamento</button></div>
      </form>
    </div>
  );
}