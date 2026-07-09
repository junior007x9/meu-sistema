"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, MapPin, Briefcase, Stethoscope, Glasses } from 'lucide-react';
import { atualizarCliente } from '@/actions/clientes';
import BotaoSubmit from '@/components/BotaoSubmit';

export default function FormEditar({ registro }: { registro: any }) {
  const actionAtualizar = atualizarCliente.bind(null, registro.id);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0 mb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/clientes" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Ficha Clínica</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atualize os dados, a anamnese ou a receita do paciente {registro.nome}.</p>
        </div>
      </div>

      <form action={actionAtualizar} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 space-y-10">
        
        {/* 1. DADOS PESSOAIS */}
        <div className="space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><User className="h-5 w-5 text-blue-600" /> 1. Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="md:col-span-2 space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome Completo *</label><input type="text" name="nome" defaultValue={registro.nome} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold uppercase text-slate-800" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Data Nascimento</label><input type="date" name="dataNascimento" defaultValue={registro.dataNascimento} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Idade</label><input type="number" name="idade" defaultValue={registro.idade} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">CPF</label><input type="text" name="cpf" defaultValue={registro.cpf} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">RG</label><input type="text" name="rg" defaultValue={registro.rg} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Telefone / WhatsApp *</label><input type="text" name="telefone" defaultValue={registro.telefone} required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-bold text-slate-800" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label><input type="email" name="email" defaultValue={registro.email} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all font-medium text-slate-700 lowercase" /></div>
          </div>
        </div>

        {/* 2. ENDEREÇO */}
        <div className="space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><MapPin className="h-5 w-5 text-rose-500" /> 2. Endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">CEP</label><input type="text" name="cep" defaultValue={registro.cep} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 transition-all font-medium text-slate-700" /></div>
            <div className="md:col-span-2 space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Rua / Avenida</label><input type="text" name="endereco" defaultValue={registro.endereco} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 transition-all font-medium text-slate-700 uppercase" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Número</label><input type="text" name="numero" defaultValue={registro.numero} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Bairro</label><input type="text" name="bairro" defaultValue={registro.bairro} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 transition-all font-medium text-slate-700 uppercase" /></div>
            <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Cidade</label><input type="text" name="cidade" defaultValue={registro.cidade} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 transition-all font-medium text-slate-700 uppercase" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">UF</label><input type="text" name="uf" defaultValue={registro.uf} maxLength={2} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-rose-500 transition-all font-bold text-slate-700 uppercase" /></div>
          </div>
        </div>

        {/* 3. INFORMAÇÕES OCUPACIONAIS */}
        <div className="space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Briefcase className="h-5 w-5 text-amber-500" /> 3. Ocupação e Histórico</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Profissão</label><input type="text" name="profissao" defaultValue={registro.profissao} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Trabalha?</label>
               <select name="trabalha" defaultValue={registro.trabalha} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-medium text-slate-700 appearance-none"><option value="">Selecione...</option><option value="SIM">SIM</option><option value="NÃO">NÃO</option></select>
            </div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Onde Trabalha</label><input type="text" name="ondeTrabalha" defaultValue={registro.ondeTrabalha} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Telefone Trabalho</label><input type="text" name="telefoneTrabalho" defaultValue={registro.telefoneTrabalho} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Pensionista?</label>
               <select name="pensionista" defaultValue={registro.pensionista} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-medium text-slate-700 appearance-none"><option value="">Selecione...</option><option value="SIM">SIM</option><option value="NÃO">NÃO</option></select>
            </div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase ml-1">Pretende Consultar?</label>
               <select name="pretendeConsultar" defaultValue={registro.pretendeConsultar} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-amber-500 font-medium text-slate-700 appearance-none"><option value="">Selecione...</option><option value="SIM">SIM</option><option value="NÃO">NÃO</option></select>
            </div>
          </div>
        </div>

        {/* 4. ANAMNESE E SAÚDE */}
        <div className="space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Stethoscope className="h-5 w-5 text-emerald-600" /> 4. Dados Clínicos e Anamnese</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
            <div className="space-y-1.5"><label className="text-xs font-bold text-emerald-800 uppercase ml-1">Última Consulta Oftalmológica</label><input type="date" name="ultimaConsulta" defaultValue={registro.ultimaConsulta} className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium text-slate-700" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-emerald-800 uppercase ml-1">Motivo da Consulta</label><input type="text" name="motivoConsulta" defaultValue={registro.motivoConsulta} className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium text-slate-700" /></div>
            
            <div className="md:col-span-2 pt-4">
              <label className="text-xs font-bold text-emerald-800 uppercase ml-1 mb-3 block">Histórico Patológico</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 bg-white px-4 py-2 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-50"><input type="checkbox" name="hipertensao" value="true" defaultChecked={!!registro.hipertensao} className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" /><span className="text-sm font-bold text-slate-700">Hipertensão</span></label>
                <label className="flex items-center gap-2 bg-white px-4 py-2 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-50"><input type="checkbox" name="diabetes" value="true" defaultChecked={!!registro.diabetes} className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" /><span className="text-sm font-bold text-slate-700">Diabetes</span></label>
                <label className="flex items-center gap-2 bg-white px-4 py-2 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-50"><input type="checkbox" name="glaucoma" value="true" defaultChecked={!!registro.glaucoma} className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" /><span className="text-sm font-bold text-slate-700">Glaucoma</span></label>
                <label className="flex items-center gap-2 bg-white px-4 py-2 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-50"><input type="checkbox" name="catarata" value="true" defaultChecked={!!registro.catarata} className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" /><span className="text-sm font-bold text-slate-700">Catarata</span></label>
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5 mt-2"><label className="text-xs font-bold text-emerald-800 uppercase ml-1">Outras Doenças / Medicamentos</label><input type="text" name="outrasDoencas" defaultValue={registro.outrasDoencas} className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium text-slate-700" /></div>
            <div className="md:col-span-2 space-y-1.5"><label className="text-xs font-bold text-emerald-800 uppercase ml-1">Observações Gerais</label><textarea name="observacoes" defaultValue={registro.observacoes} rows={2} className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 transition-all font-medium text-slate-700"></textarea></div>
          </div>
        </div>

        {/* 5. RECEITA OFTALMOLÓGICA */}
        <div className="space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Glasses className="h-5 w-5 text-indigo-600" /> 5. Receituário Oftalmológico</h2>
          <div className="bg-indigo-50/30 p-2 sm:p-6 rounded-2xl border border-indigo-100 overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr><th className="w-24"></th><th className="p-3 font-black text-xs text-indigo-900 bg-indigo-100/50 uppercase border border-indigo-200">Esférico (ESF)</th><th className="p-3 font-black text-xs text-indigo-900 bg-indigo-100/50 uppercase border border-indigo-200">Cilíndrico (CIL)</th><th className="p-3 font-black text-xs text-indigo-900 bg-indigo-100/50 uppercase border border-indigo-200">Eixo</th><th className="p-3 font-black text-xs text-indigo-900 bg-indigo-100/50 uppercase border border-indigo-200">DNP</th><th className="p-3 font-black text-xs text-indigo-900 bg-indigo-100/50 uppercase border border-indigo-200">Altura</th></tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="p-3 font-black text-[10px] text-slate-500 uppercase border border-indigo-100 bg-slate-50">Longe OD</td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOdEsf" defaultValue={registro.longeOdEsf} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOdCil" defaultValue={registro.longeOdCil} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOdEixo" defaultValue={registro.longeOdEixo} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOdDnp" defaultValue={registro.longeOdDnp} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOdAltura" defaultValue={registro.longeOdAltura} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-[10px] text-slate-500 uppercase border border-indigo-100 bg-slate-50">Longe OE</td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOeEsf" defaultValue={registro.longeOeEsf} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOeCil" defaultValue={registro.longeOeCil} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOeEixo" defaultValue={registro.longeOeEixo} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOeDnp" defaultValue={registro.longeOeDnp} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="longeOeAltura" defaultValue={registro.longeOeAltura} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-[10px] text-slate-500 uppercase border border-indigo-100 bg-slate-50 mt-2 block w-full border-none">Perto OD</td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOdEsf" defaultValue={registro.pertoOdEsf} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOdCil" defaultValue={registro.pertoOdCil} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOdEixo" defaultValue={registro.pertoOdEixo} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOdDnp" defaultValue={registro.pertoOdDnp} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOdAltura" defaultValue={registro.pertoOdAltura} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-[10px] text-slate-500 uppercase border border-indigo-100 bg-slate-50">Perto OE</td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOeEsf" defaultValue={registro.pertoOeEsf} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOeCil" defaultValue={registro.pertoOeCil} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOeEixo" defaultValue={registro.pertoOeEixo} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOeDnp" defaultValue={registro.pertoOeDnp} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                  <td className="p-1 border border-indigo-100"><input type="text" name="pertoOeAltura" defaultValue={registro.pertoOeAltura} className="w-full text-center p-2 outline-none font-bold text-slate-800 focus:bg-indigo-50 rounded" /></td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 max-w-xs ml-auto">
               <label className="text-xs font-bold text-indigo-800 uppercase ml-1 flex items-center justify-end gap-2 mb-1">Adição <input type="text" name="adicao" defaultValue={registro.adicao} className="w-24 px-3 py-2 bg-white border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-center text-slate-800" placeholder="+ 0.00" /></label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 mt-8">
          <BotaoSubmit texto="Salvar Alterações da Ficha" icone={<Save className="h-5 w-5" />} cor="blue" />
        </div>
      </form>
    </div>
  );
}