import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container grid grid-cols-8 gap-4 h-[70vh]">
      <div className="col-span-2">
        <DashboardSidebar />
      </div>
      <div className="col-span-6 p-4 shadow-md bg-white rounded-md overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
