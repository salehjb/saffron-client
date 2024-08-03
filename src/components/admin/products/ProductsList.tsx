"use client";

import LoadingPopup from "@/components/LoadingPopup";
import { Switch } from "@/components/ui/Switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useAdminProducts } from "@/context/admin/AdminProductsContext";
import { toast } from "@/hooks/use-toast";
import { separatePrice } from "@/lib";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import EditProduct from "./EditProduct";
import RemoveProduct from "./RemoveProduct";

const ProductsList = () => {
  const [changeIsLoading, setChangeIsLoading] = useState({
    productId: "",
    isLoading: false,
  });

  const {
    products,
    isProductsLoading,
    isFetchingNextPage,
    lastProductRef,
    refreshProducts,
  } = useAdminProducts();

  const toggleProductIsActiveHandler = async (
    productId: string,
    newIsActive: boolean
  ) => {
    setChangeIsLoading({
      productId,
      isLoading: true,
    });
    await api
      .patch(`/admin/products/change-is-active/${productId}`, {
        isActive: newIsActive,
      })
      .then(() => {
        toast({
          title: "تغییر وضعیت فعالیت محصول موفقیت آمیز بود",
          variant: "success",
        });
        setChangeIsLoading({
          productId: "",
          isLoading: false,
        });
        refreshProducts();
      })
      .catch(() => {
        toast({
          title: "مشکلی در تغییر وضعیت فعالیت محصول پیش آمد",
          variant: "destructive",
        });
        setChangeIsLoading({
          productId: "",
          isLoading: false,
        });
      });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام محصول</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>لینک تصویر</TableHead>
            <TableHead>وضعیت فعال بودن</TableHead>
            <TableHead>دسته بندی</TableHead>
            <TableHead>تعداد فروش</TableHead>
            <TableHead>جمع کل فروش</TableHead>
            <TableHead>اکشن ها</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, i) => (
            <TableRow
              key={product.id}
              ref={products.length - 1 === i ? lastProductRef : null}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{separatePrice(product.price)} تومان</TableCell>
              <TableCell>
                <a href={product.image} target="_blank">
                  مشاهده تصویر
                </a>
              </TableCell>
              <TableCell>
                <Switch
                  dir="ltr"
                  checked={product.isActive}
                  onCheckedChange={(c) =>
                    toggleProductIsActiveHandler(product.id, c)
                  }
                  disabled={
                    product.id === changeIsLoading.productId
                      ? changeIsLoading.isLoading
                      : false
                  }
                />
              </TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.totalQuantitySold}</TableCell>
              <TableCell>
                {separatePrice(product.totalSalesAmount)} تومان
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <RemoveProduct product={product} />
                  <EditProduct product={product} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(isProductsLoading || isFetchingNextPage) && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {!isProductsLoading && products?.length === 0 && (
        <p className="text-center">محصولی یافت نشد!</p>
      )}
    </>
  );
};

export default ProductsList;
