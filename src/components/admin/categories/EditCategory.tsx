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
import { Edit } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface EditCategoryProps {
  category: ICategory;
}

const EditCategory: FC<EditCategoryProps> = ({ category }) => {
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

  const { mutate: updateCategoryHandler, isPending } = useMutation({
    mutationFn: async (payload: createAndUpdateCategoryPayload) => {
      await api.put(`/admin/categories/update/${category.id}`, payload);
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
          title: "بروزرسانی دسته بندی با مشکل مواجه شد",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "دسته بندی با موفقیت بروزرسانی شد",
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
        <Button className="bg-blue-200 hover:bg-blue-300">
          <Edit className="w-5 h-5 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>بروزرسانی دسته بندی " {category.name} "</DialogTitle>
        </DialogHeader>
        <hr />
        <form
          className="grid grid-cols-1 gap-3"
          onSubmit={handleSubmit((e) => updateCategoryHandler(e))}
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
            بروزرسانی دسته بندی
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
