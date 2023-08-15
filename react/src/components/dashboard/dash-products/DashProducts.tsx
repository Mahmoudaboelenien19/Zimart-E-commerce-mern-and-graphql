import React, { useContext, useEffect } from "react";
import ProductList from "../../Product/Products/AllProducts/ProductList";
import { viewContext } from "../../../context/gridView";
import DashMain from "../DashMain";
import { Outlet } from "react-router-dom";
import useProductsSubscription from "../../../custom/useProductsSubscription";

const DashProducts = () => {
  const { setGridView } = useContext(viewContext);
  useProductsSubscription();

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

export default DashProducts;
