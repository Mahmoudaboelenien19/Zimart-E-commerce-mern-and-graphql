import React, { useContext, useEffect } from "react";
import DashMain from "../DashMain";
import { Outlet } from "react-router-dom";
import ProductList from "@/components/Product/Products/AllProducts/ProductList";
import { viewContext } from "@/context/gridView";

export const Component = () => {
  const { setGridView } = useContext(viewContext);

  useEffect(() => {
    setGridView(true);
    setTimeout(() => {
      document.title = " Dashboard | All Products";
    }, 400);
  }, []);
  return (
    <DashMain>
      <div className=" dash-products">
        <ProductList isDash />
        <Outlet />
      </div>
    </DashMain>
  );
};
