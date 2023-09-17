import React, {
  createContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { ChildrenInterFace } from "../interfaces/general.js";
import { useQuery } from "@apollo/client";
import { Get_All_Products } from "../graphql/general.js";
import { addToProductRedux } from "../redux/productSlice.js";
import { useAppDispatch } from "../custom/reduxTypes.js";
import { ProductInterface } from "../interfaces/product.js";
interface productListContextInterface {
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  products: ProductInterface[];
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

export const productListContext = createContext(
  {} as productListContextInterface
);

const FilterDataContext = ({ children }: ChildrenInterFace) => {
  const [isPending, startTransition] = useTransition();

  const { data, loading } = useQuery(Get_All_Products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.products) {
      dispatch(addToProductRedux(data?.products.slice(0).reverse()));
    }
  }, [loading]);

  const [products, setProducts] = useState<ProductInterface[]>([]);

  return (
    <productListContext.Provider
      value={{
        isPending,
        startTransition,
        products,
        setProducts,
      }}
    >
      {children}
    </productListContext.Provider>
  );
};

export default FilterDataContext;
