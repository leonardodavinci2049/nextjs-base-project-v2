import { getOrganizationBySlug } from "@/server/organizations";
import { getUsers } from "@/server/users";
import InviteUsersTable from "./_components/invite-users-table";
import MembersTable from "./_components/members-table";
import { SiteHeaderWithBreadcrumb } from "../../_components/header/site-header-with-breadcrumb";

type Params = Promise<{ slug: string }>;

export default async function OrganizationPage({ params }: { params: Params }) {
  const { slug } = await params;

  const organization = await getOrganizationBySlug(slug);
  const users = await getUsers(organization?.id || "");

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <>
      <SiteHeaderWithBreadcrumb
        title={organization.name}
        breadcrumbItems={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Organizations", href: "/dashboard/organization" },
          { label: organization.name, isActive: true },
        ]}
      />
      <div className="container mx-auto py-10 px-4 space-y-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Members</h2>
            <p className="text-muted-foreground">
              Manage members of this organization.
            </p>
          </div>
          <MembersTable members={organization.member || []} />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Invite Users</h2>
            <p className="text-muted-foreground">
              Invite users to join this organization.
            </p>
          </div>
          <InviteUsersTable
            organizationId={organization.id}
            users={users}
          />
        </div>
      </div>
    </>
  );
}
