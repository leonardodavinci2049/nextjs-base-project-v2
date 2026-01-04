import { HeaderOrganization } from "./_components/HeaderOrganization";

export default function OrganizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderOrganization />
      {children}
    </div>
  );
}
