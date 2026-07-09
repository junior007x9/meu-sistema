"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Landmark } from 'lucide-react';
import { salvarContaBancaria } from '@/actions/financeiro';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function NovaContaPage() {
  const [saldo, setSaldo] = useState(0);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/financeiro" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nova Conta Bancária</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Adicione bancos da empresa (Ótica) ou bancos pessoais.</p>
        </div>
      </div>

      <form action={salvarContaBancaria} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Landmark className="h-5 w-5 text-emerald-600" /> Dados da Conta</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                Nome do Banco / Conta * <InfoAjuda texto="Ex: Nubank Empresa, Itaú Pessoal, Caixa Loja." />
              </label>
              <input type="text" name="nome" required placeholder="Ex: Nubank Empresa" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-slate-800 uppercase" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                Escopo da Conta * <InfoAjuda texto="Define se o dinheiro desta conta entra no cálculo de lucros da Ótica ou se é o seu dinheiro Pessoal." />
              </label>
              <select name="escopo" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-black text-slate-700 cursor-pointer appearance-none">
                <option value="EMPRESA">EMPRESA (Ótica)</option>
                <option value="PESSOAL">PESSOAL (Particular)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">
                Saldo Atual (Inicial) <InfoAjuda texto="Quanto dinheiro já existe nesta conta hoje? (Apenas números)" />
              </label>
              <InputMoeda name="saldoInicial" onChange={setSaldo} className="py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold text-emerald-900" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Salvar Conta Bancária" icone={<Save className="h-5 w-5" />} cor="emerald" />
        </div>
      </form>
    </div>
  );
}