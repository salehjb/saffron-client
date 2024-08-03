"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useAdminCategories } from "@/context/admin/AdminCategoriesContext";
import { useAdminContext } from "@/context/admin/AdminContext";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { FC, useState } from "react";

interface RemoveCategoryProps {
  category: ICategory;
}

const RemoveCategory: FC<RemoveCategoryProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newCategoryId, setNewCategoryId] = useState<string>("");

  const { refreshCategories } = useAdminCategories();
  const { categories } = useAdminContext();

  const { mutate: removeCategoryHandler, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete(`/admin/categories/delete/${category.id}`, {
        headers: {
          newCategoryId: newCategoryId ?? undefined,
        },
      });
    },
    onError: () => {
      toast({
        title: "حذف دسته بندی با مشکل مواجه شد",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "دسته بندی با موفقیت حذف شد",
        variant: "success",
      });
      setIsOpen(false);
      refreshCategories();
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-200 hover:bg-red-300">
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            آیا از حذف دسته بندی " {category.name} " اطمینان دارید؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            در صورتی که قصد حذف کردن این دسته بندی را دارید، ابتدا باید برای
            محصولاتی که دارای این دسته بندی هستند، دسته بندی دیگری انتخاب کنید.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Select
          dir="rtl"
          value={newCategoryId}
          onValueChange={(v) => setNewCategoryId(v)}
          disabled={category._count.products === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="دسته بندی جدید را انتخاب نمایید" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {categories
              ?.filter((item) => item.id !== category.id)
              ?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>نه، حذف نکن</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.preventDefault();
              removeCategoryHandler();
            }}
            disabled={isPending}
          >
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            بله، حذف کن
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveCategory;
