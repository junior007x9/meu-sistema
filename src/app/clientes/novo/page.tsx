import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ClipboardList, Activity, Glasses } from 'lucide-react';
import { criarCliente } from '@/actions/clientes';

export default function FichaAnamnesePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/clientes" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ficha de Anamnese</h1>
          <p className="text-sm text-slate-500 font-medium">Cadastro Clínico e Prescrição Óptica</p>
        </div>
      </div>

      <form action={criarCliente} className="space-y-6">
        
        {/* BLOCO 1: DADOS PESSOAIS */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <ClipboardList className="h-5 w-5 text-blue-600" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Dados Pessoais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-12">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nome Completo *</label>
              <input type="text" name="nome" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
            </div>
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Data Nascimento</label>
              <input type="text" name="dataNascimento" placeholder="DD/MM/AAAA" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Idade</label>
              <input type="number" name="idade" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">CPF</label>
              <input type="text" name="cpf" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">RG</label>
              <input type="text" name="rg" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Endereço</label>
              <input type="text" name="endereco" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nº</label>
              <input type="text" name="numero" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Bairro</label>
              <input type="text" name="bairro" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">CEP</label>
              <input type="text" name="cep" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-7">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Cidade</label>
              <input type="text" name="cidade" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">UF</label>
              <input type="text" name="uf" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Telefone</label>
              <input type="text" name="telefone" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">E-mail</label>
              <input type="email" name="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Profissão</label>
              <input type="text" name="profissao" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Local de Trabalho</label>
              <input type="text" name="localTrabalho" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* BLOCO 2: ANAMNESE (Saúde) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Activity className="h-5 w-5 text-red-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Anamnese</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Última Consulta</label>
              <input type="text" name="ultimaConsulta" placeholder="Mês/Ano ou Data" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Motivo da Consulta</label>
              <input type="text" name="motivoConsulta" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase">Histórico de Saúde</label>
            <div className="flex flex-wrap gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="hipertensao" className="w-5 h-5 accent-red-500" />
                <span className="text-sm font-bold text-slate-700">Hipertensão</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="diabetes" className="w-5 h-5 accent-red-500" />
                <span className="text-sm font-bold text-slate-700">Diabetes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="glaucoma" className="w-5 h-5 accent-red-500" />
                <span className="text-sm font-bold text-slate-700">Glaucoma</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="catarata" className="w-5 h-5 accent-red-500" />
                <span className="text-sm font-bold text-slate-700">Catarata</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Outros (Especificar)</label>
              <input type="text" name="outrasDoencas" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Observações</label>
              <input type="text" name="observacoes" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* BLOCO 3: PRESCRIÇÃO (Grau) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-center gap-2 mb-2 border-b pb-3">
            <Glasses className="h-5 w-5 text-emerald-500" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Prescrição (Grau)</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 text-xs font-bold text-slate-600 uppercase border border-slate-200">
                  <th className="p-3 border border-slate-200 text-center w-24">Visão</th>
                  <th className="p-3 border border-slate-200 text-center w-16">Olho</th>
                  <th className="p-3 border border-slate-200 text-center">ESF</th>
                  <th className="p-3 border border-slate-200 text-center">CIL</th>
                  <th className="p-3 border border-slate-200 text-center">EIXO</th>
                  <th className="p-3 border border-slate-200 text-center">DNP</th>
                  <th className="p-3 border border-slate-200 text-center">ALTURA</th>
                </tr>
              </thead>
              <tbody>
                {/* LONGE */}
                <tr>
                  <td rowSpan={2} className="p-2 border border-slate-200 text-center font-bold text-slate-700 bg-slate-50 uppercase tracking-wider text-xs">Longe</td>
                  <td className="p-2 border border-slate-200 text-center font-bold text-slate-600">OD</td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOdEsf" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOdCil" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOdEixo" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOdDnp" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOdAltura" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 text-center font-bold text-slate-600">OE</td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOeEsf" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOeCil" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOeEixo" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOeDnp" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="longeOeAltura" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                </tr>
                
                {/* PERTO */}
                <tr>
                  <td rowSpan={2} className="p-2 border border-slate-200 text-center font-bold text-slate-700 bg-slate-50 uppercase tracking-wider text-xs">Perto</td>
                  <td className="p-2 border border-slate-200 text-center font-bold text-slate-600">OD</td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOdEsf" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOdCil" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOdEixo" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOdDnp" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOdAltura" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 text-center font-bold text-slate-600">OE</td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOeEsf" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOeCil" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOeEixo" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOeDnp" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                  <td className="p-1 border border-slate-200"><input type="text" name="pertoOeAltura" className="w-full text-center p-1.5 outline-none font-medium" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">ADIÇÃO:</label>
              <input type="text" name="adicao" className="w-32 text-center p-2 rounded border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-4 pb-12">
          <Link href="/clientes" className="px-8 py-3.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">Cancelar</Link>
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1">
            <Save className="h-6 w-6" /> Salvar Ficha
          </button>
        </div>

      </form>
    </div>
  );
}