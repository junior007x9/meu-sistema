import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { ordensServico } from '@/db/schema';
import { ArrowLeft, UserCog, Award, Clock, Wrench } from 'lucide-react';

export default async function ProducaoTecnicosPage() {
  // Busca todas as Ordens de Serviço registadas
  const listaOS = await db.select().from(ordensServico);

  // Agrupa e calcula a produtividade de cada técnico
  const mapaTecnicos = new Map();

  listaOS.forEach(os => {
    // Se o campo do técnico estiver vazio, agrupa em 'NÃO ATRIBUÍDO'
    const nome = os.tecnico ? os.tecnico.trim().toUpperCase() : 'NÃO ATRIBUÍDO';
    
    if (!mapaTecnicos.has(nome)) {
      mapaTecnicos.set(nome, { 
        nome, 
        emAndamento: 0, 
        concluidas: 0, 
        valorGerado: 0 
      });
    }
    
    const dados = mapaTecnicos.get(nome);
    
    // Conta como "produção" apenas o que já está finalizado ou pronto
    if (os.status === 'CONCLUÍDO' || os.status === 'ENTREGUE') {
      dados.concluidas += 1;
      dados.valorGerado += os.valorTotal || 0;
    } else {
      // Caso contrário, está na fila de trabalho (Recebido ou Em Andamento)
      dados.emAndamento += 1;
    }
  });

  // Converte o mapa num array e ordena do que mais produziu para o que menos produziu
  const tecnicos = Array.from(mapaTecnicos.values()).sort((a, b) => b.concluidas - a.concluidas);

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-1 sm:px-4 animate-fade-in mb-10">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/os" className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-500"><ArrowLeft className="h-6 w-6" /></Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Produção de Técnicos</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Acompanhe o rendimento do laboratório e a fila de montagem.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-purple-50/30">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><UserCog className="h-5 w-5" /></div>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Relatório de Desempenho</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-200">
                <th className="p-5">Nome do Técnico</th>
                <th className="p-5 text-center bg-blue-50/30"><span className="flex items-center justify-center gap-1"><Clock className="h-3.5 w-3.5 text-blue-500" /> Na Fila / Na Bancada</span></th>
                <th className="p-5 text-center bg-emerald-50/30"><span className="flex items-center justify-center gap-1"><Award className="h-3.5 w-3.5 text-emerald-500" /> O.S. Finalizadas</span></th>
                <th className="p-5 text-right"><span className="flex items-center justify-end gap-1"><Wrench className="h-3.5 w-3.5 text-slate-400" /> Valor dos Serviços</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
              {tecnicos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-slate-500">Ainda não existem Ordens de Serviço registadas.</td>
                </tr>
              ) : (
                tecnicos.map((t, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5">
                      <p className={`font-black text-lg ${t.nome === 'NÃO ATRIBUÍDO' ? 'text-slate-400' : 'text-slate-800'}`}>
                        {t.nome}
                      </p>
                    </td>
                    <td className="p-5 text-center bg-blue-50/10">
                      <span className="font-black text-blue-600 text-xl">{t.emAndamento}</span>
                    </td>
                    <td className="p-5 text-center bg-emerald-50/10">
                      <span className="font-black text-emerald-600 text-xl">{t.concluidas}</span>
                    </td>
                    <td className="p-5 text-right">
                      <p className="font-black text-slate-900 text-lg">R$ {t.valorGerado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}