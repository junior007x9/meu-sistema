import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, Glasses, Wrench } from 'lucide-react';
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
          <p className="text-sm text-slate-500">Registrar entrada de óculos para manutenção.</p>
        </div>
      </div>

      <form action={criarOrdemServico} className="space-y-6">
        
        {/* BLOCO 1: CLIENTE */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Identificação do Cliente</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Selecionar Cliente Cadastrado *</label>
            <select name="clienteId" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium">
              <option value="">Clique aqui para selecionar o dono do óculos...</option>
              {listaClientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} {cliente.telefone ? `— (Tel: ${cliente.telefone})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BLOCO 2: DADOS DO ÓCULOS E PROBLEMA */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Glasses className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Dados da Armação</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Modelo / Marca / Cor da Armação</label>
            <input type="text" name="modeloArmacao" className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Ray-Ban Aviador Dourado" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Relato do Defeito (O que aconteceu?) *</label>
            <textarea name="descricaoDefeito" required rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Haste direita quebrada, faltando parafuso na lente esquerda. Lentes muito arranhadas."></textarea>
          </div>
        </div>

        {/* BLOCO 3: ORÇAMENTO */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Serviço e Orçamento</h2>
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Valor Total do Conserto (R$)</label>
            <input type="number" step="0.01" name="valorTotal" className="w-full px-4 py-3 bg-green-50 border border-green-200 text-green-900 rounded-lg outline-none focus:ring-2 focus:ring-green-500 font-bold text-lg" placeholder="0.00" />
          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-3 pb-10">
          <Link href="/uti-oculos" className="px-6 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all hover:scale-105">
            <Save className="h-5 w-5" /> Gerar Ticket de OS
          </button>
        </div>

      </form>
    </div>
  );
}