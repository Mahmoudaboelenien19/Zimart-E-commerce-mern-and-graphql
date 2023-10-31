import { useEffect } from "react";
import DashMain from "../DashMain";
import ProductList from "@/components/Product/Products/AllProducts/ProductList";

export const Component = () => {
  useEffect(() => {
    document.title = " Dashboard | All Products";
  }, []);
  return (
    <DashMain>
      <ProductList isDash />
    </DashMain>
  );
};
