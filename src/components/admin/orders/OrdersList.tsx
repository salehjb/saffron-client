"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useAdminOrders } from "@/context/admin/AdminOrdersContext";
import { convertDate, orderStatusHandler, separatePrice } from "@/lib";
import { Loader2 } from "lucide-react";

const OrdersList = () => {
  const {
    orders,
    isOrdersLoading,
    isFetchingNextPage,
    lastOrderRef,
    refreshOrders,
  } = useAdminOrders();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام کاربر</TableHead>
            <TableHead>شماره همراه کاربر</TableHead>
            <TableHead>تعداد محصولات</TableHead>
            <TableHead>مبلغ کل</TableHead>
            <TableHead>وضعیت سفارش</TableHead>
            <TableHead>تاریخ ثبت</TableHead>
            <TableHead>اکشن ها</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, i) => (
            <TableRow>
              <TableCell>{order.user.fullName}</TableCell>
              <TableCell>{order.user.phoneNumber}</TableCell>
              <TableCell>{order.orderItems.length}</TableCell>
              <TableCell>{separatePrice(order.totalPrice)}</TableCell>
              <TableCell>{orderStatusHandler(order.status)}</TableCell>
              <TableCell>{convertDate(order.createdAt)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(isOrdersLoading || isFetchingNextPage) && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {!isOrdersLoading && orders?.length === 0 && (
        <p className="text-center">سفارشی یافت نشد!</p>
      )}
    </>
  );
};

export default OrdersList;
