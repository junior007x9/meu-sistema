import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { faturamentoDiario } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, CalendarDays, Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, Scale, Wallet } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';
import TutorialSistema from '@/components/TutorialSistema';

export default async function FaturamentoDiarioPage() {
  const registros = await db.select().from(faturamentoDiario).orderBy(desc(faturamentoDiario.data));

  const sCompra = registros.reduce((a, b) => a + b.compra, 0);
  const sEspecie = registros.reduce((a, b) => a + b.especie, 0);
  const sCredito = registros.reduce((a, b) => a + b.credito, 0);
  const sDebito = registros.reduce((a, b) => a + b.debito, 0);
  const sPix = registros.reduce((a, b) => a + b.pix, 0);
  const sTotal = registros.reduce((a, b) => a + b.total, 0);
  const sSaidaDinheiro = registros.reduce((a, b) => a + b.saidaDinheiro, 0);
  const sSaidaPix = registros.reduce((a, b) => a + b.saidaPix, 0);
  const sDizimo = registros.reduce((a, b) => a + b.dizimo, 0);
  const sFatEspecie = registros.reduce((a, b) => a + b.fatEspecie, 0);

  const despesasCaixa = sSaidaDinheiro + sSaidaPix;
  const totalLiquido = sTotal - sCompra - sDizimo - despesasCaixa;

  // PASSOS DO TUTORIAL DO PROPRIO ECRÃ
  const passosAjuda = [
    { elemento: 'h1', titulo: 'Faturamento Diário', texto: 'Este módulo serve para gerenciar todas as entradas de dinheiro da ótica que ocorrem diariamente, filtradas por espécie, cartões e PIX.' },
    { elemento: '.grid-resumos', titulo: 'Resumo de Caixa', texto: 'Aqui você vê em tempo real o cálculo total bruto, o valor exato a separar para o dízimo da loja e o faturamento líquido restante.' },
    { elemento: 'table', titulo: 'Tabela Inteligente', texto: 'A planilha exibe as linhas completas. Você pode navegar livremente e rolar para o lado caso esteja acessando pelo telemóvel.' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in">
      
      {/* HEADER PREMIUM */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">Faturamento Diário</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Gestão inteligente de entradas, saídas, dízimos e lucros.</p>
        </div>
        <Link 
          href="/faturamento/diario/novo" 
          className="w-full sm:w-auto text-center bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
        >
          <Plus className="h-4 w-4" /> Novo Faturamento
        </Link>
      </div>

      {/* ABAS PREMIUM COM ROLAGEM SUAVE NO MOBILE */}
      <div className="flex gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none snap-x mask-linear-edge">
         <Link href="/faturamento/joaozinho" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Landmark className="h-4 w-4" /> Conta Styllo</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Handshake className="h-4 w-4" /> Serv. Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-xl flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent hover:border-slate-300 transition-all"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2.5 bg-white border-t border-x border-slate-300 text-indigo-600 font-black rounded-t-xl flex items-center gap-2 whitespace-nowrap shadow-sm border-b-2 border-b-white z-10 -mb-[2px]"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Scale className="h-4 w-4" /> Balanço</Link>
         <Link href="/faturamento/balanco-diario" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Wallet className="h-4 w-4" /> Balanço Diário</Link>
         <Link href="/faturamento/balanco-uti" className="px-4 py-2.5 bg-slate-50 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4" /> Balanço UTI</Link>
      </div>

      {/* BLOCO DE RESUMO FINANCEIRO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 grid-resumos">
        <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-2xl shadow-sm text-center transition-all hover:shadow-md">
           <p className="text-[10px] sm:text-xs font-black uppercase text-emerald-800 tracking-wider">TOTAL BRUTO</p>
           <h3 className="text-lg sm:text-2xl font-black text-emerald-950 mt-1">R$ {sTotal.toFixed(2)}</h3>
        </div>
        <div className="bg-green-50/60 border border-green-200/80 p-4 rounded-2xl shadow-sm text-center transition-all hover:shadow-md">
           <p className="text-[10px] sm:text-xs font-black uppercase text-green-800 tracking-wider">DÍZIMO (10%)</p>
           <h3 className="text-lg sm:text-2xl font-black text-green-950 mt-1">R$ {sDizimo.toFixed(2)}</h3>
        </div>
        <div className="bg-rose-50/60 border border-rose-200/80 p-4 rounded-2xl shadow-sm text-center transition-all hover:shadow-md">
           <p className="text-[10px] sm:text-xs font-black uppercase text-rose-800 tracking-wider">DESPESAS CAIXA</p>
           <h3 className="text-lg sm:text-2xl font-black text-rose-950 mt-1">R$ {despesasCaixa.toFixed(2)}</h3>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm text-center transition-all hover:shadow-md">
           <p className="text-[10px] sm:text-xs font-black uppercase text-slate-800 tracking-wider">TOTAL LÍQUIDO</p>
           <h3 className="text-lg sm:text-2xl font-black text-slate-950 mt-1">R$ {totalLiquido.toFixed(2)}</h3>
        </div>
      </div>

      {/* PLANILHA INTEGRA E ROLÁVEL NO TELEMÓVEL */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <CalendarDays className="h-12 w-16 text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-base font-black text-slate-900">Sem lançamentos registrados</h3>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin overflow-y-hidden select-none">
            <table className="w-full text-center border-collapse min-w-[1300px]">
              <thead>
                <tr className="text-[10px] uppercase font-black text-slate-700 bg-slate-50 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 w-24" rowSpan={2}>DATA</th>
                  <th className="p-3 border-r border-slate-200 text-left" rowSpan={2}>VENDAS / SERVIÇOS</th>
                  <th className="p-3 border-r border-slate-200 w-24" rowSpan={2}>R$ COMPRA</th>
                  <th className="p-3 border-r border-slate-200" colSpan={4}>FORMA DE PAGAMENTO</th>
                  <th className="p-3 border-r border-slate-200 w-28 bg-emerald-50 text-emerald-900" rowSpan={2}>TOTAL</th>
                  <th className="p-3 border-r border-slate-200" colSpan={2}>SAÍDA PAGAMENTO</th>
                  <th className="p-3 border-r border-slate-200 w-24 text-green-800 bg-green-50" rowSpan={2}>DÍZIMO</th>
                  <th className="p-3 border-r border-slate-200 w-24 bg-blue-50 text-blue-900" rowSpan={2}>EM ESPÉCIE</th>
                  <th className="p-3 bg-slate-50 w-24" rowSpan={2}>AÇÕES</th>
                </tr>
                <tr className="text-[9px] uppercase font-black text-slate-500 bg-slate-50/50 border-b border-slate-200">
                  <th className="p-2 border-r border-slate-200 w-24">R$ ESPÉCIE</th>
                  <th className="p-2 border-r border-slate-200 w-24">CRÉDITO</th>
                  <th className="p-2 border-r border-slate-200 w-24">DÉBITO</th>
                  <th className="p-2 border-r border-slate-200 w-24">R$ PIX</th>
                  <th className="p-2 border-r border-slate-200 w-20 text-red-600">R$</th>
                  <th className="p-2 border-r border-slate-200 w-20 text-red-600">PIX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 border-r border-slate-100 text-slate-900">{item.data.split('-').reverse().join('/')}</td>
                    <td className="p-3 border-r border-slate-100 text-left uppercase text-slate-600 max-w-[200px] truncate">{item.descricao}</td>
                    <td className="p-3 border-r border-slate-100 text-orange-600">R$ {item.compra.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">R$ {item.especie.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">R$ {item.credito.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">R$ {item.debito.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-slate-600">R$ {item.pix.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 bg-emerald-50/30 text-emerald-900 font-black text-sm">R$ {item.total.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-red-600">R$ {item.saidaDinheiro.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-red-600">R$ {item.saidaPix.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-green-700 bg-green-50/30">R$ {item.dizimo.toFixed(2)}</td>
                    <td className="p-3 border-r border-slate-100 text-blue-800 bg-blue-50/30">R$ {item.fatEspecie.toFixed(2)}</td>
                    <td className="p-2 bg-white"><BotoesAcao id={item.id} tabela="diario" caminho="/faturamento/diario" linkEditar={`/faturamento/diario/${item.id}/editar`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ATIVAÇÃO DO ASSISTENTE DE TUTORIAL DESSE ECRÃ */}
      <TutorialSistema passos={passosAjuda} idContexto="faturamento-diario" />
    </div>
  );
}