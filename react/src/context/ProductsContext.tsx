import React, { createContext, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general.js";
import { ProductInterface } from "../interfaces/product.js";

interface productListContextInterface {
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  products: ProductInterface[];
  totalProductsNum: number;
  setTotalProductsNum: React.Dispatch<React.SetStateAction<number>>;
}

export const productListContext = createContext(
  {} as productListContextInterface
);

const ProductsContext = ({ children }: ChildrenInterFace) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [totalProductsNum, setTotalProductsNum] = useState(1);
  return (
    <productListContext.Provider
      value={{
        products,
        totalProductsNum,
        setTotalProductsNum,
        setProducts,
      }}
    >
      {children}
    </productListContext.Provider>
  );
};

export default ProductsContext;
