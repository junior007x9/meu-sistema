import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, Glasses, Wrench, QrCode, Wallet, CreditCard } from 'lucide-react';
import { db } from '@/db';
import { clientes } from '@/db/schema';
import { criarOrdemServico } from '@/actions/ordens';
import { asc } from 'drizzle-orm';

export default async function NovaOSPage() {
  const listaClientes = await db.select().from(clientes).orderBy(asc(clientes.nome));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/uti-oculos" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Abertura de Ticket (OS)</h1>
          <p className="text-sm text-slate-500">Registrar entrada de óculos e serviços realizados.</p>
        </div>
      </div>

      <form action={criarOrdemServico} className="space-y-6">
        
        {/* BLOCO 1: CLIENTE */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <User className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Identificação do Cliente</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Selecionar Cliente Cadastrado *</label>
            <select name="clienteId" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-medium">
              <option value="">Clique aqui para selecionar o dono do óculos...</option>
              {listaClientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} {cliente.telefone ? `— (Tel: ${cliente.telefone})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BLOCO 2: DADOS DO ÓCULOS E DEFEITO */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Glasses className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Dados da Armação</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Modelo / Marca / Cor da Armação</label>
            <input type="text" name="modeloArmacao" className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Ex: Ray-Ban Aviador Dourado" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Relato do Defeito (O que aconteceu?) *</label>
            <textarea name="descricaoDefeito" required rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Ex: Haste direita quebrada, faltando parafuso."></textarea>
          </div>
        </div>

        {/* BLOCO 3: SERVIÇOS E PAGAMENTO */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-500"></div>
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Wrench className="h-5 w-5 text-yellow-500" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Serviços e Orçamento</h2>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Serviço Realizado (O que foi feito?)</label>
            <input type="text" name="servicoRealizado" className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Ex: Solda na haste, troca de lentes, alinhamento..." />
          </div>

          <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 mt-6">Método de Pagamento</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2 uppercase">
                <QrCode className="h-4 w-4 text-emerald-600" /> PIX
              </label>
              <input type="number" step="0.01" name="valorPix" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 font-bold" placeholder="0.00" />
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2 uppercase">
                <Wallet className="h-4 w-4 text-amber-600" /> Espécie
              </label>
              <input type="number" step="0.01" name="valorEspecie" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-md outline-none focus:ring-2 focus:ring-amber-500 font-bold" placeholder="0.00" />
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2 uppercase">
                <CreditCard className="h-4 w-4 text-blue-600" /> Cartão
              </label>
              <input type="number" step="0.01" name="valorCartao" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-md outline-none focus:ring-2 focus:ring-blue-500 font-bold" placeholder="0.00" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-wider">
            * O sistema fará a soma automática do Valor Total Geral ao registrar a O.S.
          </p>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-3 pb-10">
          <Link href="/uti-oculos" className="px-6 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-3 rounded-lg font-bold shadow-md transition-all hover:scale-105">
            <Save className="h-5 w-5" /> Gerar Ticket e Atualizar Planilha
          </button>
        </div>

      </form>
    </div>
  );
}