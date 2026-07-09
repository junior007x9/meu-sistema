import React from 'react';
import { db } from '@/db';
import { contasBancarias, categoriasFinanceiras } from '@/db/schema';
import FormTransacao from './FormTransacao';

export default async function NovaTransacaoPage() {
  const contas = await db.select().from(contasBancarias);
  const categorias = await db.select().from(categoriasFinanceiras);

  return <FormTransacao contas={contas} categorias={categorias} />;
}