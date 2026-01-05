import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Organization } from "@/db/schema";
import { OrganizationActions } from "./organization-actions";

interface OrganizationTableProps {
  organizations: Organization[];
}

export function OrganizationTable({ organizations }: OrganizationTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="w-20">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="hidden md:table-cell">ID</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={org.logo || ""} alt={org.name} />
                  <AvatarFallback>
                    {org.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{org.name}</TableCell>
              <TableCell>{org.slug}</TableCell>
              <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">
                {org.id}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {org.createdAt
                  ? new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(org.createdAt))
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <OrganizationActions organization={org} />
              </TableCell>
            </TableRow>
          ))}
          {organizations.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No organizations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
