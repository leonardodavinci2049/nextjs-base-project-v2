import { adminAc } from "better-auth/plugins/admin/access";
import { ac } from "./statements";

/**
 * ===========================================
 * Role: USER (usuário padrão do sistema)
 * ===========================================
 *
 * Role básico atribuído automaticamente a novos usuários.
 * Permite apenas criar organizações (lojas) no sistema.
 */
const user = ac.newRole({
  // Pode criar sua própria organização (loja)
  organization: ["create"],
});

/**
 * ===========================================
 * Role: SUPERADMIN (administrador do sistema)
 * ===========================================
 *
 * Administrador da plataforma com acesso total.
 * Usado para suporte técnico e gestão do sistema.
 *
 * Permissões herdadas do admin plugin:
 * - user: create, list, set-role, ban, impersonate, delete, set-password
 * - session: list, revoke, delete
 */
const superAdmin = ac.newRole({
  ...adminAc.statements,

  // ORGANIZAÇÃO: acesso total
  organization: ["create", "update", "delete"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],

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

  // VENDAS: acesso total
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

  // RELATÓRIOS: acesso total
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

export { superAdmin, user };
