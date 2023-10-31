interface imageInterface {
  productPath: string;
  ProductName: string;
}

interface reviewInterface {
  image: string;
  user: string;
  userId: string;
  review: string;

  rate: number;
  status?: number;
  msg?: string;
}

export interface productInterface {
  _id?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: imageInterface[];
  rating: number[];
  reviews: reviewInterface[];
}
