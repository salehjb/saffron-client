"use client";

import { Button } from "@/components/ui/Button";
import { useAdminOrders } from "@/context/admin/AdminOrdersContext";
import { RotateCw } from "lucide-react";

const RefreshOrders = () => {
  const { refreshOrders, isOrdersRefresh } = useAdminOrders();

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 gap-2"
      onClick={refreshOrders}
    >
      <RotateCw
        className={`w-5 h-5 ${isOrdersRefresh ? "animate-spin" : ""}`}
      />
      رفرش
    </Button>
  );
};

export default RefreshOrders;
