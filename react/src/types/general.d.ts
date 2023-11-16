import { Product } from "./product";

export type Children = {
  children: React.ReactNode;
};
export type Details = {
  title: string;
  price: number;
  stock: number;
  _id: string;
  path: string;
  count?: number;
};
type OrderDetails = {
  productId: string;
} & Omit<Details, "_id" | "stock">;

export type Collection = {
  id: string;
  count: number;
  product?: Omit<Product, "createdAt">;
};

export type State = {
  bool: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};
