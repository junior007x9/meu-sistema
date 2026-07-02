import React from 'react';
import { importarClientes } from '@/actions/importar';
import { UploadCloud } from 'lucide-react';

export default function ImportarPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 mt-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Importação de Dados</h1>
        <p className="text-slate-500 mt-1">Salve sua planilha do Excel como .CSV (separado por vírgulas) com as colunas: <b>Nome, Telefone, CPF</b> e faça o upload abaixo.</p>
      </div>

      <form action={importarClientes} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6 text-center">
        <div className="flex justify-center mb-4">
          <UploadCloud className="h-16 w-16 text-blue-500" />
        </div>
        
        <input 
          type="file" 
          name="arquivoCsv" 
          accept=".csv" 
          required 
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
          Processar Planilha e Salvar no Banco
        </button>
      </form>
    </div>
  );
}