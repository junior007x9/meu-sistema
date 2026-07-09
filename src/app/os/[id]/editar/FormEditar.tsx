"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, Wrench, CircleDollarSign, CalendarDays } from 'lucide-react';
import { atualizarOS } from '@/actions/os';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro, clientes }: { registro: any, clientes: any[] }) {
  const [pix, setPix] = useState(registro.valorPix);
  const [especie, setEspecie] = useState(registro.valorEspecie);
  const [cartao, setCartao] = useState(registro.valorCartao);
  
  const total = pix + especie + cartao;

  // Função para converter as datas vindas da base de dados (Timestamp) para o formato do input type="date"
  const formatarData = (dataBase: any) => {
    if (!dataBase) return '';
    const d = new Date(dataBase);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const actionAtualizar = atualizarOS.bind(null, registro.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/os" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Ordem de Serviço</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize o status, valores ou informações da O.S. #{String(registro.id).padStart(5, '0')}</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-8">
        
        {/* 1. SELEÇÃO DE CLIENTE */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><User className="h-5 w-5 text-blue-600" /> Identificação do Cliente</h2>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <label className="text-xs font-bold text-blue-800 uppercase ml-1 block mb-2">Cliente Vinculado *</label>
            <select name="clienteId" defaultValue={registro.clienteId} required className="w-full px-4 py-4 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-black text-slate-800 cursor-pointer shadow-sm">
              <option value="">-- Selecione o Cliente na Lista --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} {c.telefone ? `(Tel: ${c.telefone})` : ''} {c.cpf ? `- CPF: ${c.cpf}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. DADOS DO SERVIÇO */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Wrench className="h-5 w-5 text-purple-600" /> Dados do Laboratório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Descrição do Defeito / Solicitação *</label>
              <input type="text" name="descricaoDefeito" defaultValue={registro.descricaoDefeito} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 transition-all font-bold text-slate-800" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Modelo da Armação</label>
              <input type="text" name="modeloArmacao" defaultValue={registro.modeloArmacao} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 transition-all font-medium text-slate-700" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Serviço Realizado / A Realizar</label>
              <input type="text" name="servicoRealizado" defaultValue={registro.servicoRealizado} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 transition-all font-medium text-slate-700" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Técnico Responsável</label>
              <input type="text" name="tecnico" defaultValue={registro.tecnico} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 transition-all font-medium text-slate-700 uppercase" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Status da O.S. *</label>
              <select name="status" defaultValue={registro.status} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 transition-all font-black text-slate-700 cursor-pointer appearance-none">
                <option value="RECEBIDO">RECEBIDO (Na Loja)</option>
                <option value="EM ANDAMENTO">EM ANDAMENTO (No Laboratório)</option>
                <option value="CONCLUÍDO">CONCLUÍDO (Pronto para Entrega)</option>
                <option value="ENTREGUE">ENTREGUE (Finalizado)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. DATAS E VALORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-slate-400" /> Prazos</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data de Entrada *</label><input type="date" name="dataEntrada" defaultValue={formatarData(registro.dataEntrada)} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Previsão de Entrega</label><input type="date" name="dataEntregaPrevista" defaultValue={formatarData(registro.dataEntregaPrevista)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-bold text-slate-800" /></div>
             </div>
          </div>

          <div className="space-y-4">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><CircleDollarSign className="h-5 w-5 text-emerald-600" /> Pagamento</h2>
             <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">PIX (R$)</label><input type="number" step="0.01" name="valorPix" value={pix} onChange={e => setPix(Number(e.target.value))} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-slate-800" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Espécie</label><input type="number" step="0.01" name="valorEspecie" value={especie} onChange={e => setEspecie(Number(e.target.value))} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-slate-800" /></div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cartão</label><input type="number" step="0.01" name="valorCartao" value={cartao} onChange={e => setCartao(Number(e.target.value))} className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold text-slate-800" /></div>
                </div>
                <div className="bg-emerald-100/50 border border-emerald-200 p-4 rounded-xl flex justify-between items-center shadow-sm mt-2">
                  <span className="font-black text-emerald-900 text-xs uppercase tracking-widest">Valor Total</span>
                  <span className="font-black text-emerald-700 text-2xl">R$ {total.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100 mt-6">
          <BotaoSubmit texto="Guardar Alterações" icone={<Save className="h-5 w-5" />} cor="indigo" />
        </div>
      </form>
    </div>
  );
}