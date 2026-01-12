import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements as adminDefaultStatements } from "better-auth/plugins/admin/access";
import { defaultStatements as orgDefaultStatements } from "better-auth/plugins/organization/access";

/**
 * Statement de permissões combinando:
 * - defaultStatements do admin plugin (user, session)
 * - defaultStatements do organization plugin (organization, member, invitation)
 * - permissões customizadas do PDV (product, order, customer, report, cashier)
 */
const statement = {
  ...adminDefaultStatements,
  ...orgDefaultStatements,

  // Extendendo organization com ação "create" para permitir criação de organizações
  organization: ["create", "update", "delete"] as const,

  // ==========================================
  // MÓDULO: PRODUTOS
  // ==========================================
  product: [
    "view", // Visualizar lista de produtos
    "view-cost", // Visualizar preço de custo (sensível)
    "create", // Cadastrar novo produto
    "update", // Atualizar dados do produto (nome, descrição, etc)
    "update-price", // Alterar preço de venda
    "update-stock", // Ajustar estoque manualmente
    "delete", // Excluir produto
    "import", // Importar produtos em lote
    "export", // Exportar lista de produtos
  ],

  // ==========================================
  // MÓDULO: CATEGORIAS DE PRODUTOS
  // ==========================================
  category: [
    "view", // Visualizar categorias
    "create", // Criar categoria
    "update", // Atualizar categoria
    "delete", // Excluir categoria
  ],

  // ==========================================
  // MÓDULO: VENDAS / PEDIDOS
  // ==========================================
  order: [
    "view", // Visualizar pedidos
    "view-all", // Visualizar pedidos de todos os vendedores
    "create", // Criar nova venda/pedido
    "update", // Atualizar pedido (antes de finalizar)
    "cancel", // Cancelar pedido
    "apply-discount", // Aplicar desconto no pedido
    "apply-discount-unlimited", // Aplicar desconto sem limite
    "reopen", // Reabrir pedido cancelado/fechado
    "print", // Imprimir comprovante
  ],

  // ==========================================
  // MÓDULO: CLIENTES
  // ==========================================
  customer: [
    "view", // Visualizar lista de clientes
    "view-details", // Ver detalhes e histórico do cliente
    "create", // Cadastrar novo cliente
    "update", // Atualizar dados do cliente
    "delete", // Excluir cliente
    "view-credit", // Visualizar crédito/débito do cliente
    "manage-credit", // Gerenciar crédito do cliente
    "export", // Exportar lista de clientes
  ],

  // ==========================================
  // MÓDULO: RELATÓRIOS
  // ==========================================
  report: [
    "view-sales", // Relatório de vendas
    "view-sales-all", // Relatório de vendas de todos os vendedores
    "view-products", // Relatório de produtos
    "view-stock", // Relatório de estoque
    "view-customers", // Relatório de clientes
    "view-financial", // Relatório financeiro (sensível)
    "view-commission", // Relatório de comissões
    "export", // Exportar relatórios
  ],

  // ==========================================
  // MÓDULO: CAIXA
  // ==========================================
  cashier: [
    "view", // Visualizar caixa
    "open", // Abrir caixa
    "close", // Fechar caixa
    "withdraw", // Sangria (retirada)
    "deposit", // Suprimento (entrada)
    "view-history", // Histórico de movimentações
  ],

  // ==========================================
  // MÓDULO: PAGAMENTOS
  // ==========================================
  payment: [
    "view", // Visualizar formas de pagamento
    "create", // Criar forma de pagamento
    "update", // Atualizar forma de pagamento
    "delete", // Excluir forma de pagamento
    "receive", // Receber pagamento
    "refund", // Estornar pagamento
  ],

  // ==========================================
  // MÓDULO: CONFIGURAÇÕES DA LOJA
  // ==========================================
  settings: [
    "view", // Visualizar configurações
    "update", // Atualizar configurações
    "manage-users", // Gerenciar usuários da loja
    "manage-integrations", // Gerenciar integrações (NF-e, TEF, etc)
  ],
} as const;

/**
 * Access Controller configurado com todos os statements
 */
const ac = createAccessControl(statement);

/**
 * Tipos exportados para type safety em toda a aplicação
 */
type Statement = typeof statement;
type Resource = keyof Statement;
type Action<R extends Resource> = Statement[R][number];

export { ac, statement };
export type { Action, Resource, Statement };
