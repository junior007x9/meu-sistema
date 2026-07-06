import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { faturamentoDiario, balancoDiarioUti, controleFuncionarios } from '@/db/schema';
import { Wrench, Landmark, Activity, BookOpen, UserMinus, Handshake, Users, CalendarDays, Scale, Wallet, HeartPulse, TrendingUp, Info, BarChart2 } from 'lucide-react';
import TutorialSistema from '@/components/TutorialSistema';

export default async function FaturamentoDashboardPage() {
  // Busca rápida de dados
  const fatStyllo = await db.select().from(faturamentoDiario);
  const fatUti = await db.select().from(balancoDiarioUti);
  const despesasFunc = await db.select().from(controleFuncionarios);

  // Cálculos Básicos
  const liquidoStyllo = fatStyllo.reduce((acc, curr) => {
    const despesas = curr.compra + curr.saidaDinheiro + curr.saidaPix + curr.dizimo;
    return acc + (curr.total - despesas);
  }, 0);

  const liquidoUti = fatUti.reduce((acc, curr) => {
    const entradas = curr.entradaDinheiro + curr.entradaCredito + curr.entradaDebito + curr.entradaPix;
    return acc + (entradas - curr.compras - curr.saidaPagamentos);
  }, 0);

  const totalFuncionarios = despesasFunc.reduce((acc, curr) => acc + curr.totalGeral, 0);

  // ==========================================
  // MOTOR DO GRÁFICO (Cálculo de Lucro Mensal)
  // ==========================================
  const mesesOrdem = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];

  const dadosGrafico = mesesOrdem.map(mes => {
    // Calcula o líquido da Styllo neste mês
    const stylloMes = fatStyllo.filter(f => f.mesReferencia === mes).reduce((acc, curr) => {
      const despesas = curr.compra + curr.saidaDinheiro + curr.saidaPix + curr.dizimo;
      return acc + (curr.total - despesas);
    }, 0);
    
    // Calcula o líquido da UTI neste mês
    const utiMes = fatUti.filter(f => f.mesReferencia === mes).reduce((acc, curr) => {
      const entradas = curr.entradaDinheiro + curr.entradaCredito + curr.entradaDebito + curr.entradaPix;
      return acc + (entradas - curr.compras - curr.saidaPagamentos);
    }, 0);

    return { 
      mes: mes.substring(0, 3), // Pega apenas "JAN", "FEV", etc.
      styllo: Math.max(0, stylloMes), // Evita barras negativas quebrando o layout
      uti: Math.max(0, utiMes),
      total: Math.max(0, stylloMes) + Math.max(0, utiMes) 
    };
  });

  // Encontra o mês com maior lucro para escalar as barras (100% de altura)
  const maxValor = Math.max(...dadosGrafico.map(d => d.styllo), ...dadosGrafico.map(d => d.uti), 1); 

  const passosAjuda = [
    { elemento: 'h1', titulo: 'Painel Central', texto: 'Bem-vindo ao centro de comando financeiro. Aqui você tem uma visão panorâmica da saúde da ótica.' },
    { elemento: '.cards-macro', titulo: 'Indicadores', texto: 'Estes cartões somam todo o faturamento líquido da Styllo, da UTI e as despesas com o pessoal.' },
    { elemento: '.grafico-vis', titulo: 'Gráfico Interativo', texto: 'Acompanhe visualmente quem deu mais lucro a cada mês. Passe o rato ou o dedo sobre as barras para ver os valores exatos!' },
    { elemento: '.grid-modulos', titulo: 'Módulos', texto: 'Clique em qualquer um dos 11 blocos abaixo para acessar a área específica de lançamento.' }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      {/* HEADER DE BOAS-VINDAS */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
          <TrendingUp className="h-64 w-64" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Central de Faturamento</h1>
          <p className="text-slate-300 font-medium max-w-xl leading-relaxed">
            Selecione um dos módulos abaixo para gerir os dados ou acompanhe o crescimento financeiro das suas duas unidades em tempo real.
          </p>
        </div>
      </div>

      {/* INDICADORES MACRO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cards-macro">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 bg-blue-600 rounded-bl-full"><Landmark className="h-24 w-24" /></div>
           <p className="text-xs font-black uppercase text-slate-500 mb-1 tracking-widest flex items-center gap-2"><Landmark className="h-4 w-4 text-blue-600"/> Líquido Styllo Ótica</p>
           <h2 className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">R$ {liquidoStyllo.toFixed(2)}</h2>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 bg-rose-600 rounded-bl-full"><HeartPulse className="h-24 w-24" /></div>
           <p className="text-xs font-black uppercase text-slate-500 mb-1 tracking-widest flex items-center gap-2"><HeartPulse className="h-4 w-4 text-rose-600"/> Líquido UTI Óculos</p>
           <h2 className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">R$ {liquidoUti.toFixed(2)}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 bg-emerald-600 rounded-bl-full"><Users className="h-24 w-24" /></div>
           <p className="text-xs font-black uppercase text-slate-500 mb-1 tracking-widest flex items-center gap-2"><Users className="h-4 w-4 text-emerald-600"/> Despesas c/ Equipe</p>
           <h2 className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">R$ {totalFuncionarios.toFixed(2)}</h2>
        </div>
      </div>

      {/* GRÁFICO VISUAL NATIVO (Comparativo Styllo vs UTI) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm grafico-vis">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-8">
          <BarChart2 className="h-5 w-5 text-indigo-600" /> Desempenho Mensal (Lucro Líquido)
        </h3>
        
        <div className="h-64 flex items-end gap-1 sm:gap-4 overflow-x-auto scrollbar-none pb-2 select-none">
          {dadosGrafico.map((d, i) => (
            <div key={i} className="flex-1 min-w-[40px] flex flex-col justify-end items-center group relative cursor-pointer">
              
              {/* Tooltip Flutuante */}
              <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] sm:text-xs font-bold py-1.5 px-3 rounded-lg pointer-events-none whitespace-nowrap z-10 shadow-xl flex flex-col items-center gap-1">
                 <span className="text-blue-300">Styllo: R$ {d.styllo.toFixed(2)}</span>
                 <span className="text-rose-300">UTI: R$ {d.uti.toFixed(2)}</span>
                 <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1"></div>
              </div>

              {/* Área das Barras */}
              <div className="w-full flex justify-center items-end gap-0.5 sm:gap-1.5 h-[200px] border-b border-slate-200 pb-2 relative">
                 {/* Barra Styllo */}
                 <div 
                   style={{ height: `${(d.styllo / maxValor) * 100}%` }} 
                   className="w-full max-w-[18px] sm:max-w-[24px] bg-gradient-to-t from-blue-700 to-[#00bdf2] rounded-t-md transition-all duration-1000 delay-100 ease-out min-h-[4px] group-hover:brightness-125 shadow-sm"
                 ></div>
                 
                 {/* Barra UTI */}
                 <div 
                   style={{ height: `${(d.uti / maxValor) * 100}%` }} 
                   className="w-full max-w-[18px] sm:max-w-[24px] bg-gradient-to-t from-red-700 to-rose-500 rounded-t-md transition-all duration-1000 delay-200 ease-out min-h-[4px] group-hover:brightness-125 shadow-sm"
                 ></div>
              </div>
              <span className="text-[9px] sm:text-xs font-black text-slate-400 mt-3">{d.mes}</span>
            </div>
          ))}
        </div>

        {/* Legenda do Gráfico */}
        <div className="flex justify-center gap-6 mt-4 pt-4">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00bdf2] shadow-sm"></div><span className="text-xs font-black uppercase tracking-widest text-slate-600">Styllo Ótica</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm"></div><span className="text-xs font-black uppercase tracking-widest text-slate-600">UTI dos Óculos</span></div>
        </div>
      </div>

      {/* GRID DE ACESSO RÁPIDO AOS 11 MÓDULOS */}
      <div>
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-indigo-600" /> Módulos do Sistema
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 grid-modulos">
          
          <Link href="/faturamento/diario" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><CalendarDays className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Fat. Diário</p><p className="text-[10px] text-slate-500 mt-0.5">Entradas, Dízimo e Caixa</p></div>
          </Link>

          <Link href="/faturamento/balanco-diario" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Wallet className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Balanço Diário</p><p className="text-[10px] text-slate-500 mt-0.5">Conferência Styllo Ótica</p></div>
          </Link>

          <Link href="/faturamento/balanco-uti" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors"><HeartPulse className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Balanço UTI</p><p className="text-[10px] text-slate-500 mt-0.5">Conferência UTI dos Óculos</p></div>
          </Link>

          <Link href="/faturamento/balanco" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-700 group-hover:bg-slate-700 group-hover:text-white transition-colors"><Scale className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Balanço Anual</p><p className="text-[10px] text-slate-500 mt-0.5">Visão Macroscópica</p></div>
          </Link>

          <Link href="/faturamento/carne" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors"><BookOpen className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Carnês</p><p className="text-[10px] text-slate-500 mt-0.5">Vendas e Parcelas a Receber</p></div>
          </Link>

          <Link href="/faturamento/devedores-uti" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-red-500">
            <div className="p-3 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors"><UserMinus className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Devedores UTI</p><p className="text-[10px] text-slate-500 mt-0.5">Controle de Inadimplência</p></div>
          </Link>

          <Link href="/faturamento/funcionarios" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Users className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Funcionários</p><p className="text-[10px] text-slate-500 mt-0.5">Folha e Estágios</p></div>
          </Link>

          <Link href="/faturamento/servicos-indicados" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors"><Handshake className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Serv. Indicados</p><p className="text-[10px] text-slate-500 mt-0.5">Comissões de Parcerias</p></div>
          </Link>

          <Link href="/faturamento/joaozinho" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">
            <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors"><Wrench className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Serviços Joãozinho</p><p className="text-[10px] text-slate-500 mt-0.5">Montagens e Colorações</p></div>
          </Link>

          <Link href="/faturamento/conta-styllo" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
            <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-colors"><Landmark className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Conta Styllo</p><p className="text-[10px] text-slate-500 mt-0.5">Conta Bancária Principal</p></div>
          </Link>

          <Link href="/faturamento/conta-uti" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-100 transition-all group flex flex-col items-center text-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
            <div className="p-3 bg-pink-50 rounded-xl text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors"><Activity className="h-6 w-6" /></div>
            <div><p className="font-black text-slate-800 text-sm">Conta UTI</p><p className="text-[10px] text-slate-500 mt-0.5">Conta Bancária UTI</p></div>
          </Link>

        </div>
      </div>

      <TutorialSistema passos={passosAjuda} idContexto="dashboard-faturamento" />
    </div>
  );
}