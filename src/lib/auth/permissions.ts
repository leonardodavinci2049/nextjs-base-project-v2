import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
  organization: ["create", "update", "delete", "manage"],
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({
  project: ["create"],
  organization: [],
});

const admin = ac.newRole({
  project: ["create", "update"],
  organization: ["update"],
});

const owner = ac.newRole({
  project: ["create", "update", "delete"],
  organization: ["create", "update", "delete", "manage"],
});

const user = ac.newRole({
  organization: ["create"],
  project: ["create"],
});

const superAdmin = ac.newRole({
  project: ["create", "share", "update", "delete"],
  organization: ["create", "update", "delete", "manage"],
});

export { ac, member, admin, owner, user, superAdmin, statement };
