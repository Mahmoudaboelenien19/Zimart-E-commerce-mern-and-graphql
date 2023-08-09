import React, { Fragment, useEffect } from "react";

import DashForm from "./DashForm";
import { useMutation } from "@apollo/client";
import { Add_Product } from "../../../graphql/mutations/product.js";

const DashAddProduct = () => {
  const [addProductFn] = useMutation(Add_Product);
  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboaed | Add Product";
    }, 1000);
  }, []);
  return (
    <Fragment>
      <DashForm
        key={"addProduct"}
        head="add product"
        fn={addProductFn}
        btn="add"
        type="add"
      />
    </Fragment>
  );
};

export default DashAddProduct;
