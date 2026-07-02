"use server";

import { db } from '@/db';
import { clientes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criarCliente(formData: FormData) {
  const nome = formData.get('nome') as string;

  if (!nome || nome.trim() === '') {
    throw new Error('O nome do cliente é obrigatório.');
  }

  const idadeStr = formData.get('idade') as string;
  const idade = idadeStr ? parseInt(idadeStr, 10) : null;

  await db.insert(clientes).values({
    nome,
    dataNascimento: formData.get('dataNascimento') as string || null,
    idade,
    rg: formData.get('rg') as string || null,
    cpf: formData.get('cpf') as string || null,
    endereco: formData.get('endereco') as string || null,
    numero: formData.get('numero') as string || null,
    bairro: formData.get('bairro') as string || null,
    cep: formData.get('cep') as string || null,
    cidade: formData.get('cidade') as string || null,
    uf: formData.get('uf') as string || null,
    telefone: formData.get('telefone') as string || null,
    email: formData.get('email') as string || null,
    profissao: formData.get('profissao') as string || null,
    localTrabalho: formData.get('localTrabalho') as string || null,
    
    // Anamnese
    ultimaConsulta: formData.get('ultimaConsulta') as string || null,
    motivoConsulta: formData.get('motivoConsulta') as string || null,
    hipertensao: formData.get('hipertensao') === 'on',
    diabetes: formData.get('diabetes') === 'on',
    glaucoma: formData.get('glaucoma') === 'on',
    catarata: formData.get('catarata') === 'on',
    outrasDoencas: formData.get('outrasDoencas') as string || null,
    observacoes: formData.get('observacoes') as string || null,

    // Receita Longe
    longeOdEsf: formData.get('longeOdEsf') as string || null,
    longeOdCil: formData.get('longeOdCil') as string || null,
    longeOdEixo: formData.get('longeOdEixo') as string || null,
    longeOdDnp: formData.get('longeOdDnp') as string || null,
    longeOdAltura: formData.get('longeOdAltura') as string || null,
    longeOeEsf: formData.get('longeOeEsf') as string || null,
    longeOeCil: formData.get('longeOeCil') as string || null,
    longeOeEixo: formData.get('longeOeEixo') as string || null,
    longeOeDnp: formData.get('longeOeDnp') as string || null,
    longeOeAltura: formData.get('longeOeAltura') as string || null,

    // Receita Perto
    pertoOdEsf: formData.get('pertoOdEsf') as string || null,
    pertoOdCil: formData.get('pertoOdCil') as string || null,
    pertoOdEixo: formData.get('pertoOdEixo') as string || null,
    pertoOdDnp: formData.get('pertoOdDnp') as string || null,
    pertoOdAltura: formData.get('pertoOdAltura') as string || null,
    pertoOeEsf: formData.get('pertoOeEsf') as string || null,
    pertoOeCil: formData.get('pertoOeCil') as string || null,
    pertoOeEixo: formData.get('pertoOeEixo') as string || null,
    pertoOeDnp: formData.get('pertoOeDnp') as string || null,
    pertoOeAltura: formData.get('pertoOeAltura') as string || null,

    adicao: formData.get('adicao') as string || null,
  });

  revalidatePath('/clientes');
  redirect('/clientes');
}