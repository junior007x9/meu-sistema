"use server";

import { db } from '@/db';
import { clientes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export async function salvarCliente(formData: FormData) {
  const data = {
    // 1. Dados Pessoais
    nome: formData.get('nome') as string,
    dataNascimento: formData.get('dataNascimento') as string,
    idade: parseInt(formData.get('idade') as string) || null,
    cpf: formData.get('cpf') as string,
    rg: formData.get('rg') as string,
    
    // 2. Endereço e Contato
    endereco: formData.get('endereco') as string,
    numero: formData.get('numero') as string,
    bairro: formData.get('bairro') as string,
    cep: formData.get('cep') as string,
    cidade: formData.get('cidade') as string,
    uf: formData.get('uf') as string,
    telefone: formData.get('telefone') as string,
    email: formData.get('email') as string,

    // 3. Histórico / Ficha Antiga
    trabalha: formData.get('trabalha') as string,
    ondeTrabalha: formData.get('ondeTrabalha') as string,
    telefoneTrabalho: formData.get('telefoneTrabalho') as string,
    pensionista: formData.get('pensionista') as string,
    pretendeConsultar: formData.get('pretendeConsultar') as string,
    turnoConsulta: formData.get('turnoConsulta') as string,
    profissao: formData.get('profissao') as string,
    localTrabalho: formData.get('localTrabalho') as string,

    // 4. Anamnese / Dados Clínicos
    ultimaConsulta: formData.get('ultimaConsulta') as string,
    motivoConsulta: formData.get('motivoConsulta') as string,
    hipertensao: formData.get('hipertensao') === 'true',
    diabetes: formData.get('diabetes') === 'true',
    glaucoma: formData.get('glaucoma') === 'true',
    catarata: formData.get('catarata') === 'true',
    outrasDoencas: formData.get('outrasDoencas') as string,
    observacoes: formData.get('observacoes') as string,

    // 5. Receita Longe
    longeOdEsf: formData.get('longeOdEsf') as string,
    longeOdCil: formData.get('longeOdCil') as string,
    longeOdEixo: formData.get('longeOdEixo') as string,
    longeOdDnp: formData.get('longeOdDnp') as string,
    longeOdAltura: formData.get('longeOdAltura') as string,
    
    longeOeEsf: formData.get('longeOeEsf') as string,
    longeOeCil: formData.get('longeOeCil') as string,
    longeOeEixo: formData.get('longeOeEixo') as string,
    longeOeDnp: formData.get('longeOeDnp') as string,
    longeOeAltura: formData.get('longeOeAltura') as string,

    // 6. Receita Perto
    pertoOdEsf: formData.get('pertoOdEsf') as string,
    pertoOdCil: formData.get('pertoOdCil') as string,
    pertoOdEixo: formData.get('pertoOdEixo') as string,
    pertoOdDnp: formData.get('pertoOdDnp') as string,
    pertoOdAltura: formData.get('pertoOdAltura') as string,

    pertoOeEsf: formData.get('pertoOeEsf') as string,
    pertoOeCil: formData.get('pertoOeCil') as string,
    pertoOeEixo: formData.get('pertoOeEixo') as string,
    pertoOeDnp: formData.get('pertoOeDnp') as string,
    pertoOeAltura: formData.get('pertoOeAltura') as string,

    adicao: formData.get('adicao') as string,
  };

  await db.insert(clientes).values(data);

  revalidatePath('/clientes');
  redirect('/clientes');
}
export async function atualizarCliente(id: number, formData: FormData) {
  const data = {
    nome: formData.get('nome') as string,
    dataNascimento: formData.get('dataNascimento') as string,
    idade: parseInt(formData.get('idade') as string) || null,
    cpf: formData.get('cpf') as string,
    rg: formData.get('rg') as string,
    endereco: formData.get('endereco') as string,
    numero: formData.get('numero') as string,
    bairro: formData.get('bairro') as string,
    cep: formData.get('cep') as string,
    cidade: formData.get('cidade') as string,
    uf: formData.get('uf') as string,
    telefone: formData.get('telefone') as string,
    email: formData.get('email') as string,
    trabalha: formData.get('trabalha') as string,
    ondeTrabalha: formData.get('ondeTrabalha') as string,
    telefoneTrabalho: formData.get('telefoneTrabalho') as string,
    pensionista: formData.get('pensionista') as string,
    pretendeConsultar: formData.get('pretendeConsultar') as string,
    turnoConsulta: formData.get('turnoConsulta') as string,
    profissao: formData.get('profissao') as string,
    localTrabalho: formData.get('localTrabalho') as string,
    ultimaConsulta: formData.get('ultimaConsulta') as string,
    motivoConsulta: formData.get('motivoConsulta') as string,
    hipertensao: formData.get('hipertensao') === 'true',
    diabetes: formData.get('diabetes') === 'true',
    glaucoma: formData.get('glaucoma') === 'true',
    catarata: formData.get('catarata') === 'true',
    outrasDoencas: formData.get('outrasDoencas') as string,
    observacoes: formData.get('observacoes') as string,
    
    longeOdEsf: formData.get('longeOdEsf') as string,
    longeOdCil: formData.get('longeOdCil') as string,
    longeOdEixo: formData.get('longeOdEixo') as string,
    longeOdDnp: formData.get('longeOdDnp') as string,
    longeOdAltura: formData.get('longeOdAltura') as string,
    longeOeEsf: formData.get('longeOeEsf') as string,
    longeOeCil: formData.get('longeOeCil') as string,
    longeOeEixo: formData.get('longeOeEixo') as string,
    longeOeDnp: formData.get('longeOeDnp') as string,
    longeOeAltura: formData.get('longeOeAltura') as string,
    
    pertoOdEsf: formData.get('pertoOdEsf') as string,
    pertoOdCil: formData.get('pertoOdCil') as string,
    pertoOdEixo: formData.get('pertoOdEixo') as string,
    pertoOdDnp: formData.get('pertoOdDnp') as string,
    pertoOdAltura: formData.get('pertoOdAltura') as string,
    pertoOeEsf: formData.get('pertoOeEsf') as string,
    pertoOeCil: formData.get('pertoOeCil') as string,
    pertoOeEixo: formData.get('pertoOeEixo') as string,
    pertoOeDnp: formData.get('pertoOeDnp') as string,
    pertoOeAltura: formData.get('pertoOeAltura') as string,
    
    adicao: formData.get('adicao') as string,
  };

  await db.update(clientes).set(data).where(eq(clientes.id, id));

  revalidatePath('/clientes');
  redirect('/clientes');
}