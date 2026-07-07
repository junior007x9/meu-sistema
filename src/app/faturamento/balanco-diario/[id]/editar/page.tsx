import React from 'react';
import { db } from '@/db';
import { balancoDiario, balancoDiarioUti } from '@/db/schema';
import { eq } from 'drizzle-orm';
import FormEditar from './FormEditar';

// Para o Balanço Diário UTI, importe 'balancoDiarioUti' acima e altere a query abaixo
export default async function EditarBalancoDiarioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  // Se for UTI, use balancoDiarioUti
  const registro = await db.select().from(balancoDiario).where(eq(balancoDiario.id, id)).get();
  
  if (!registro) return <div>Registro não encontrado.</div>;
  return <FormEditar registro={registro} />;
}