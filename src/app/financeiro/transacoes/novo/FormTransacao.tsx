"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Receipt, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { salvarTransacao } from '@/actions/financeiro';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function FormTransacao({ contas, categorias }: { contas: any[], categorias: any[] }) {
  // Estados para os filtros inteligentes
  const [escopo, setEscopo] = useState('EMPRESA');
  const [tipo, setTipo] = useState('SAIDA');
  const [valor, setValor] = useState(0);

  // O sistema filtra as contas e as categorias instantaneamente dependendo do que o utilizador selecionou!
  const contasFiltradas = contas.filter(c => c.escopo === escopo);
  const categoriasFiltradas = categorias.filter(c => c.escopo === escopo && c.tipo === tipo);
  const dataHoje = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/financeiro" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nova Transação</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Registe pagamentos ou recebimentos avulsos nas suas contas.</p>
        </div>
        {/* Atalho rápido para criar nova categoria se não existir na lista */}
        <Link href="/financeiro/categorias/novo" className="ml-auto text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
          + Criar Categoria
        </Link>
      </div>

      <form action={salvarTransacao} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* FILTROS PRINCIPAIS (TIPO E ESCOPO) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-1 bg-slate-100 rounded-xl flex">
            <button type="button" onClick={() => setEscopo('EMPRESA')} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${escopo === 'EMPRESA' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>🏢 Empresa (Ótica)</button>
            <button type="button" onClick={() => setEscopo('PESSOAL')} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${escopo === 'PESSOAL' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>👤 Pessoal</button>
            <input type="hidden" name="escopo" value={escopo} />
          </div>
          <div className="p-1 bg-slate-100 rounded-xl flex">
            <button type="button" onClick={() => setTipo('SAIDA')} className={`flex-1 py-3 flex justify-center items-center gap-1 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${tipo === 'SAIDA' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-400'}`}><ArrowDownRight className="h-4 w-4"/> Despesa</button>
            <button type="button" onClick={() => setTipo('ENTRADA')} className={`flex-1 py-3 flex justify-center items-center gap-1 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${tipo === 'ENTRADA' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400'}`}><ArrowUpRight className="h-4 w-4"/> Receita</button>
            <input type="hidden" name="tipo" value={tipo} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Receipt className="h-5 w-5 text-slate-400" /> Detalhes da Movimentação</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">Descrição / Título * <InfoAjuda texto="Ex: Pagamento de Internet, Recebimento Empréstimo, Venda Balcão." /></label>
              <input type="text" name="descricao" required className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none transition-all font-bold text-slate-800 uppercase ${tipo === 'ENTRADA' ? 'focus:border-emerald-500' : 'focus:border-red-500'}`} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Valor da Transação (R$) *</label>
              <InputMoeda name="valor" required onChange={setValor} className={`py-3 bg-white border border-slate-200 rounded-xl outline-none font-black text-lg ${tipo === 'ENTRADA' ? 'text-emerald-700 focus:border-emerald-500' : 'text-red-700 focus:border-red-500'}`} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data *</label>
              <input type="date" name="dataTransacao" required defaultValue={dataHoje} className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-bold text-slate-700 ${tipo === 'ENTRADA' ? 'focus:border-emerald-500' : 'focus:border-red-500'}`} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">Sairá de que Conta? * <InfoAjuda texto="Listando apenas contas do escopo selecionado acima." /></label>
              <select name="contaId" required className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-black text-slate-800 cursor-pointer appearance-none ${tipo === 'ENTRADA' ? 'focus:border-emerald-500' : 'focus:border-red-500'}`}>
                <option value="">-- Selecione o Banco --</option>
                {contasFiltradas.map(c => <option key={c.id} value={c.id}>{c.nome} (Saldo: R$ {c.saldoInicial.toFixed(2)})</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">Categoria * <InfoAjuda texto="Listando apenas categorias compatíveis." /></label>
              <select name="categoriaId" required className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-black text-slate-800 cursor-pointer appearance-none ${tipo === 'ENTRADA' ? 'focus:border-emerald-500' : 'focus:border-red-500'}`}>
                <option value="">-- Selecione a Categoria --</option>
                {categoriasFiltradas.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            
            <div className="space-y-1.5 md:col-span-2 mt-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Status do Pagamento</label>
              <select name="status" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-500 font-black text-slate-700 cursor-pointer appearance-none">
                <option value="PAGO">EFETIVADO / PAGO (Alterar Saldo Agora)</option>
                <option value="PENDENTE">AGENDADO / PENDENTE (Alterar Saldo Depois)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto={tipo === 'ENTRADA' ? "Registar Receita" : "Registar Despesa"} icone={<Save className="h-5 w-5" />} cor={tipo === 'ENTRADA' ? "emerald" : "rose"} />
        </div>
      </form>
    </div>
  );
}