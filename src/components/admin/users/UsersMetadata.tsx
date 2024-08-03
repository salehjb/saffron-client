"use client";

import { useAdminUsers } from "@/context/admin/AdminUsersContext";
import { UserRound, UserRoundCog, UsersRound } from "lucide-react";

const UsersMetadata = () => {
  const { metadata } = useAdminUsers();

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-yellow-200 p-2 rounded-md">
          <UserRound className="text-yellow-500" />
        </div>
        <span className="text-zinc-600">
          تعداد کاربران: {metadata.numberOfUsers} نفر
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-blue-200 p-2 rounded-md">
          <UserRoundCog className="text-blue-500" />
        </div>
        <span className="text-zinc-600">
          تعداد ادمین ها: {metadata.numberOfAdmins} نفر
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-green-200 p-2 rounded-md">
          <UsersRound className="text-green-500" />
        </div>
        <span className="text-zinc-600">
          تعداد کل: {metadata.totalUsers} نفر
        </span>
      </div>
    </div>
  );
};

export default UsersMetadata;
