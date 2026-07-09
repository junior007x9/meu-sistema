import React from 'react';
import Link from 'next/link';
import { 
  Users, ClipboardList, Package, ShoppingBag, Landmark, 
  Calculator, BadgeDollarSign, FileText, Wrench, BookOpen, 
  UserMinus, Handshake, Activity, Scale, Wallet, HeartPulse,
  TrendingUp, BarChart3, ArrowUpRight
} from 'lucide-react';

export default function DashboardPrincipal() {
  return (
    <div className="space-y-10 max-w-[1600px] mx-auto px-4 sm:px-6 animate-fade-in mb-16">
      
      {/* 1. SECCÃO DE BOAS-VINDAS / INTRODUÇÃO */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
            SISTEMA DE GESTÃO INTEGRADO V2.0
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white pt-2">
            Controlo Total da Sua Ótica
          </h1>
          <p className="text-slate-400 font-medium text-sm sm:text-base max-w-lg">
            Aceda rápida e eficientemente a todos os módulos operacionais, de laboratório e consolidações financeiras diárias.
          </p>
        </div>
      </div>

      {/* 2. CARD INDICADORES RÁPIDOS DE MONITORIZAÇÃO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Faturamento Geral</span>
            <p className="text-2xl font-black text-slate-800">Painel Ativo</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform"><BarChart3 className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Status do Caixa</span>
            <p className="text-2xl font-black text-emerald-600">Sincronizado</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform"><TrendingUp className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between group hover:border-purple-200 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Laboratório / O.S.</span>
            <p className="text-2xl font-black text-slate-800">Fila Ativa</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform"><Wrench className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Nível de Estoque</span>
            <p className="text-2xl font-black text-slate-800">Monitorizado</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform"><Package className="h-6 w-6" /></div>
        </div>
      </div>

      {/* 3. GRID PRINCIPAL DE MÓDULOS DE NEGÓCIO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BLOCO A: OPERACIONAL, CLIENTES & LABORATÓRIO */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
            <span>●</span> Gestão de Atendimento & Produção
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link href="/clientes" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex gap-4 group">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-fit"><Users className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors flex items-center gap-1">Clientes & Receitas <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Fichas clínicas, histórico visual e dados de anamnese.</p></div>
            </Link>

            <Link href="/os" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex gap-4 group">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl h-fit"><ClipboardList className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors flex items-center gap-1">Ordens de Serviço <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Controlo de montagens, consertos de óculos e prazos.</p></div>
            </Link>

            <Link href="/produtos" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex gap-4 group">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl h-fit"><Package className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors flex items-center gap-1">Estoque de Produtos <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Entrada de armações, lentes, controlo de custos e margens.</p></div>
            </Link>

            <Link href="/tabela-precos" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex gap-4 group">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl h-fit"><BadgeDollarSign className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors flex items-center gap-1">Tabela de Preços <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Lista referencial de consertos: Loja, Delivery e B2B.</p></div>
            </Link>

            <Link href="/simulacoes" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex gap-4 group sm:col-span-2">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl h-fit"><Calculator className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-cyan-700 transition-colors flex items-center gap-1">Simulador de Lentes & Margens <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Cálculo de lucratividade líquida deduzindo custos e taxas de maquininhas.</p></div>
            </Link>

          </div>
        </div>

        {/* BLOCO B: LOGÍSTICA & DESPESAS COMPLEXAS */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
            <span>●</span> Compras & Divisões Governamentais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Link href="/compras" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-rose-300 transition-all flex gap-4 group">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl h-fit"><ShoppingBag className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-rose-700 transition-colors flex items-center gap-1">Compras Online <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Acompanhamento de encomendas da internet e códigos de rastreio.</p></div>
            </Link>

            <Link href="/contas-mensais" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex gap-4 group">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl h-fit"><FileText className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-amber-700 transition-colors flex items-center gap-1">Contas & Repasses <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Divisão proporcional de faturas de energia (Equatorial) e água.</p></div>
            </Link>

            <Link href="/financeiro" className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex gap-4 group sm:col-span-2">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl h-fit"><Landmark className="h-5 w-5" /></div>
              <div className="space-y-1"><h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors flex items-center gap-1">Contas Bancárias & Categorias <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-400 font-medium leading-relaxed">Gestão de saldos iniciais de contas físicas, jurídicas e fluxos de transações por categorias.</p></div>
            </Link>

          </div>
        </div>

      </div>

      {/* 4. SECCÃO: NÚCLEO DE FATURAMENTO, SUB-CONTAS & BALANÇOS DIÁRIOS */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
          <span>●</span> Fluxo de Caixa, Sub-Contas & Balanços Consolidados
        </h2>
        
        <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUNA 1: MOVIMENTAÇÃO DIÁRIA */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg w-fit flex items-center gap-2">
              <Wallet className="h-3.5 w-3.5 text-indigo-600" /> Caixas Diários
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/faturamento/diario" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Faturamento Diário Geral</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <Link href="/faturamento/joaozinho" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Serviços Joãozinho (Faturamento Mês)</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <Link href="/faturamento/funcionarios" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Controle de Funcionários & Vales</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </div>
          </div>

          {/* COLUNA 2: BANCOS DO GRUPO */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg w-fit flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-blue-600" /> Movimentação de Contas
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/faturamento/conta-styllo" className="text-sm font-semibold text-slate-600 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Conta Styllo Ótica (Entradas/Saídas)</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <Link href="/faturamento/conta-uti" className="text-sm font-semibold text-slate-600 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Conta UTI dos Óculos</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <Link href="/faturamento/carne" className="text-sm font-semibold text-slate-600 hover:text-amber-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Controle de Carnês de Vendas</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </div>
          </div>

          {/* COLUNA 3: BALANÇOS & PARCERIAS */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg w-fit flex items-center gap-2">
              <Scale className="h-3.5 w-3.5 text-rose-600" /> Balanços de Fechamento
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/faturamento/devedores-uti" className="text-sm font-semibold text-slate-600 hover:text-red-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Clientes Devedores UTI</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <Link href="/faturamento/servicos-indicados" className="text-sm font-semibold text-slate-600 hover:text-purple-600 p-2 rounded-xl hover:bg-slate-50 transition-all flex justify-between items-center group">
                <span>Serviços Indicados / Comissões Óticas</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
              <div className="border-t border-slate-100 my-1 pt-1" />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Link href="/faturamento/balanco" className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1.5 rounded-lg hover:bg-indigo-600 transition-all">Anual</Link>
                <Link href="/faturamento/balanco-diario" className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1"><Wallet className="h-3 w-3" /> Diário Styllo</Link>
                <Link href="/faturamento/balanco-uti" className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-lg hover:bg-rose-100 transition-all flex items-center gap-1"><HeartPulse className="h-3 w-3 text-rose-500" /> Diário UTI</Link>
              </div>
          </div>

        </div>
      </div>
    </div>

    </div>
  );
}