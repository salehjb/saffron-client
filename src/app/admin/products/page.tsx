import CreateProduct from "@/components/admin/products/CreateProduct";
import ProductsList from "@/components/admin/products/ProductsList";
import ProductsMetadata from "@/components/admin/products/ProductsMetadata";
import RefreshProducts from "@/components/admin/products/RefreshProducts";
import SearchProducts from "@/components/admin/products/SearchProducts";
import { AdminProductsProvider } from "@/context/admin/AdminProductsContext";

const AdminProductPage = () => {
  return (
    <AdminProductsProvider>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-yekan-bakh-bold">مدیریت محصولات</h2>
        <div className="flex items-center gap-2">
          <RefreshProducts />
          <CreateProduct />
        </div>
      </div>
      <hr className="my-3" />
      <div className="space-y-4">
        <ProductsMetadata />
        <SearchProducts />
        <ProductsList />
      </div>
    </AdminProductsProvider>
  );
};

export default AdminProductPage;
