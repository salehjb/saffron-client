import RefreshUsers from "@/components/admin/users/RefreshUsers";
import SearchUsers from "@/components/admin/users/SearchUsers";
import UsersList from "@/components/admin/users/UsersList";
import UsersMetadata from "@/components/admin/users/UsersMetadata";
import { AdminUsersProvider } from "@/context/admin/AdminUsersContext";

const AdminUsersPage = () => {
  return (
    <AdminUsersProvider>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-yekan-bakh-bold">مدیریت کاربران</h2>
        <RefreshUsers />
      </div>
      <hr className="my-3" />
      <div className="space-y-4">
        <UsersMetadata />
        <SearchUsers />
        <UsersList />
      </div>
    </AdminUsersProvider>
  );
};

export default AdminUsersPage;
