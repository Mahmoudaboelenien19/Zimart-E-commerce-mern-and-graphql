import React, {
  createContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { ChildrenInterFace } from "../interfaces/general.js";
import { ProductInterface } from "../interfaces/product.js";

interface productListContextInterface {
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  products: ProductInterface[];
  isPending: boolean;
  delayedPending: boolean;
  startTransition: React.TransitionStartFunction;
  totalProductsNum: number;
  setTotalProductsNum: React.Dispatch<React.SetStateAction<number>>;
}

export const productListContext = createContext(
  {} as productListContextInterface
);

const FilterDataContext = ({ children }: ChildrenInterFace) => {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [totalProductsNum, setTotalProductsNum] = useState(1);
  /* 
  this state not to show the old data then show new
  */
  const [delayedPending, setDelayedPending] = useState(true);
  useEffect(() => {
    let timer: number;
    if (isPending && !delayedPending) {
      setDelayedPending(isPending);
    }
    if (delayedPending && !isPending) {
      timer = setTimeout(() => {
        setDelayedPending(isPending);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isPending]);
  return (
    <productListContext.Provider
      value={{
        isPending,
        startTransition,
        products,
        totalProductsNum,
        setTotalProductsNum,
        setProducts,
        delayedPending,
      }}
    >
      {children}
    </productListContext.Provider>
  );
};

export default FilterDataContext;
