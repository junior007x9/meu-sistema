import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Wrench, Store, Bike, Building2 } from 'lucide-react';
import { salvarPrecoServico } from '@/actions/precos';

export default function NovoPrecoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/tabela-precos" className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Adicionar Serviço</h1>
          <p className="text-sm text-slate-500 font-medium">Cadastre um novo tipo de conserto e seus valores.</p>
        </div>
      </div>

      <form action={salvarPrecoServico} className="space-y-6">
        
        {/* NOME DO SERVIÇO */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <label className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-widest flex items-center gap-2">
            <Wrench className="h-5 w-5 text-yellow-500" /> Tipo de Conserto *
          </label>
          <input type="text" name="tipoConserto" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 font-bold" placeholder="Ex: Solda Simples, Troca de Plaquetas..." />
        </div>

        {/* PREÇOS POR CANAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* NA LOJA */}
          <div className="bg-[#ccffcc]/30 p-6 rounded-2xl border border-[#ccffcc] shadow-sm">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider"><Store className="h-5 w-5 text-green-600" /> Na Loja</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor PIX / Espécie (R$)</label>
                <input type="number" step="0.01" name="lojaPix" className="w-full px-3 py-2 bg-white border border-green-300 rounded outline-none focus:border-green-600 font-medium" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor Cartão (R$)</label>
                <input type="number" step="0.01" name="lojaCartao" className="w-full px-3 py-2 bg-white border border-green-300 rounded outline-none focus:border-green-600 font-medium" placeholder="0.00" />
              </div>
            </div>
          </div>

          {/* DELIVERY */}
          <div className="bg-[#fae3d2]/40 p-6 rounded-2xl border border-[#fae3d2] shadow-sm">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider"><Bike className="h-5 w-5 text-orange-600" /> Delivery</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor PIX / Espécie (R$)</label>
                <input type="number" step="0.01" name="deliveryPix" className="w-full px-3 py-2 bg-white border border-orange-300 rounded outline-none focus:border-orange-600 font-medium" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor Cartão (R$)</label>
                <input type="number" step="0.01" name="deliveryCartao" className="w-full px-3 py-2 bg-white border border-orange-300 rounded outline-none focus:border-orange-600 font-medium" placeholder="0.00" />
              </div>
            </div>
          </div>

          {/* ÓTICAS */}
          <div className="bg-[#dce8f5]/50 p-6 rounded-2xl border border-[#dce8f5] shadow-sm">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider"><Building2 className="h-5 w-5 text-blue-600" /> Óticas Parceiras</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor PIX / Espécie (R$)</label>
                <input type="number" step="0.01" name="oticasPix" className="w-full px-3 py-2 bg-white border border-blue-300 rounded outline-none focus:border-blue-600 font-medium" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor Cartão (R$)</label>
                <input type="number" step="0.01" name="oticasCartao" className="w-full px-3 py-2 bg-white border border-blue-300 rounded outline-none focus:border-blue-600 font-medium" placeholder="0.00" />
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-3 pb-10 mt-6">
          <Link href="/tabela-precos" className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-3 rounded-lg font-bold shadow-md transition-transform hover:scale-105">
            <Save className="h-5 w-5" /> Adicionar à Tabela
          </button>
        </div>

      </form>
    </div>
  );
}