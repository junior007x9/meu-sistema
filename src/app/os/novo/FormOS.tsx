"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, Wrench, CircleDollarSign, CalendarDays } from 'lucide-react';
import { salvarOS } from '@/actions/os';
import BotaoSubmit from '@/components/BotaoSubmit';
import InputMoeda from '@/components/InputMoeda';
import InfoAjuda from '@/components/InfoAjuda';

export default function FormOS({ clientes }: { clientes: any[] }) {
  const [pix, setPix] = useState(0);
  const [especie, setEspecie] = useState(0);
  const [cartao, setCartao] = useState(0);
  
  const total = pix + especie + cartao;
  const dataHoje = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/os" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nova Ordem de Serviço</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Lançamento de laboratório, consertos e montagens.</p>
        </div>
      </div>

      <form action={salvarOS} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* IDENTIFICAÇÃO DO CLIENTE */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><User className="h-5 w-5 text-blue-600" /> Identificação do Cliente</h2>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <label className="text-xs font-bold text-blue-800 uppercase ml-1 flex items-center mb-2">
              Vincular a um Cliente Registado * <InfoAjuda texto="Se o cliente não aparecer nesta lista, precisa primeiro ir ao menu 'Fichas de Clientes' e criar o seu cadastro." />
            </label>
            <select name="clienteId" required className="w-full px-4 py-4 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-500 font-black text-slate-800 cursor-pointer shadow-sm">
              <option value="">-- Selecione o Cliente na Lista --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome} {c.telefone ? `(Tel: ${c.telefone})` : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* DADOS DO SERVIÇO */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Wrench className="h-5 w-5 text-purple-600" /> Dados do Laboratório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 flex items-center">Descrição do Defeito * <InfoAjuda texto="Descreva exatamente o que o cliente solicitou (ex: Solda na haste direita)." /></label>
              <input type="text" name="descricaoDefeito" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" />
            </div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Modelo da Armação</label><input type="text" name="modeloArmacao" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Serviço A Realizar</label><input type="text" name="servicoRealizado" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Técnico Responsável</label><input type="text" name="tecnico" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium text-slate-700 uppercase" /></div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Status da O.S. *</label>
              <select name="status" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-black text-slate-700 cursor-pointer appearance-none">
                <option value="RECEBIDO">RECEBIDO (Na Loja)</option><option value="EM ANDAMENTO">EM ANDAMENTO (No Lab)</option><option value="CONCLUÍDO">CONCLUÍDO (Pronto)</option><option value="ENTREGUE">ENTREGUE (Finalizado)</option>
              </select>
            </div>
          </div>
        </div>

        {/* DATAS E PAGAMENTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-slate-400" /> Prazos</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Entrada *</label><input type="date" name="dataEntrada" defaultValue={dataHoje} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Previsão</label><input type="date" name="dataEntregaPrevista" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" /></div>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CircleDollarSign className="h-5 w-5 text-emerald-600" /> Pagamento</h2>
             <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center">PIX <InfoAjuda texto="Digite o valor pago via PIX. Ex: 5000 para R$ 50,00" /></label>
                    <InputMoeda name="valorPix" onChange={setPix} className="py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-slate-800" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Espécie</label>
                    <InputMoeda name="valorEspecie" onChange={setEspecie} className="py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-slate-800" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cartão</label>
                    <InputMoeda name="valorCartao" onChange={setCartao} className="py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-slate-800" />
                  </div>
                </div>
                <div className="bg-emerald-100/50 border border-emerald-200 p-4 rounded-xl flex justify-between items-center shadow-sm mt-2">
                  <span className="font-black text-emerald-900 text-xs uppercase tracking-widest">Valor Total da O.S.</span>
                  <span className="font-black text-emerald-700 text-2xl">R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Gerar Ordem de Serviço" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}