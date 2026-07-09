import React from 'react';
import { db } from '@/db';
import { contaUti } from '@/db/schema';
import { eq } from 'drizzle-orm';
import FormEditar from './FormEditar';

export default async function EditarContaUtiPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const registro = await db.select().from(contaUti).where(eq(contaUti.id, id)).get();
  
  if (!registro) return <div className="p-10 text-center text-red-500 font-bold">Registo não encontrado.</div>;
  return <FormEditar registro={registro} />;
}