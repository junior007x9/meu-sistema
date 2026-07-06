import React from 'react';
import { db } from '@/db';
import { contaStyllo } from '@/db/schema';
import { eq } from 'drizzle-orm';
import FormEditar from './FormEditar';

export default async function EditarContaStylloPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const registro = await db.select().from(contaStyllo).where(eq(contaStyllo.id, id)).get();

  if (!registro) return <div className="p-10 text-center text-red-500 font-bold">Registro não encontrado.</div>;

  return <FormEditar registro={registro} />;
}