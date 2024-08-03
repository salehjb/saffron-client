"use client";

import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useAdminUsers } from "@/context/admin/AdminUsersContext";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import {
  editUserPayload,
  editUserValidator,
} from "@/validations/admin/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Edit, UserRound } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface EditUserProps {
  user: IUser;
}

const EditUser: FC<EditUserProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refreshUsers } = useAdminUsers();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<editUserPayload>({
    resolver: zodResolver(editUserValidator),
    defaultValues: {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
  });

  const { mutate: editUserHandler, isPending } = useMutation({
    mutationFn: async (payload: editUserPayload) => {
      await api.put(`/admin/users/edit/${user.id}`, payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "این شماره موبایل از قبل موجود میباشد",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "بروزرسانی کاربر با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "بروزرسانی کاربر موفقیت آمیز بود",
        variant: "success",
      });
      setIsOpen(false);
      refreshUsers();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="bg-blue-200 hover:bg-blue-300">
          <Edit className="w-5 h-5 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>بروزرسانی اطلاعات کاربر</DialogTitle>
        </DialogHeader>
        <hr />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-100 p-3 rounded-full">
              <UserRound className="w-5 h-5" />
            </div>
            <span>{user.fullName}</span>
          </div>
          <form
            className="grid grid-cols-2 gap-3"
            onSubmit={handleSubmit((e) => editUserHandler(e))}
          >
            <div className="space-y-1">
              <Label>نام و نام خانوادگی</Label>
              <Input {...register("fullName")} />
              <ErrorText error={errors.fullName} />
            </div>
            <div className="space-y-1">
              <Label>شماره همراه</Label>
              <Input {...register("phoneNumber")} />
              <ErrorText error={errors.phoneNumber} />
            </div>
            <div className="space-y-1">
              <Label>نقش</Label>
              <Select
                dir="rtl"
                value={watch("role")}
                onValueChange={(v: RoleType) => setValue("role", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب نقش" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">کاربر</SelectItem>
                  <SelectItem value="ADMIN">ادمین</SelectItem>
                </SelectContent>
              </Select>
              <ErrorText error={errors.role} />
            </div>
            <Button
              type="submit"
              isLoading={isPending}
              className="col-span-2 bg-green-500 hover:bg-green-600"
            >
              بروزرسانی کاربر
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
