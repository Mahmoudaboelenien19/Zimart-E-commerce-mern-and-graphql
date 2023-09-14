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
import { useDebounce } from "use-debounce";
interface productListContextInterface {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  products: ProductInterface[];
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
  categoryFilter: string | number;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | number>>;
  productFeatured: string | number;
  setProductFeatured: React.Dispatch<React.SetStateAction<string | number>>;
  priceFilter: string | number;
  setPriceFilter: React.Dispatch<React.SetStateAction<number | string>>;
  RateChecked: string | number;
  setRateChecked: React.Dispatch<React.SetStateAction<number | string>>;
  productSearchWord: string;
  setroductSearchWord: React.Dispatch<React.SetStateAction<string>>;
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

  const [showFilter, setShowFilter] = useState(false);

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [productFeatured, setProductFeatured] = useState<string | number>("");
  const [priceFilter, setPriceFilter] = useState<string | number>(0);
  const [productSearchWord, setroductSearchWord] = useState<string>("");
  const [RateChecked, setRateChecked] = useState<string | number>("");
  const [value] = useDebounce(
    productSearchWord,
    productSearchWord === "" ? 0 : 800
  );

  return (
    <productListContext.Provider
      value={{
        isPending,
        startTransition,
        setShowFilter,
        showFilter,
        products,
        setProducts,
        categoryFilter,
        setCategoryFilter,
        productFeatured,
        setProductFeatured,
        priceFilter,
        setPriceFilter,
        RateChecked,
        setRateChecked,
        productSearchWord: value,
        setroductSearchWord,
      }}
    >
      {children}
    </productListContext.Provider>
  );
};

export default FilterDataContext;
