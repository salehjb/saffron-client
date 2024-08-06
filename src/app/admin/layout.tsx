import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminProvider } from "@/context/admin/AdminContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل ادمین زروند",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container !px-0 grid grid-cols-8 gap-4 h-screen py-10">
      <div className="col-span-2">
        <AdminSidebar />
      </div>
      <AdminProvider>
        <div className="col-span-6 p-4 shadow-md bg-white rounded-md overflow-y-auto">
          {children}
        </div>
      </AdminProvider>
    </div>
  );
}
