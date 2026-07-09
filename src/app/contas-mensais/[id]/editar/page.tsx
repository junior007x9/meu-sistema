import React from 'react';
import { db } from '@/db';
import { contasMensais } from '@/db/schema';
import { eq } from 'drizzle-orm';
import FormEditar from './FormEditar';

export default async function EditarContaMensalPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const registro = await db.select().from(contasMensais).where(eq(contasMensais.id, id)).get();
  
  if (!registro) return <div className="p-10 text-center text-red-500">Conta não encontrada.</div>;
  return <FormEditar registro={registro} />;
}