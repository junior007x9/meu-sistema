"use client";

import React from 'react';
import Link from 'next/link';
import { Edit3, Trash2 } from 'lucide-react';

interface BotoesAcaoProps {
  id: number;
  tabela: string;
  caminho: string;
  linkEditar: string;
}

export default function BotoesAcao({ id, tabela, caminho, linkEditar }: BotoesAcaoProps) {
  
  const handleExcluir = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Tem certeza absoluta de que deseja excluir este registro permanente?")) {
      try {
        const { deletarRegistro } = await import('@/actions/deletar');
        const res = await deletarRegistro(id, tabela, caminho);
        if (!res.success) alert(res.error || "Erro ao deletar.");
      } catch (err) {
        console.error(err);
        alert("Ocorreu um erro ao processar a exclusão.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Botão de Editar */}
      <Link
        href={linkEditar}
        className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg shadow-sm transition-all duration-300 scale-100 hover:scale-105 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 group"
        aria-label={`Editar registro número ${id}`}
        title="Editar Registro"
      >
        <Edit3 className="h-4 w-4 group-hover:rotate-6 transition-transform" />
      </Link>

      {/* Botão de Excluir */}
      <button
        onClick={handleExcluir}
        className="p-2 text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg shadow-sm transition-all duration-300 scale-100 hover:scale-105 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-red-500 group"
        aria-label={`Excluir registro número ${id}`}
        title="Excluir Registro"
      >
        <Trash2 className="h-4 w-4 group-hover:shake transition-transform" />
      </button>
    </div>
  );
}