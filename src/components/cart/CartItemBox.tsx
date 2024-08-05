import { FC, HTMLAttributes, useState } from "react";
import SkeletonImage from "../ui/SkeletonImage";
import { separatePrice } from "@/lib";
import { Button } from "../ui/Button";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import {
  useAddToCartMutation,
  useDecreaseFromCartMutation,
} from "@/mutations/cartMutations";

interface CartItemBoxProps extends HTMLAttributes<HTMLLIElement> {
  item: ICartItem;
  refreshCart: () => void;
}

const CartItemBox: FC<CartItemBoxProps> = ({ item, refreshCart, ...props }) => {
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const addMutation = useAddToCartMutation(async () => {
    await refreshCart();
    setLocalLoading(false);
  });

  const decreaseMutation = useDecreaseFromCartMutation(async () => {
    await refreshCart();
    setLocalLoading(false);
  });

  return (
    <li {...props}>
      <div className="relative w-20 h-20 rounded-md overflow-hidden">
        <SkeletonImage src={item.product.image} alt="product-image" fill />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">{item.product.name}</p>
        <p className="text-sm text-green-500">
          {separatePrice(item.product.price)} تومان
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-4 items-end">
        <Button
          size="icon"
          className="w-8 h-8 bg-transparent border border-red-500 hover:bg-red-200 text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className="w-8 h-8 bg-zinc-200 hover:bg-zinc-300 text-black"
            onClick={() => {
              setLocalLoading(true);
              decreaseMutation.mutate(item.product.id);
            }}
            disabled={localLoading}
          >
            <Minus className="w-3 h-3" />
          </Button>
          {localLoading ? (
            <Loader2 className="w-4 h-4 animate-spin m-auto text-zinc-300" />
          ) : (
            <div className="flex items-center justify-center">
              {item.quantity || 0}
            </div>
          )}
          <Button
            size="icon"
            className="w-8 h-8 bg-zinc-200 hover:bg-zinc-300 text-black"
            onClick={() => {
              setLocalLoading(true);
              addMutation.mutate(item.product.id);
            }}
            disabled={localLoading}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItemBox;
