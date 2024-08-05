import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useAddToCartMutation = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: async (productId: string) => {
      await api.post(`/cart/add/${productId}`);
    },
    onError: () => {
      toast({
        title: "افزودن محصول به سبد خرید با مشکل مواجه شد",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

export const useDecreaseFromCartMutation = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: async (productId: string) => {
      await api.post(`/cart/decrease/${productId}`);
    },
    onError: () => {
      toast({
        title: "کم کردن محصول از سبد خرید با مشکل مواجه شد",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

export const useRemoveFromCartMutation = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: async (cartItemId: string) => {
      await api.delete(`/cart/remove/${cartItemId}`);
    },
    onError: () => {
      toast({
        title: "حذف محصول از سبد خرید با مشکل مواجه شد",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};
