import React, { useContext, useState } from "react";
import Animation from "../widgets/animation/Animation";
import SeletedProduct from "./SeletedProduct";
import { Navigate } from "react-router-dom";
import { isAuthContext } from "@/context/isAuth";

const CompareProducts = () => {
  const [firstproduct, setFirstProduct] = useState("");
  const [secondproduct, setSecondProduct] = useState("");
  const { isAuth } = useContext(isAuthContext);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Animation>
      <div className="compare-products">
        <SeletedProduct
          order="first"
          product={firstproduct}
          setProduct={setFirstProduct}
        />
        <SeletedProduct
          order="second"
          product={secondproduct}
          setProduct={setSecondProduct}
        />
      </div>
    </Animation>
  );
};

export default CompareProducts;
