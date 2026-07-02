"use server";

import { db } from '@/db';
import { produtos } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function processarPlanilhaProdutos(formData: FormData) {
  const file = formData.get('arquivoCsv') as File;
  const categoriaEscolhida = formData.get('categoria') as string;
  
  if (!file) throw new Error('Arquivo não encontrado');

  const text = await file.text();
  // Divide o arquivo por linhas (limpando espaços em branco)
  const linhas = text.split(/\r?\n/).filter(linha => linha.trim() !== '');
  const dadosParaInserir = [];

  // O "Robô": Começa a ler a partir da linha 2 ou 3 (onde os dados reais começam)
  // O Excel deles tem o padrão: ORD | DESCRIÇÃO | CÓDIGO | VALOR UNT | QUANT | VALOR TOTAL | VALOR VENDA | ... | ESTOQUE
  for (let i = 0; i < linhas.length; i++) {
    const colunas = linhas[i].split(';'); // Padrão brasileiro do Excel em CSV
    
    // Identifica se é uma linha de dados (tem de ter descrição na coluna 1 e um preço na coluna 3 ou 6)
    if (colunas[1] && colunas[1].trim() !== '' && colunas[1].trim() !== 'DESCRIÇÃO DO PRODUTO' && colunas[1].trim() !== 'NaN') {
      
      // Função para converter "120,00" (texto do Excel) em 120.00 (número do Banco)
      const parsePreco = (valorTexto: string) => {
        if (!valorTexto) return 0;
        const limpo = valorTexto.replace('R$', '').replace('.', '').replace(',', '.').trim();
        const numero = parseFloat(limpo);
        return isNaN(numero) ? 0 : numero;
      };

      const nomeProduto = colunas[1].trim();
      const codigoProduto = colunas[2] ? colunas[2].trim() : null;
      const valorCusto = parsePreco(colunas[3]);
      const valorVenda = parsePreco(colunas[6]);
      // Algumas linhas da planilha têm o estoque na coluna 9, outras na coluna 4 (Quant.)
      const estoquePlanilha = parseInt(colunas[9]?.trim() || colunas[4]?.trim() || '0', 10);

      dadosParaInserir.push({
        codigo: codigoProduto === 'NaN' || !codigoProduto ? null : codigoProduto,
        nome: nomeProduto,
        categoria: categoriaEscolhida, // A categoria é definida na hora do upload (Bolsa, Chapéu, Armação)
        precoCusto: valorCusto,
        precoVenda: valorVenda,
        estoque: isNaN(estoquePlanilha) ? 0 : estoquePlanilha,
      });
    }
  }

  // Insere tudo no Turso de uma só vez (Operação Bulk)
  if (dadosParaInserir.length > 0) {
    await db.insert(produtos).values(dadosParaInserir);
  }

  revalidatePath('/produtos');
}