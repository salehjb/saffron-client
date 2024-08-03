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
import { removeFalsyValues, removeMatchingFields } from "@/lib";
import api from "@/lib/api";
import {
  updateProductPayload,
  updateProductValidator,
} from "@/validations/admin/product.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Edit, ImagePlus, X } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface EditProductProps {
  product: IProduct;
}

const EditProduct: FC<EditProductProps> = ({ product }) => {
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
  } = useForm<updateProductPayload>({
    resolver: zodResolver(updateProductValidator),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
      categoryId: product.category.id,
    },
  });

  const { mutate: updateProductHandler, isPending } = useMutation({
    mutationFn: async (payload: updateProductPayload) => {
      await api.put(
        `/admin/products/update/${product.id}`,
        removeFalsyValues(removeMatchingFields(payload, product)),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
      } else {
        toast({
          title: "بروزرسانی محصول با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "محصول با موفقیت بروزرسانی شد",
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
        <Button size="icon" className="bg-blue-200 hover:bg-blue-300">
          <Edit className="w-5 h-5 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>بروزرسانی محصول</DialogTitle>
        </DialogHeader>
        <hr />
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit((e) => updateProductHandler(e))}
        >
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <h3 className="font-yekan-bakh-bold">آپلود تصویر جدید</h3>
              <div className="h-72 rounded-md overflow-hidden">
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
            <div className="flex flex-col space-y-1">
              <h3 className="font-yekan-bakh-bold">تصویر فعلی</h3>
              <div className="relative rounded-md overflow-hidden h-72">
                <SkeletonImage src={product.image} alt="product-image" fill />
              </div>
            </div>
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
            type="submit"
            className="bg-green-500 hover:bg-green-600 col-span-2"
            isLoading={isPending}
          >
            بروزرسانی محصول
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
