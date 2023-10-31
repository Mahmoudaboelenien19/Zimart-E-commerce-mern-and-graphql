import { useState } from "react";
import Container from "../widgets/shared/Container";
import "./compare.scss";
import SelectProduct from "./ProductSelect";
export const Component = () => {
  const [firstproduct, setFirstProduct] = useState("");
  const [secondproduct, setSecondProduct] = useState("");
  console.log({ firstproduct });
  return (
    <Container className="compare-products">
      <SelectProduct
        order="first"
        product={firstproduct}
        setProduct={setFirstProduct}
      />
      <SelectProduct
        order="second"
        product={secondproduct}
        setProduct={setSecondProduct}
      />
    </Container>
  );
};
