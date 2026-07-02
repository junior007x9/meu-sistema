import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { ordensServico, clientes } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Plus, Search, Wrench, Wallet, QrCode, CreditCard } from 'lucide-react';

export default async function UTIPage() {
  const listaOS = await db
    .select({
      id: ordensServico.id,
      clienteNome: clientes.nome,
      clienteTelefone: clientes.telefone,
      modelo: ordensServico.modeloArmacao,
      servicoRealizado: ordensServico.servicoRealizado,
      defeito: ordensServico.descricaoDefeito,
      status: ordensServico.status,
      valorTotal: ordensServico.valorTotal,
      valorPix: ordensServico.valorPix,
      valorEspecie: ordensServico.valorEspecie,
      valorCartao: ordensServico.valorCartao,
      data: ordensServico.dataEntrada,
    })
    .from(ordensServico)
    .leftJoin(clientes, eq(ordensServico.clienteId, clientes.id))
    .orderBy(desc(ordensServico.dataEntrada));

  // A Mágica: O sistema calcula os totais de tudo automaticamente
  const somaPix = listaOS.reduce((acc, os) => acc + (os.valorPix || 0), 0);
  const somaEspecie = listaOS.reduce((acc, os) => acc + (os.valorEspecie || 0), 0);
  const somaCartao = listaOS.reduce((acc, os) => acc + (os.valorCartao || 0), 0);
  const somaGeral = somaPix + somaEspecie + somaCartao;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Serviços de Manutenção</h1>
          <p className="text-slate-500 mt-1">Fechamento de caixa e relatório da UTI dos Óculos.</p>
        </div>
        <Link href="/uti-oculos/nova" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center">
          <Plus className="h-5 w-5" />
          Nova Manutenção (OS)
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* CABEÇALHO IDÊNTICO À SUA PLANILHA */}
        <div className="bg-slate-900 text-yellow-500 font-black text-center py-4 uppercase tracking-widest text-sm border-b-4 border-yellow-500">
          UTI DO ÓCULOS - SERVIÇOS REALIZADOS
        </div>

        {listaOS.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nenhum serviço registrado</h3>
            <p className="text-slate-500 max-w-sm mt-1">Sua planilha de serviços aparecerá aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                {/* Linha 1 do Cabeçalho (Agrupamentos) */}
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-600 font-black border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 text-center" rowSpan={2}>Data</th>
                  <th className="p-3 border-r border-slate-200" rowSpan={2}>Cliente</th>
                  <th className="p-3 border-r border-slate-200 text-center" rowSpan={2}>Contato</th>
                  <th className="p-3 border-r border-slate-200 text-center" rowSpan={2}>Nº O.S.</th>
                  <th className="p-3 border-r border-slate-200" rowSpan={2}>Serviços Realizados</th>
                  <th className="p-2 border-r border-slate-200 text-center bg-slate-100" colSpan={3}>VALOR DA OS</th>
                  <th className="p-3 text-center bg-yellow-50 text-yellow-900" rowSpan={2}>TOTAL GERAL</th>
                </tr>
                {/* Linha 2 do Cabeçalho (Sub-colunas de Pagamento) */}
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-2 border-r border-t border-slate-200 text-center bg-slate-100"><span className="flex items-center justify-center gap-1"><QrCode className="h-3 w-3" /> PIX</span></th>
                  <th className="p-2 border-r border-t border-slate-200 text-center bg-slate-100"><span className="flex items-center justify-center gap-1"><Wallet className="h-3 w-3" /> Espécie</span></th>
                  <th className="p-2 border-r border-t border-slate-200 text-center bg-slate-100"><span className="flex items-center justify-center gap-1"><CreditCard className="h-3 w-3" /> Cartão</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listaOS.map((os) => (
                  <tr key={os.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-slate-200 text-xs font-bold text-slate-500 text-center whitespace-nowrap">
                      {os.data ? new Date(os.data).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-sm font-bold text-slate-900">
                      {os.clienteNome || '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-xs font-medium text-slate-600 text-center whitespace-nowrap">
                      {os.clienteTelefone || '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-xs font-black text-slate-800 text-center bg-slate-50">
                      {os.id.toString().padStart(5, '0')}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-xs font-medium text-slate-700 max-w-[250px] truncate" title={os.servicoRealizado || os.defeito}>
                      {os.servicoRealizado || os.defeito}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-xs font-bold text-slate-600 text-right bg-slate-50/50">
                      {os.valorPix > 0 ? `R$ ${os.valorPix.toFixed(2).replace('.', ',')}` : '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-xs font-bold text-slate-600 text-right bg-slate-50/50">
                      {os.valorEspecie > 0 ? `R$ ${os.valorEspecie.toFixed(2).replace('.', ',')}` : '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-xs font-bold text-slate-600 text-right bg-slate-50/50">
                      {os.valorCartao > 0 ? `R$ ${os.valorCartao.toFixed(2).replace('.', ',')}` : '-'}
                    </td>
                    <td className="p-3 text-sm font-black text-slate-900 text-right bg-yellow-50/30">
                      R$ {os.valorTotal.toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* RODAPÉ: A CALCULADORA AUTOMÁTICA */}
              <tfoot>
                <tr className="bg-slate-900 text-white font-black text-sm uppercase tracking-wider border-t-4 border-yellow-500">
                  <td colSpan={5} className="p-4 text-right text-yellow-500">
                    SOMA TOTAL DO MÊS:
                  </td>
                  <td className="p-4 text-right border-x border-slate-700">R$ {somaPix.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-right border-r border-slate-700">R$ {somaEspecie.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-right border-r border-slate-700">R$ {somaCartao.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-right text-yellow-500 bg-black/20 text-lg">
                    R$ {somaGeral.toFixed(2).replace('.', ',')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}