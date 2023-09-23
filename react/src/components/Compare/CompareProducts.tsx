import React, { useState } from "react";
import Animation from "../widgets/animation/Animation";
import SeletedProduct from "./SeletedProduct";

export const Component = () => {
  const [firstproduct, setFirstProduct] = useState("");
  const [secondproduct, setSecondProduct] = useState("");

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
