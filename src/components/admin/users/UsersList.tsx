"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useAdminUsers } from "@/context/admin/AdminUsersContext";
import { convertDate } from "@/lib";
import { Loader2 } from "lucide-react";
import EditUser from "./EditUser";

const UsersList = () => {
  const { users, isUsersLoading, isFetchingNextPage, lastUserRef } =
    useAdminUsers();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام کاربر</TableHead>
            <TableHead>تلفن همراه</TableHead>
            <TableHead>نقش</TableHead>
            <TableHead>تعداد سفارش های ثبت شده</TableHead>
            <TableHead>تاریخ ثبت نام</TableHead>
            <TableHead>اکشن ها</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, i) => (
            <TableRow
              key={user.id}
              ref={users.length - 1 === i ? lastUserRef : null}
            >
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.role === "ADMIN" ? "ادمین" : "کاربر"}</TableCell>
              <TableCell>0 عدد</TableCell>
              <TableCell>{convertDate(user.createdAt)}</TableCell>
              <TableCell>
                <EditUser user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(isUsersLoading || isFetchingNextPage) && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {!isUsersLoading && users?.length === 0 && (
        <p className="text-center">کاربری یافت نشد!</p>
      )}
    </>
  );
};

export default UsersList;
