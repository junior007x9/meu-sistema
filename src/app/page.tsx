import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clientes, ordensServico, produtos, faturamentoDiario } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { 
  LayoutDashboard, Users, Wrench, Package, 
  TrendingUp, ArrowRight, PlusCircle, Clock, 
  ShoppingBag, Landmark
} from 'lucide-react';

export default async function PainelGeralPage() {
  // =========================================================
  // 1. BUSCA DE DADOS NO BANCO PARA O RESUMO (RÁPIDO E SEGURO)
  // =========================================================
  
  // Clientes
  const listaClientes = await db.select().from(clientes);
  const totalClientes = listaClientes.length;

  // Ordens de Serviço (Laboratório / UTI)
  const listaOS = await db.select().from(ordensServico).orderBy(desc(ordensServico.id));
  const osPendentes = listaOS.filter(os => os.status === 'RECEBIDO' || os.status === 'EM ANDAMENTO');
  const totalOsPendentes = osPendentes.length;
  const ultimasOS = listaOS.slice(0, 5);

  // Estoque (Produtos)
  const listaProdutos = await db.select().from(produtos);
  const totalEstoque = listaProdutos.reduce((acc, prod) => acc + (prod.estoque || 0), 0);
  const produtosBaixoEstoque = listaProdutos.filter(prod => prod.estoque <= 2).length;

  // Faturamento Diário (Últimos registos)
  const ultimosFaturamentos = await db.select().from(faturamentoDiario).orderBy(desc(faturamentoDiario.data)).limit(5);

  // =========================================================
  // 2. CONSTRUÇÃO DA INTERFACE (UI) RESPONSIVA
  // =========================================================
  return (
    <div className="space-y-6 sm:space-y-8 max-w-[1600px] mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      {/* CABEÇALHO DO DASHBOARD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <LayoutDashboard className="h-64 w-64 text-slate-900" />
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 sm:p-4 bg-slate-900 text-yellow-500 rounded-2xl shadow-lg shadow-slate-900/20">
            <LayoutDashboard className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">Painel de Controle</h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">Bem-vindo(a) ao sistema de gestão da <strong className="text-slate-800">Styllo Ótica & UTI dos Óculos</strong>.</p>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-auto mt-4 md:mt-0 flex gap-3">
          <Link href="/os/novo" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            <PlusCircle className="h-5 w-5" /> Nova O.S.
          </Link>
          <Link href="/faturamento/diario/novo" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            <TrendingUp className="h-5 w-5" /> Fechar Caixa
          </Link>
        </div>
      </div>

      {/* CARTÕES DE INDICADORES (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: UTI DOS ÓCULOS */}
        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform"><Wrench className="h-6 w-6" /></div>
            <span className="text-xs font-black tracking-widest uppercase text-purple-400 bg-white px-3 py-1 rounded-full border border-purple-100">Laboratório</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800">{totalOsPendentes}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase mt-1">O.S. na Fila / Pendentes</p>
          </div>
          <Link href="/os" className="mt-4 text-xs font-bold text-purple-600 flex items-center gap-1 hover:gap-2 transition-all w-fit">Ver fila de trabalho <ArrowRight className="h-3 w-3" /></Link>
        </div>

        {/* Card 2: ESTOQUE E PRODUTOS */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform"><Package className="h-6 w-6" /></div>
            {produtosBaixoEstoque > 0 && <span className="text-[10px] font-black tracking-widest uppercase text-white bg-rose-500 px-3 py-1 rounded-full shadow-sm animate-pulse">{produtosBaixoEstoque} em falta</span>}
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800">{totalEstoque}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase mt-1">Itens no Estoque</p>
          </div>
          <Link href="/produtos" className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all w-fit">Gerir inventário <ArrowRight className="h-3 w-3" /></Link>
        </div>

        {/* Card 3: FATURAMENTO */}
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform"><Landmark className="h-6 w-6" /></div>
            <span className="text-xs font-black tracking-widest uppercase text-emerald-500 bg-white px-3 py-1 rounded-full border border-emerald-100">Financeiro</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800">{ultimosFaturamentos.length}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase mt-1">Dias Lançados no Mês</p>
          </div>
          <Link href="/faturamento/diario" className="mt-4 text-xs font-bold text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all w-fit">Ver faturamento diário <ArrowRight className="h-3 w-3" /></Link>
        </div>

        {/* Card 4: CLIENTES */}
        <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl group-hover:scale-110 transition-transform"><Users className="h-6 w-6" /></div>
            <span className="text-xs font-black tracking-widest uppercase text-amber-500 bg-white px-3 py-1 rounded-full border border-amber-100">CRM</span>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800">{totalClientes}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase mt-1">Fichas de Clientes</p>
          </div>
          <Link href="/clientes" className="mt-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:gap-2 transition-all w-fit">Aceder cadastros <ArrowRight className="h-3 w-3" /></Link>
        </div>

      </div>

      {/* ÁREA DE TABELAS RECENTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* TABELA: Últimas Ordens de Serviço */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" /> O.S. Recentes
            </h2>
            <Link href="/os" className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors">Ver todas</Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border-b border-slate-100">
                  <th className="p-4">Defeito / Aparelho</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Valor Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-sm text-slate-700">
                {ultimasOS.length === 0 ? (
                  <tr><td colSpan={3} className="p-8 text-center text-slate-500">Nenhuma ordem de serviço.</td></tr>
                ) : (
                  ultimasOS.map(os => (
                    <tr key={os.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900 uppercase truncate max-w-[200px] sm:max-w-[300px]">{os.descricaoDefeito}</p>
                        {/* AQUI ESTÁ A PROTEÇÃO CONTRA DATAS NULAS */}
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                          {os.dataEntrada ? new Date(os.dataEntrada).toLocaleDateString('pt-BR') : 'SEM DATA'}
                        </p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase
                          ${os.status === 'CONCLUÍDO' ? 'bg-emerald-100 text-emerald-700' : 
                            os.status === 'EM ANDAMENTO' ? 'bg-blue-100 text-blue-700' :
                            os.status === 'ENTREGUE' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'}`}>
                          {os.status}
                        </span>
                      </td>
                      <td className="p-4 text-right font-black text-slate-800">
                        R$ {(os.valorTotal || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABELA: Últimos Registos de Faturamento */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-500" /> Movimentos Recentes
            </h2>
            <Link href="/faturamento/diario" className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">Ver histórico</Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest border-b border-slate-100">
                  <th className="p-4">Descrição / Ref</th>
                  <th className="p-4 text-center">Saídas (Despesas)</th>
                  <th className="p-4 text-right">Líquido Gaveta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-sm text-slate-700">
                {ultimosFaturamentos.length === 0 ? (
                  <tr><td colSpan={3} className="p-8 text-center text-slate-500">Nenhum faturamento lançado.</td></tr>
                ) : (
                  ultimosFaturamentos.map(fat => (
                    <tr key={fat.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900 uppercase truncate max-w-[150px] sm:max-w-[250px]">{fat.descricao}</p>
                        {/* AQUI TAMBÉM PROTEGEMOS A DATA */}
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                          {fat.data ? new Date(fat.data).toLocaleDateString('pt-BR') : 'SEM DATA'}
                        </p>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-bold text-rose-600 text-xs flex items-center justify-center gap-1">
                           {(fat.saidaDinheiro || 0) > 0 && <span>Din: {(fat.saidaDinheiro || 0).toFixed(0)}</span>}
                           {(fat.saidaPix || 0) > 0 && <span>PIX: {(fat.saidaPix || 0).toFixed(0)}</span>}
                           {!(fat.saidaDinheiro) && !(fat.saidaPix) && <span className="text-slate-300">-</span>}
                        </span>
                      </td>
                      <td className="p-4 text-right font-black text-emerald-700 text-base">
                        R$ {(fat.fatEspecie || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}