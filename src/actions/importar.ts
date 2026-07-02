"use server";

import { db } from '@/db';
import { clientes } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function importarClientes(formData: FormData) {
  const file = formData.get('arquivoCsv') as File;
  if (!file) throw new Error('Arquivo não encontrado');

  const text = await file.text();
  // Divide as linhas e limpa quebras de linha estranhas
  const linhas = text.split(/\r?\n/).filter(linha => linha.trim() !== '');
  const dadosParaInserir = [];

  // Pula a linha 0 (que são os cabeçalhos) e lê os dados a partir da linha 1
  for (let i = 1; i < linhas.length; i++) {
    // Separa os dados por vírgula (ou ponto e vírgula, ajuste se necessário)
    const colunas = linhas[i].split(';'); 
    
    // Verifica se a primeira coluna (Nome) existe para evitar linhas em branco
    if (colunas[0] && colunas[0].trim() !== '') { 
      dadosParaInserir.push({
        nome: colunas[0]?.trim(),
        dataNascimento: colunas[1]?.trim() || null,
        rg: colunas[2]?.trim() || null,
        cpf: colunas[3]?.trim() || null,
        endereco: colunas[4]?.trim() || null,
        bairro: colunas[5]?.trim() || null,
        cep: colunas[6]?.trim() || null,
        cidade: colunas[7]?.trim() || null,
        telefone: colunas[8]?.trim() || null,
        email: colunas[9]?.trim() || null,
        trabalha: colunas[10]?.trim() || null,
        ondeTrabalha: colunas[11]?.trim() || null,
        telefoneTrabalho: colunas[12]?.trim() || null,
        pensionista: colunas[13]?.trim() || null,
        pretendeConsultar: colunas[14]?.trim() || null,
        turnoConsulta: colunas[15]?.trim() || null,
      });
    }
  }

  // Insere os clientes em bloco (muito mais rápido do que um por um)
  if (dadosParaInserir.length > 0) {
    await db.insert(clientes).values(dadosParaInserir);
  }

  // Atualiza as telas
  revalidatePath('/clientes');
  revalidatePath('/');
}