import React from 'react';
import { db } from '@/db';
import { ordensServico, clientes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import FormEditar from './FormEditar';

export default async function EditarOSPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  
  // 1. Busca a O.S. específica
  const registro = await db.select().from(ordensServico).where(eq(ordensServico.id, id)).get();
  
  if (!registro) {
    return <div className="p-10 text-center text-red-500 font-bold">Ordem de Serviço não encontrada.</div>;
  }

  // 2. Busca os clientes para que a lista suspensa continue a funcionar na edição
  const listaClientes = await db.select({
    id: clientes.id,
    nome: clientes.nome,
    telefone: clientes.telefone,
    cpf: clientes.cpf
  }).from(clientes).orderBy(desc(clientes.id));

  return <FormEditar registro={registro} clientes={listaClientes} />;
}