import { imagesInterface } from "./user";

export type Review = {
  image: string;
  user: string;
  review: string;
  _id: string;
  rate: number;
  userId: string;
  userData?: {
    name: string;
    image: string;
  };
};

export type Product = {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: imagesInterface[];
  rating: number[];
  _id: string;
  reviews: reviewInterface[];
  createdAt: string;
  state: string;
};
