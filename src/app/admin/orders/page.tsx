import OrdersList from "@/components/admin/orders/OrdersList";
import OrdersMetadata from "@/components/admin/orders/OrdersMetadata";
import RefreshOrders from "@/components/admin/orders/RefreshOrders";
import SearchOrders from "@/components/admin/orders/SearchOrders";
import { AdminOrdersProvider } from "@/context/admin/AdminOrdersContext";

const AdminOrdersPage = () => {
  return (
    <AdminOrdersProvider>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-yekan-bakh-bold">مدیریت سفارشات</h2>
        <RefreshOrders />
      </div>
      <hr className="my-3" />
      <div className="space-y-4">
        <OrdersMetadata />
        <SearchOrders />
        <OrdersList />
      </div>
    </AdminOrdersProvider>
  );
};

export default AdminOrdersPage;
