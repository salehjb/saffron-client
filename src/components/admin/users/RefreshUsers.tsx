"use client";

import { Button } from "@/components/ui/Button";
import { useAdminUsers } from "@/context/admin/AdminUsersContext";
import { RotateCw } from "lucide-react";

const RefreshUsers = () => {
  const { refreshUsers, isUsersRefresh } = useAdminUsers();

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 gap-2"
      onClick={refreshUsers}
    >
      <RotateCw className={`w-5 h-5 ${isUsersRefresh ? "animate-spin" : ""}`} />
      رفرش
    </Button>
  );
};

export default RefreshUsers;
