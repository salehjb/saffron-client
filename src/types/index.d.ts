interface IProduct {
  image: string;
  title: string;
  price: number;
}

type RoleType = "ADMIN" | "USER";
interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  role: RoleType;
  createdAt: Date;
}

interface ICart {
  items: ICartItem[];
}

interface ICartProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface ICartItem {
  id: string;
  productId: string;
  cartId: string;
  product: ICartProduct;
  quantity: number;
}

interface IAddress {
  id: string;
  userId: string;
  isReceiverMe: boolean;
  province: IProvince;
  city: ICity;
  address: string;
  receiverInformation: {
    fullName: string;
    phoneNumber: string;
  };
  floor: number;
  unit: number;
  houseNumber: string;
  postalCode: number;
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

enum OrderStatus {
  PENDING,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELED,
}

interface IOrder {
  id: string;
  user: {
    fullName: string;
    phoneNumber: string;
  };
  orderItems: IOrderItem[];
  address: IAddress;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
}

interface IOrderItem {
  id: string;
  product: {
    name: string;
  };
  quantity: number;
  price: number;
}

interface IProvince {
  id: number;
  title: string;
  slug: string;
  latitude: number;
  longitude: number;
}

interface ICity {
  id: number;
  title: string;
  slug: string;
  province_id: number;
  latitude: number;
  longitude: number;
}
