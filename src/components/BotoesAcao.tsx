"use client";

import React, { useTransition } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import { deletarRegistro } from '@/actions/deletar';

interface BotoesAcaoProps {
  id: number;
  tabela: 'cliente' | 'produto' | 'compras' | 'os' | 'simulacao' | 'preco' | 'conta' | 'joaozinho' | 'conta-styllo' | 'conta-uti'| 'carne' | 'devedores-uti'| 'indicados' | 'funcionarios' | 'diario' | 'balanco' | 'balanco-diario';
  caminho: string;
  linkEditar: string;
}

export default function BotoesAcao({ id, tabela, caminho, linkEditar }: BotoesAcaoProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('🚨 ATENÇÃO: Tem certeza que deseja excluir este registro permanentemente?')) {
      startTransition(async () => {
        await deletarRegistro(id, tabela, caminho);
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Link href={linkEditar} className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors border border-blue-200 shadow-sm" title="Editar Registro">
        <Edit className="h-4 w-4" />
      </Link>
      <button onClick={handleDelete} disabled={isPending} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-colors border border-red-200 shadow-sm disabled:opacity-50" title="Excluir Registro">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );
}