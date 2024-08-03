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
import { useAdminCategories } from "@/context/admin/AdminCategoriesContext";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import {
  createAndUpdateCategoryPayload,
  createAndUpdateCategoryValidator,
} from "@/validations/admin/category.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refreshCategories } = useAdminCategories();

  const {
    handleSubmit,
    register,
    reset: resetForm,
    formState: { errors },
  } = useForm<createAndUpdateCategoryPayload>({
    resolver: zodResolver(createAndUpdateCategoryValidator),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createCategoryHandler, isPending } = useMutation({
    mutationFn: async (payload: createAndUpdateCategoryPayload) => {
      await api.post("/admin/categories/create", payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast({
            title: "دسته بندی با این نام موجود میباشد",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "ساخت دسته بندی با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "دسته بندی با موفقیت ایجاد شد",
        variant: "success",
      });
      setIsOpen(false);
      resetForm();
      refreshCategories();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 gap-2">
          <Plus className="w-5 h-5" />
          افزودن
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>افزودن دسته بندی</DialogTitle>
        </DialogHeader>
        <hr />
        <form
          className="grid grid-cols-1 gap-3"
          onSubmit={handleSubmit((e) => createCategoryHandler(e))}
        >
          <div className="space-y-1">
            <Label>نام دسته بندی ( یکتا )</Label>
            <Input {...register("name")} />
            <ErrorText error={errors.name} />
          </div>
          <Button
            type="submit"
            isLoading={isPending}
            className="col-span-2 bg-green-500 hover:bg-green-600"
          >
            افزودن دسته بندی
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
