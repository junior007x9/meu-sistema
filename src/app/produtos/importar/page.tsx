"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UploadCloud, CheckCircle2 } from 'lucide-react';
import { processarPlanilhaProdutos } from '@/actions/importarProdutos';

export default function ImportarProdutosPage() {
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(formData: FormData) {
    await processarPlanilhaProdutos(formData);
    setSucesso(true);
    // Remove a mensagem de sucesso após 3 segundos
    setTimeout(() => setSucesso(false), 3000); 
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/produtos" className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Importar Estoque (CSV)</h1>
          <p className="text-slate-500 mt-1">Faça upload das planilhas da Styllo Ótica.</p>
        </div>
      </div>

      {sucesso && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6" />
          <p className="font-medium">Planilha importada com sucesso para o banco de dados!</p>
        </div>
      )}

      <form action={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6 text-center">
        
        <div className="text-left space-y-2">
          <label className="block text-sm font-bold text-slate-700">O que tem dentro deste ficheiro?</label>
          <select name="categoria" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium">
            <option value="Armação">Armações</option>
            <option value="Bolsa">Bolsas</option>
            <option value="Chapéu">Chapéus</option>
            <option value="Lente">Lentes</option>
            <option value="Acessório">Outros Acessórios</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50 hover:bg-blue-50 transition-colors">
          <div className="flex justify-center mb-4">
            <UploadCloud className="h-16 w-16 text-blue-500" />
          </div>
          <input 
            type="file" 
            name="arquivoCsv" 
            accept=".csv" 
            required 
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-md transition-all hover:scale-105">
          Extrair e Salvar no Sistema
        </button>
      </form>
    </div>
  );
}