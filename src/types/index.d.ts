interface IProduct {
  image: string;
  title: string;
  price: number;
}

type RoleType = "USER" | "ADMIN";

interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  role: RoleType;
  createdAt: Date;
}

interface ICategory {
  id: string;
  name: string;
  _count: {
    products: number;
  };
}

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  category: ICategory;
  totalQuantitySold: number;
  totalSalesAmount: number;
  createdAt: Date;
}
