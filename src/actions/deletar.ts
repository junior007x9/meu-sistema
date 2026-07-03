"use server";

import { db } from '@/db';
import { 
  clientes, 
  comprasOnline, 
  ordensServico, 
  simulacoesLentes, 
  tabelaPrecos, 
  contasMensais, 
  produtos, 
  servicosJoaozinho, // <-- AQUI ESTÁ A IMPORTAÇÃO QUE FALTAVA
  contaStyllo
} from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deletarRegistro(id: number, tabela: string, caminho: string) {
  try {
    if (tabela === 'cliente') await db.delete(clientes).where(eq(clientes.id, id));
    if (tabela === 'produto') await db.delete(produtos).where(eq(produtos.id, id));
    if (tabela === 'compras') await db.delete(comprasOnline).where(eq(comprasOnline.id, id));
    if (tabela === 'os') await db.delete(ordensServico).where(eq(ordensServico.id, id));
    if (tabela === 'simulacao') await db.delete(simulacoesLentes).where(eq(simulacoesLentes.id, id));
    if (tabela === 'preco') await db.delete(tabelaPrecos).where(eq(tabelaPrecos.id, id));
    if (tabela === 'conta') await db.delete(contasMensais).where(eq(contasMensais.id, id));
    if (tabela === 'joaozinho') await db.delete(servicosJoaozinho).where(eq(servicosJoaozinho.id, id));
    // Adicione esta linha logo abaixo da exclusão do joaozinho:
    if (tabela === 'conta-styllo') await db.delete(contaStyllo).where(eq(contaStyllo.id, id));

    revalidatePath(caminho);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return { success: false, error: "Erro ao excluir o registro." };
  }
}