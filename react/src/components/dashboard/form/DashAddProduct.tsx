import React, { useEffect } from "react";

import DashForm from "./DashForm";
import { useMutation } from "@apollo/client";
import { Add_Product } from "@/graphql/mutations/product";

const DashAddProduct = () => {
  const [addProductFn] = useMutation(Add_Product);
  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboaed | Add Product";
    }, 1000);
  }, []);
  return (
    <DashForm
      key={"addProduct"}
      head="add product"
      fn={addProductFn}
      btn="add"
      type="add"
    />
  );
};

export default DashAddProduct;
