"use client";

import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useDashboardAddress } from "@/context/dashboard/DashboardAddressContext";
import api from "@/lib/api";

interface RemoveAddressProps {
  addressId: string;
}

const RemoveAddress: FC<RemoveAddressProps> = ({ addressId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refreshAddresses } = useDashboardAddress();

  const { mutate: removeAddressHandler, isPending: isRemoveAddressLoading } =
    useMutation({
      mutationFn: async () => {
        await api.delete(`/user/addresses/remove/${addressId}`);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 400 &&
            err.response.data.error === "ACTIVE_ORDER"
          ) {
            toast({
              title: "شما با این آدرس سفارش فعال دارید",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "حذف آدرس با مشکل مواجه شد",
            variant: "destructive",
          });
        }
      },
      onSuccess: () => {
        toast({
          title: "آدرس با موفقیت حذف شد",
          variant: "success",
        });
        setIsOpen(false);
        refreshAddresses();
      },
    });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-start gap-2 text-red-500 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
          حذف آدرس
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            آیا از حذف این آدرس اطمینان دارید؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            در صورتی که با این آدرس سفارش تکمیل نشده دارید امکان حذف آن وجود
            ندارد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>نه، حذف نکن</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.preventDefault();
              removeAddressHandler();
            }}
            disabled={isRemoveAddressLoading}
          >
            {isRemoveAddressLoading && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
            بله، حذف کن
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveAddress;
