export type Compare = {
  productId: string;
  title: string;
};

export type Cart = {
  count: number;
  stock: number;
  parentId: string;
} & Fav;

export type cartInitialState = {
  cart: Cart[];
};
export type Images = {
  productPath: string;
  _id: string;
};

export type authContext = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
  userId: string;
  name: string;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  role: string;
  image: string;
  createdAt: Date;
  lastLogIn: Date;
  // [key: string]: string |  undefined;
};
