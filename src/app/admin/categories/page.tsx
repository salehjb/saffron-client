import CategoriesList from "@/components/admin/categories/CategoriesList";
import CategoriesMetadata from "@/components/admin/categories/CategoriesMetadata";
import CreateCategory from "@/components/admin/categories/CreateCategory";
import RefreshCategories from "@/components/admin/categories/RefreshCategories";
import SearchCategories from "@/components/admin/categories/SearchCategories";
import { AdminCategoriesProvider } from "@/context/admin/AdminCategoriesContext";

const AdminCategoriesPage = () => {
  return (
    <AdminCategoriesProvider>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-yekan-bakh-bold">مدیریت دسته بندی ها</h2>{" "}
        <div className="flex items-center gap-2">
          <RefreshCategories />
          <CreateCategory />
        </div>
      </div>
      <hr className="my-3" />
      <div className="space-y-4">
        <CategoriesMetadata />
        <SearchCategories />
        <CategoriesList />
      </div>
    </AdminCategoriesProvider>
  );
};

export default AdminCategoriesPage;
