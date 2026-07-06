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
// ==========================================
// 6. MÓDULO: CONTAS MENSAIS E REPASSES
// ==========================================

export const contasMensais = sqliteTable('contas_mensais', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mesReferencia: text('mes_referencia').notNull(), // Ex: "MAIO 2026"
  
  // Equatorial
  totalKwh: real('total_kwh').default(0).notNull(),
  totalRs: real('total_rs').default(0).notNull(),
  mediaBarbosaKwh: real('media_barbosa_kwh').default(0).notNull(),
  icms: real('icms').default(0).notNull(),
  pis: real('pis').default(0).notNull(),
  cofins: real('cofins').default(0).notNull(),
  descontoAlinePerc: real('desconto_aline_perc').default(20).notNull(), // O seu desconto de 20%
  
  // Águas de Teresina
  aguaAline: real('agua_aline').default(0).notNull(),
  aguaBarbosa: real('agua_barbosa').default(0).notNull(),
  
  // Totais Calculados (Salvos para o histórico)
  equatorialBarbosa: real('equatorial_barbosa').default(0).notNull(),
  equatorialAline: real('equatorial_aline').default(0).notNull(),
  totalAlineGeral: real('total_aline_geral').default(0).notNull(), // Luz + Água

  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
// ==========================================
// 7. MÓDULO: FATURAMENTO POR MÊS
// ==========================================

export const servicosJoaozinho = sqliteTable('servicos_joaozinho', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  data: text('data').notNull(), // Data exata do serviço (Ex: 2026-07-02)
  mesReferencia: text('mes_referencia').notNull(), // Ex: "JULHO"
  anoBase: text('ano_base').default('2026').notNull(), // Ex: "2026"
  
  montagem: text('montagem'),
  montagemValor: real('montagem_valor').default(0).notNull(),
  
  transposicao: text('transposicao'),
  transposicaoValor: real('transposicao_valor').default(0).notNull(),
  
  coloracao: text('coloracao'),
  coloracaoValor: real('coloracao_valor').default(0).notNull(),
  
  total: real('total').default(0).notNull(), // Soma automática
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export const contaStyllo = sqliteTable('conta_styllo', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  data: text('data').notNull(),
  mesReferencia: text('mes_referencia').notNull(),
  anoBase: text('ano_base').default('2026').notNull(),
  
  pix: real('pix').default(0).notNull(),
  credito: real('credito').default(0).notNull(),
  debito: real('debito').default(0).notNull(),
  saida: real('saida').default(0).notNull(),
  
  total: real('total').default(0).notNull(), // (PIX + Credito + Debito) - Saída
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export const contaUti = sqliteTable('conta_uti', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  data: text('data').notNull(),
  mesReferencia: text('mes_referencia').notNull(),
  anoBase: text('ano_base').default('2026').notNull(),
  
  pix: real('pix').default(0).notNull(),
  credito: real('credito').default(0).notNull(),
  debito: real('debito').default(0).notNull(),
  saida: real('saida').default(0).notNull(),
  
  total: real('total').default(0).notNull(), // (PIX + Credito + Debito) - Saída
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export const controleCarne = sqliteTable('controle_carne', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  anoBase: text('ano_base').default('2026').notNull(), // Ex: 2025, 2026
  cliente: text('cliente').notNull(),
  contato: text('contato'),
  dataCompra: text('data_compra').notNull(),
  
  valorVenda: real('valor_venda').default(0).notNull(),
  valorEntrada: real('valor_entrada').default(0).notNull(),

  // As 10 Parcelas (Valor e Data de Pagamento)
  p1Valor: real('p1_valor').default(0), p1Data: text('p1_data'),
  p2Valor: real('p2_valor').default(0), p2Data: text('p2_data'),
  p3Valor: real('p3_valor').default(0), p3Data: text('p3_data'),
  p4Valor: real('p4_valor').default(0), p4Data: text('p4_data'),
  p5Valor: real('p5_valor').default(0), p5Data: text('p5_data'),
  p6Valor: real('p6_valor').default(0), p6Data: text('p6_data'),
  p7Valor: real('p7_valor').default(0), p7Data: text('p7_data'),
  p8Valor: real('p8_valor').default(0), p8Data: text('p8_data'),
  p9Valor: real('p9_valor').default(0), p9Data: text('p9_data'),
  p10Valor: real('p10_valor').default(0), p10Data: text('p10_data'),

  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export const clientesDevedoresUti = sqliteTable('clientes_devedores_uti', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cliente: text('cliente').notNull(),
  contato: text('contato'),
  servicos: text('servicos').notNull(),
  valor: real('valor').default(0).notNull(),
  data: text('data').notNull(),
  pago: text('pago').default('NÃO').notNull(), // Status: 'SIM' ou 'NÃO'
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export const servicosIndicados = sqliteTable('servicos_indicados', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  quemIndicou: text('quem_indicou').notNull(),
  contatos: text('contatos'),
  servicoPago: text('servico_pago').default('NÃO').notNull(), // 'SIM' ou 'NÃO'
  servico: text('servico').notNull(),
  valor: real('valor').default(0).notNull(),
  data: text('data').notNull(),
  valorDevido: real('valor_devido').default(0).notNull(),
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export const controleFuncionarios = sqliteTable('controle_funcionarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  mesReferencia: text('mes_referencia').notNull(),
  dataInicio: text('data_inicio').notNull(),
  diasJson: text('dias_json').notNull(), // Guarda todos os dias numa única coluna
  
  totalVt: real('total_vt').default(0).notNull(),
  totalVa: real('total_va').default(0).notNull(),
  totalSalario: real('total_salario').default(0).notNull(),
  totalFerias: real('total_ferias').default(0).notNull(),
  total13: real('total_13').default(0).notNull(),
  totalGeral: real('total_geral').default(0).notNull(),
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
// ==========================================
// 8. FATURAMENTO DIÁRIO
// ==========================================
export const faturamentoDiario = sqliteTable('faturamento_diario', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mesReferencia: text('mes_referencia').notNull(), // Ex: ABRIL
  anoBase: text('ano_base').default('2026').notNull(),
  data: text('data').notNull(),
  descricao: text('descricao').notNull(), // Vendas / Serviços
  
  compra: real('compra').default(0).notNull(), // R$ Compra
  
  // Entradas
  especie: real('especie').default(0).notNull(),
  credito: real('credito').default(0).notNull(),
  debito: real('debito').default(0).notNull(),
  pix: real('pix').default(0).notNull(),
  
  total: real('total').default(0).notNull(), // Soma das entradas
  
  // Saídas
  saidaDinheiro: real('saida_dinheiro').default(0).notNull(),
  saidaPix: real('saida_pix').default(0).notNull(),
  
  // Fechamento
  dizimo: real('dizimo').default(0).notNull(),
  fatEspecie: real('fat_especie').default(0).notNull(), // especie - saidaDinheiro
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
// ==========================================
// 9. BALANÇO ANUAL
// ==========================================
export const balancoAnual = sqliteTable('balanco_anual', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ano: text('ano').default('2026').notNull(),
  
  mesesJson: text('meses_json').notNull(), // Guarda os 12 meses num único campo
  
  totalCompras: real('total_compras').default(0).notNull(),
  totalEntrada: real('total_entrada').default(0).notNull(),
  totalSaida: real('total_saida').default(0).notNull(),
  
  criadoEm: integer('criado_em', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});