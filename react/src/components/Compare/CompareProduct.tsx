import { useEffect, useRef, useState } from "react";
import Container from "../widgets/shared/Container";
import "./compare.scss";
import SelectProduct from "./ProductSelect";
import { useAppDispatch } from "@/custom/helpers/reduxTypes";
import useGetCollection from "@/custom/shopping/useGetCollection";
import { addToCompareRedux } from "@/redux/compareSlice";
import Transition from "../widgets/animation/transition/Transition";
export const Component = () => {
  const [firstproduct, setFirstProduct] = useState("");
  const [secondproduct, setSecondProduct] = useState("");
  const dispatch = useAppDispatch();
  const { loading, data } = useGetCollection("compare");
  const initialRender = useRef(true);

  useEffect(() => {
    if (!loading && data && initialRender.current) {
      dispatch(addToCompareRedux(data));
      initialRender.current = false;
    }
  }, [loading]);
  return (
    <Container className="compare-products">
      <Transition />

      <SelectProduct
        order="first"
        product={firstproduct || ""}
        setProduct={setFirstProduct}
      />
      <SelectProduct
        order="second"
        product={secondproduct || ""}
        setProduct={setSecondProduct}
      />
    </Container>
  );
};
