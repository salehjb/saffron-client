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
import SkeletonImage from "@/components/ui/SkeletonImage";
import { Textarea } from "@/components/ui/Textarea";
import { useAdminContext } from "@/context/admin/AdminContext";
import { useAdminProducts } from "@/context/admin/AdminProductsContext";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import {
  createProductPayload,
  createProductValidator,
} from "@/validations/admin/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ImagePlus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateProduct = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productImagePreview, setProductImagePreview] = useState<string>("");

  const { refreshProducts } = useAdminProducts();
  const { categories } = useAdminContext();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<createProductPayload>({
    resolver: zodResolver(createProductValidator),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: null,
      categoryId: "",
    },
  });

  const { mutate: createProductHandler, isPending } = useMutation({
    mutationFn: async (payload: createProductPayload) => {
      await api.post("/admin/products/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
      } else {
        toast({
          title: "ساخت محصول با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "محصول با موفقیت ساخته شد",
        variant: "success",
      });
      setIsOpen(false);
      resetForm();
      setProductImagePreview("");
      refreshProducts();
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
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ساخت محصول جدید</DialogTitle>
        </DialogHeader>
        <hr />
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit((e) => createProductHandler(e))}
        >
          <div className="col-span-2 space-y-1">
            <div className="w-2/3 h-72 rounded-md overflow-hidden">
              {productImagePreview ? (
                <div className="relative w-full h-full">
                  <SkeletonImage
                    src={productImagePreview}
                    alt="product-image"
                    fill
                  />
                  <Button
                    size="icon"
                    className="absolute bg-transparent border-2 hover:bg-white/30 left-2 top-2"
                    onClick={() => {
                      setProductImagePreview("");
                      setValue("image", null);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="product-image-input"
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2 bg-zinc-200 text-zinc-600"
                  >
                    <ImagePlus className="w-7 h-7" />
                    <p>آپلود تصویر محصول</p>
                  </label>
                  <input
                    id="product-image-input"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const file = e.target.files[0];
                      const objectURL = URL.createObjectURL(file);
                      setProductImagePreview(objectURL);
                      setValue("image", file);
                    }}
                  />
                </>
              )}
            </div>
            <ErrorText error={errors.image} />
          </div>
          <div className="space-y-1">
            <Label>نام محصول</Label>
            <Input {...register("name")} />
            <ErrorText error={errors.name} />
          </div>
          <div className="space-y-1">
            <Label>قیمت محصول</Label>
            <Input
              {...register("price", {
                setValueAs: (v) => parseInt(v),
              })}
            />
            <ErrorText error={errors.price} />
          </div>
          <div className="space-y-1">
            <Label>دسته بندی</Label>
            <Select
              dir="rtl"
              value={watch("categoryId")}
              onValueChange={(v) => setValue("categoryId", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب دسته بندی" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorText error={errors.categoryId} />
          </div>
          <div className="col-span-2 space-y-1">
            <Label>توضیحات محصول</Label>
            <Textarea
              {...register("description")}
              className="resize-none h-44 overflow-y-auto"
            />
            <ErrorText error={errors.description} />
          </div>
          <Button
            className="bg-green-500 hover:bg-green-600 col-span-2"
            isLoading={isPending}
          >
            ساخت محصول
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
