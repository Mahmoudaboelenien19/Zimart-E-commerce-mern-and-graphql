export interface favInterface {
  productId: string;
  path: string;
  _id: string;
  parentId?: string;
  product: {
    stock: number;
    title: string;
    price: number;
  };
}
export interface compareInterface {
  productId: string;
  title: string;
}

export interface cartInterface extends favInterface {
  count: number;
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

interface userDataState {
  email: string;
  name: string;
  country: string;
  phone: string;
  fav?: favInterface[];
  cart?: cartInterface[];
  compare?: compareInterface[];
  //-imp to use braket notation wuth variables
  [key: string]: any;
}

interface authContextInterface extends userDataState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<userDataState>>;
  isAdmin: boolean;
}
