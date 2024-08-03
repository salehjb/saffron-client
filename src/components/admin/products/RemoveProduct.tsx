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
import { useAdminProducts } from "@/context/admin/AdminProductsContext";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { FC, useState } from "react";

interface RemoveProductProps {
  product: IProduct;
}

const RemoveProduct: FC<RemoveProductProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refreshProducts } = useAdminProducts();

  const { mutate: removeProductHandler, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete(`/admin/products/delete/${product.id}`);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toast({
            title: "محصول دارای خریدار قابل حذف نیست",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "حذف محصول با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "محصول با موفقیت حذف شد",
        variant: "success",
      });
      setIsOpen(false);
      refreshProducts();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" className="bg-red-200 hover:bg-red-300">
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            آیا از حذف محصول " {product.name} " اطمینان دارید؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            تنها در حالتی حذف محصول امکان پذیر است که تعداد فروش آن صفر باشد، و
            کاربری آن را خریداری نکرده باشد. به دلیل اینکه مشخصات محصولات در
            آمار های فروش استفاده میشوند.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>نه، حذف نکن</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              if (product.totalQuantitySold > 0) return;
              e.preventDefault();
              removeProductHandler();
            }}
            disabled={product.totalQuantitySold > 0 || isPending}
          >
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            بله،‌ حذف کن
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveProduct;
