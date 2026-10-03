import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";

export const metadata = {
  title: "Admin Dashboard - CyberWizDev",
  description: "Admin dashboard for managing the CyberWizDev platform",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar (drawer) */}
      <AdminMobileNav />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader user={session?.user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
