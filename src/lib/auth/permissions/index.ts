/**
 * Sistema de Permissões - Better Auth
 *
 * Este módulo exporta todas as configurações de controle de acesso
 * para os plugins organization e admin do Better Auth.
 *
 * @example
 * // Server-side (auth.ts)
 * import { ac, owner, admin, member, superAdmin, user } from "./permissions"
 *
 * // Client-side (auth-client.ts)
 * import { ac, owner, admin, member, superAdmin, user } from "./permissions"
 */

// Admin Roles
export { superAdmin, user } from "./admin-roles";
// Organization Roles
export { admin, member, owner } from "./organization-roles";
export type { Action, Resource, Statement } from "./statements";
// Access Controller e Statements
export { ac, statement } from "./statements";
