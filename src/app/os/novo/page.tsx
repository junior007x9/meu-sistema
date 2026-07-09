import React from 'react';
import { db } from '@/db';
import { clientes } from '@/db/schema';
import { desc } from 'drizzle-orm';
import FormOS from './FormOS';

export default async function NovaOSPage() {
  // Busca todos os clientes registados, ordenados por ordem alfabética ou mais recentes
  const listaClientes = await db.select({
    id: clientes.id,
    nome: clientes.nome,
    telefone: clientes.telefone,
    cpf: clientes.cpf
  }).from(clientes).orderBy(desc(clientes.id));

  return <FormOS clientes={listaClientes} />;
}