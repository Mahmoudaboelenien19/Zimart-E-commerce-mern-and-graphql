export interface favInterface {
  productId: string;
  path: string;
  _id: string;
  parentId: string;
  product: {
    stock: number;
    title: string;
    price: number;
  };
  title?: string;
  price?: number;
}
export interface compareInterface {
  productId: string;
  title: string;
}

export interface cartInterface extends favInterface {
  count: number;
  stock?: number;
  parentId: string;
}

export interface favInitialState {
  fav: favInterface[];
}

export interface cartInitialState {
  cart: cartInterface[];
}
export interface imagesInterface {
  productPath: string;
  _id: string;
}

export interface authContextInterface {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
  userId: string;
  name: string;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  country?: string;
  phone?: string;
  role: string;
  image?: string;
  createdAt: string;
  lastLogIn: string;
}
