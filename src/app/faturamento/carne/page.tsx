import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { controleCarne } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus, BookOpen, Wrench, Landmark, Activity, UserMinus, Handshake, Users, CalendarDays, Scale } from 'lucide-react';
import BotoesAcao from '@/components/BotoesAcao';

export default async function CarnesPage() {
  const registros = await db.select().from(controleCarne).orderBy(desc(controleCarne.id));

  const somaVendas = registros.reduce((acc, c) => acc + c.valorVenda, 0);
  const somaEntradas = registros.reduce((acc, c) => acc + c.valorEntrada, 0);
  
  const somaParcelas = Array(10).fill(0);
  let totalGeralTodasParcelas = 0;

  registros.forEach(c => {
    for (let i = 1; i <= 10; i++) {
      const valor = Number((c as any)[`p${i}Valor`]) || 0;
      somaParcelas[i - 1] += valor;
      totalGeralTodasParcelas += valor;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Faturamento por Mês</h1>
          <p className="text-slate-500 mt-1">Controle de entradas, repasses e serviços.</p>
        </div>
        <Link href="/faturamento/carne/novo" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-transform hover:-translate-y-0.5">
          <Plus className="h-5 w-5" /> Novo Carnê
        </Link>
      </div>

      {/* MENU DE NAVEGAÇÃO */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
         <Link href="/faturamento/joaozinho" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Wrench className="h-4 w-4" /> Serviços Joãozinho</Link>
         <Link href="/faturamento/conta-styllo" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Landmark className="h-4 w-4" /> Conta Styllo Ótica</Link>
         <Link href="/faturamento/conta-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Activity className="h-4 w-4" /> Conta UTI</Link>
         <Link href="/faturamento/carne" className="px-4 py-2 bg-white border-t-2 border-x-2 border-yellow-500 text-slate-900 font-black rounded-t-lg flex items-center gap-2 whitespace-nowrap shadow-sm"><BookOpen className="h-4 w-4" /> Carnês</Link>
         <Link href="/faturamento/devedores-uti" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><UserMinus className="h-4 w-4" /> Devedores UTI</Link>
         <Link href="/faturamento/servicos-indicados" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Handshake className="h-4 w-4" /> Serviços Indicados</Link>
         <Link href="/faturamento/funcionarios" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Users className="h-4 w-4" /> Funcionários</Link>
         <Link href="/faturamento/diario" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><CalendarDays className="h-4 w-4" /> Fat. Diário</Link>
         <Link href="/faturamento/balanco" className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-t-lg flex items-center gap-2 whitespace-nowrap transition-colors"><Scale className="h-4 w-4" /> Balanço</Link>
      </div>

      <div className="bg-white rounded-b-xl rounded-tr-xl border border-slate-300 shadow-sm overflow-hidden">
        {registros.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <BookOpen className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum carnê registrado</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[2800px] border border-slate-400">
              <thead>
                <tr>
                  <th colSpan={26} className="bg-slate-100 text-slate-800 py-3 font-black tracking-widest uppercase border border-slate-400 text-sm">
                    CONTROLE DE VENDAS EM CARNÊ
                  </th>
                </tr>
                <tr className="text-[10px] uppercase tracking-wider font-black text-black bg-slate-50">
                  <th className="p-2 border border-slate-400 w-12">ID</th>
                  <th className="p-2 border border-slate-400 w-24">ANO BASE</th>
                  <th className="p-2 border border-slate-400 w-48 text-left">CLIENTE</th>
                  <th className="p-2 border border-slate-400">CONTATO</th>
                  <th className="p-2 border border-slate-400">DATA DA COMPRA</th>
                  <th className="p-2 border border-slate-400">VALOR</th>
                  <th className="p-2 border border-slate-400">ENTRAD.</th>
                  {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                      <th className="p-2 border border-slate-400 bg-yellow-50 text-yellow-900">{i+1}ª (R$)</th>
                      <th className="p-2 border border-slate-400 bg-yellow-50/50">DATA</th>
                    </React.Fragment>
                  ))}
                  <th className="p-2 border border-slate-400 bg-slate-200">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors font-bold text-[11px] text-slate-800">
                    <td className="p-2 border border-slate-400 text-slate-400">{item.id}</td>
                    <td className="p-2 border border-slate-400 text-yellow-700 bg-yellow-50/30">CARNÊ {item.anoBase}</td>
                    <td className="p-2 border border-slate-400 text-left uppercase text-slate-900">{item.cliente}</td>
                    <td className="p-2 border border-slate-400">{item.contato || '-'}</td>
                    <td className="p-2 border border-slate-400">{item.dataCompra.split('-').reverse().join('/')}</td>
                    <td className="p-2 border border-slate-400 text-blue-700">R$ {item.valorVenda.toFixed(2)}</td>
                    <td className="p-2 border border-slate-400 text-emerald-700">R$ {item.valorEntrada.toFixed(2)}</td>
                    {[...Array(10)].map((_, i) => {
                      const v = Number((item as any)[`p${i+1}Valor`]);
                      const d = (item as any)[`p${i+1}Data`];
                      return (
                        <React.Fragment key={i}>
                          <td className="p-2 border border-slate-400 text-slate-600">{v > 0 ? v.toFixed(2) : '-'}</td>
                          <td className="p-2 border border-slate-400 text-slate-400 font-normal">{d ? d.split('-').reverse().join('/') : '-'}</td>
                        </React.Fragment>
                      );
                    })}
                    <td className="p-2 border border-slate-400 bg-white">
                      <BotoesAcao id={item.id} tabela="carne" caminho="/faturamento/carne" linkEditar={`/faturamento/carne/${item.id}/editar`} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                 <tr className="bg-yellow-300 text-slate-900 font-black text-xs">
                    <td colSpan={5} className="p-3 border border-slate-400 text-right uppercase">TOTAL:</td>
                    <td className="p-3 border border-slate-400">{somaVendas.toFixed(2)}</td>
                    <td className="p-3 border border-slate-400">{somaEntradas.toFixed(2)}</td>
                    {[...Array(10)].map((_, i) => (
                      <React.Fragment key={i}>
                        <td className="p-3 border border-slate-400">{somaParcelas[i] > 0 ? somaParcelas[i].toFixed(2) : '0,00'}</td>
                        <td className="p-3 border border-slate-400"></td>
                      </React.Fragment>
                    ))}
                    <td className="p-3 border border-slate-400 bg-slate-200"></td>
                 </tr>
                 <tr className="bg-[#92d050] text-black font-black text-sm uppercase tracking-widest text-center">
                    <td colSpan={7} className="p-3 border border-slate-400 text-right">TOTAL GERAL DE PARCELAS:</td>
                    <td colSpan={19} className="p-3 border border-slate-400 text-left pl-8 text-lg">
                      R$ {totalGeralTodasParcelas.toFixed(2)}
                    </td>
                    <td className="p-3 border border-slate-400 bg-slate-200"></td>
                 </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}