import {
  adminAc as orgAdminAc,
  memberAc as orgMemberAc,
  ownerAc as orgOwnerAc,
} from "better-auth/plugins/organization/access";
import { ac } from "./statements";

/**
 * ===========================================
 * Role: VENDEDOR (member)
 * ===========================================
 *
 * Perfil básico para operadores de caixa e vendedores.
 * Foco em operações do dia-a-dia de vendas.
 *
 * Permissões herdadas do organization plugin:
 * - member: [] (sem permissões sobre membros)
 * - invitation: [] (sem permissões sobre convites)
 */
const member = ac.newRole({
  ...orgMemberAc.statements,

  // PRODUTOS: apenas visualização
  product: ["view"],
  category: ["view"],

  // VENDAS: pode criar e visualizar suas próprias vendas
  order: ["view", "create", "update", "print"],

  // CLIENTES: cadastro básico e visualização
  customer: ["view", "view-details", "create", "update"],

  // RELATÓRIOS: apenas suas próprias vendas
  report: ["view-sales"],

  // CAIXA: apenas visualização
  cashier: ["view"],

  // PAGAMENTOS: apenas receber
  payment: ["view", "receive"],

  // CONFIGURAÇÕES: sem acesso
  settings: [],
});

/**
 * ===========================================
 * Role: GERENTE (admin)
 * ===========================================
 *
 * Perfil para gerentes de loja com poderes administrativos.
 * Pode gerenciar produtos, preços, equipe e relatórios.
 *
 * Permissões herdadas do organization plugin:
 * - member: create, update (pode adicionar e atualizar membros)
 * - invitation: create, cancel (pode convidar e cancelar convites)
 * - organization: update (pode atualizar dados da organização)
 */
const admin = ac.newRole({
  ...orgAdminAc.statements,

  // PRODUTOS: gerenciamento completo exceto exclusão
  product: [
    "view",
    "view-cost",
    "create",
    "update",
    "update-price",
    "update-stock",
    "import",
    "export",
  ],
  category: ["view", "create", "update"],

  // VENDAS: controle total incluindo cancelamentos e descontos
  order: [
    "view",
    "view-all",
    "create",
    "update",
    "cancel",
    "apply-discount",
    "reopen",
    "print",
  ],

  // CLIENTES: gerenciamento completo
  customer: [
    "view",
    "view-details",
    "create",
    "update",
    "view-credit",
    "manage-credit",
    "export",
  ],

  // RELATÓRIOS: acesso a maioria dos relatórios
  report: [
    "view-sales",
    "view-sales-all",
    "view-products",
    "view-stock",
    "view-customers",
    "view-commission",
    "export",
  ],

  // CAIXA: gerenciamento completo
  cashier: ["view", "open", "close", "withdraw", "deposit", "view-history"],

  // PAGAMENTOS: gerenciamento completo
  payment: ["view", "create", "update", "receive", "refund"],

  // CONFIGURAÇÕES: visualização apenas
  settings: ["view"],
});

/**
 * ===========================================
 * Role: PROPRIETÁRIO (owner)
 * ===========================================
 *
 * Perfil com acesso total ao sistema.
 * Pode fazer tudo que o gerente faz + exclusões e configurações.
 *
 * Permissões herdadas do organization plugin:
 * - member: create, update, delete (controle total sobre membros)
 * - invitation: create, cancel (controle total sobre convites)
 * - organization: update, delete (pode atualizar e deletar a organização)
 */
const owner = ac.newRole({
  ...orgOwnerAc.statements,

  // PRODUTOS: acesso total
  product: [
    "view",
    "view-cost",
    "create",
    "update",
    "update-price",
    "update-stock",
    "delete",
    "import",
    "export",
  ],
  category: ["view", "create", "update", "delete"],

  // VENDAS: acesso total incluindo descontos ilimitados
  order: [
    "view",
    "view-all",
    "create",
    "update",
    "cancel",
    "apply-discount",
    "apply-discount-unlimited",
    "reopen",
    "print",
  ],

  // CLIENTES: acesso total
  customer: [
    "view",
    "view-details",
    "create",
    "update",
    "delete",
    "view-credit",
    "manage-credit",
    "export",
  ],

  // RELATÓRIOS: acesso total incluindo financeiro
  report: [
    "view-sales",
    "view-sales-all",
    "view-products",
    "view-stock",
    "view-customers",
    "view-financial",
    "view-commission",
    "export",
  ],

  // CAIXA: acesso total
  cashier: ["view", "open", "close", "withdraw", "deposit", "view-history"],

  // PAGAMENTOS: acesso total
  payment: ["view", "create", "update", "delete", "receive", "refund"],

  // CONFIGURAÇÕES: acesso total
  settings: ["view", "update", "manage-users", "manage-integrations"],
});

export { admin, member, owner };
