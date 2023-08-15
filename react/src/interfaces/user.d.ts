export interface favInterface {
  title: string;
  price: number;
  productId: string;
  path: string;
  _id: string;
  parentId?: string;
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
