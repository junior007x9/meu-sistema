import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// ==========================================
// 1. MÓDULO: ÓTICA & UTI DOS ÓCULOS
// ==========================================

export const clientes = sqliteTable('clientes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // Dados Pessoais
  nome: text('nome').notNull(),
  dataNascimento: text('data_nascimento'),
  idade: integer('idade'),
  cpf: text('cpf'),
  rg: text('rg'),
  
  // Endereço e Contato
  endereco: text('endereco'),
  numero: text('numero'),
  bairro: text('bairro'),
  cep: text('cep'),
  cidade: text('cidade'),
  uf: text('uf'),
  telefone: text('telefone'),
  email: text('email'),
  
  // Dados Históricos / Ficha Antiga (PRESERVADOS PARA NÃO PERDER DADOS DOS 34 CLIENTES)
  trabalha: text('trabalha'),
  ondeTrabalha: text('onde_trabalha'),
  telefoneTrabalho: text('telefone_trabalho'),
  pensionista: text('pensionista'),
  pretendeConsultar: text('pretende_consultar'),
  turnoConsulta: text('turno_consulta'),
  profissao: text('profissao'),
  localTrabalho: text('local_trabalho'),
  
  // ==========================================
  // DADOS CLÍNICOS E ANAMNESE
  // ==========================================
  ultimaConsulta: text('ultima_consulta'),
  motivoConsulta: text('motivo_consulta'),
  hipertensao: integer('hipertensao', { mode: 'boolean' }).default(false),
  diabetes: integer('diabetes', { mode: 'boolean' }).default(false),
  glaucoma: integer('glaucoma', { mode: 'boolean' }).default(false),
  catarata: integer('catarata', { mode: 'boolean' }).default(false),
  outrasDoencas: text('outras_doencas'),
  observacoes: text('observacoes'),

  // ==========================================
  // PRESCRIÇÃO / RECEITA
  // ==========================================
  longeOdEsf: text('longe_od_esf'),
  longeOdCil: text('longe_od_cil'),
  longeOdEixo: text('longe_od_eixo'),
  longeOdDnp: text('longe_od_dnp'),
  longeOdAltura: text('longe_od_altura'),
  longeOeEsf: text('longe_oe_esf'),
  longeOeCil: text('longe_oe_cil'),
  longeOeEixo: text('longe_oe_eixo'),
  longeOeDnp: text('longe_oe_dnp'),
  longeOeAltura: text('longe_oe_altura'),

  pertoOdEsf: text('perto_od_esf'),
  pertoOdCil: text('perto_od_cil'),
  pertoOdEixo: text('perto_od_eixo'),
  pertoOdDnp: text('perto_od_dnp'),
  pertoOdAltura: text('perto_od_altura'),
  pertoOeEsf: text('perto_oe_esf'),
  pertoOeCil: text('perto_oe_cil'),
  pertoOeEixo: text('perto_oe_eixo'),
  pertoOeDnp: text('perto_oe_dnp'),
  pertoOeAltura: text('perto_oe_altura'),

  adicao: text('adicao'),

  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const produtos = sqliteTable('produtos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  codigo: text('codigo'),
  nome: text('nome').notNull(),
  categoria: text('categoria').notNull(), 
  fornecedor: text('fornecedor'), // <-- Nova coluna (Representante)
  precoCusto: real('preco_custo'), // Valor Unt.
  estoque: integer('estoque').default(0).notNull(), // Quantidade
  precoVenda: real('preco_venda').notNull(), // Valor Venda
  porcentagemDesconto: real('porcentagem_desconto').default(0), // <-- Nova coluna (%)
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const ordensServico = sqliteTable('ordens_servico', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clienteId: integer('cliente_id').references(() => clientes.id),
  modeloArmacao: text('modelo_armacao'),
  descricaoDefeito: text('descricao_defeito').notNull(),
  servicoRealizado: text('servico_realizado'),
  tecnico: text('tecnico'), // <-- NOVA COLUNA ADICIONADA AQUI!
  status: text('status').default('RECEBIDO').notNull(), 
  valorTotal: real('valor_total').default(0).notNull(),
  valorPix: real('valor_pix').default(0).notNull(),
  valorEspecie: real('valor_especie').default(0).notNull(),
  valorCartao: real('valor_cartao').default(0).notNull(),
  dataEntrada: integer('data_entrada', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  dataEntregaPrevista: integer('data_entrega_prevista', { mode: 'timestamp' }),
});

export const vendas = sqliteTable('vendas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clienteId: integer('cliente_id').references(() => clientes.id),
  dataVenda: integer('data_venda', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  valorTotal: real('valor_total').notNull(),
  formaPagamento: text('forma_pagamento').notNull(), 
});

export const itensVenda = sqliteTable('itens_venda', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  vendaId: integer('venda_id').references(() => vendas.id),
  produtoId: integer('produto_id').references(() => produtos.id),
  quantidade: integer('quantidade').notNull(),
  precoUnitario: real('preco_unitario').notNull(),
});

// ==========================================
// 2. MÓDULO: FINANCEIRO (PESSOAL & EMPRESA)
// ==========================================

export const contasBancarias = sqliteTable('contas_bancarias', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(), 
  escopo: text('escopo').notNull(), 
  saldoInicial: real('saldo_inicial').default(0).notNull(),
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const categoriasFinanceiras = sqliteTable('categorias_financeiras', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(), 
  tipo: text('tipo').notNull(), 
  escopo: text('escopo').notNull(), 
});

export const transacoes = sqliteTable('transacoes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contaId: integer('conta_id').references(() => contasBancarias.id),
  categoriaId: integer('categoria_id').references(() => categoriasFinanceiras.id),
  descricao: text('descricao').notNull(), 
  valor: real('valor').notNull(),
  tipo: text('tipo').notNull(), 
  escopo: text('escopo').notNull(), 
  status: text('status').default('PAGO').notNull(),
  dataTransacao: integer('data_transacao', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  vendaId: integer('venda_id').references(() => vendas.id), 
  osId: integer('os_id').references(() => ordensServico.id), 
});
// ==========================================
// 3. MÓDULO: COMPRAS ONLINE / ENCOMENDAS
// ==========================================

export const comprasOnline = sqliteTable('compras_online', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  dataCompra: text('data_compra').notNull(),
  produto: text('produto').notNull(),
  loja: text('loja').notNull(),
  quemComprou: text('quem_comprou'),
  quemVaiPagar: text('quem_vai_pagar'),
  rastreio: text('rastreio'),
  valorUnitario: real('valor_unitario').default(0).notNull(),
  quantidade: integer('quantidade').default(1).notNull(),
  valorTotal: real('valor_total').default(0).notNull(),
  metodoPagamento: text('metodo_pagamento'),
  situacaoPagamento: text('situacao_pagamento'),
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
// ==========================================
// 4. MÓDULO: SIMULADOR DE LENTES E MARGENS
// ==========================================

export const simulacoesLentes = sqliteTable('simulacoes_lentes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  marcaLente: text('marca_lente').notNull(),
  cliente: text('cliente'),
  custoLente: real('custo_lente').default(0).notNull(),
  valorTabela: real('valor_tabela').default(0).notNull(),
  taxaCartao: real('taxa_cartao').default(0).notNull(), // Porcentagem que a maquininha cobra
  valorParcela: real('valor_parcela').default(0).notNull(), // Parcela em 6x
  descontoCartao: real('desconto_cartao').default(0).notNull(), // Valor perdido na taxa
  diferenca: real('diferenca').default(0).notNull(), // Valor Líquido (Tabela - Taxa)
  ganho: real('ganho').default(0).notNull(), // Lucro (Líquido - Custo)
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
// ==========================================
// 5. MÓDULO: TABELA DE PREÇOS DE SERVIÇOS
// ==========================================

export const tabelaPrecos = sqliteTable('tabela_precos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tipoConserto: text('tipo_conserto').notNull(),
  
  // Preços na Loja
  lojaPix: real('loja_pix').default(0).notNull(),
  lojaCartao: real('loja_cartao').default(0).notNull(),
  
  // Preços no Delivery
  deliveryPix: real('delivery_pix').default(0).notNull(),
  deliveryCartao: real('delivery_cartao').default(0).notNull(),
  
  // Preços para Óticas Parceiras (Atacado/B2B)
  oticasPix: real('oticas_pix').default(0).notNull(),
  oticasCartao: real('oticas_cartao').default(0).notNull(),
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});