"use client";

import { useAdminOrders } from "@/context/admin/AdminOrdersContext";
import {
  BringToFront,
  CircleDashed,
  ListOrdered,
  PackageCheck,
  PackageX,
  Truck,
} from "lucide-react";

const OrdersMetadata = () => {
  const { metadata } = useAdminOrders();

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-yellow-200 p-2 rounded-md">
          <ListOrdered className="text-yellow-500" />
        </div>
        <span className="text-zinc-600">
          تعداد کل سفارشات: {metadata.totalOrders} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-orange-200 p-2 rounded-md">
          <CircleDashed className="text-orange-500" />
        </div>
        <span className="text-zinc-600">
          تعداد سفارشات در حال انتظار: {metadata.totalPendingOrders} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-lime-200 p-2 rounded-md">
          <BringToFront className="text-lime-500" />
        </div>
        <span className="text-zinc-600">
          تعداد سفارشات در حال پردازش: {metadata.totalProcessingOrders} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-purple-200 p-2 rounded-md">
          <Truck className="text-purple-500" />
        </div>
        <span className="text-zinc-600">
          تعداد سفارشات در حال ارسال: {metadata.totalShippedOrders} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-green-200 p-2 rounded-md">
          <PackageCheck className="text-green-500" />
        </div>
        <span className="text-zinc-600">
          تعداد سفارشات تحویل داده شده: {metadata.totalDeliveredOrders} عدد
        </span>
      </div>
      <div className="p-4 border rounded-md flex items-center gap-3">
        <div className="w-fit bg-red-200 p-2 rounded-md">
          <PackageX className="text-red-500" />
        </div>
        <span className="text-zinc-600">
          تعداد سفارشات کنسل شده: {metadata.totalCanceledOrders} عدد
        </span>
      </div>
    </div>
  );
};

export default OrdersMetadata;
