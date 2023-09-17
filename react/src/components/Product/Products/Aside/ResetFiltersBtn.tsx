import MainBtn from "@/components/widgets/buttons/MainBtn";
import { productListContext } from "@/context/FilterData";
import { useAppSelector } from "@/custom/reduxTypes";
import useParams from "@/custom/useParams";
import React, { useContext } from "react";
import { FiRefreshCcw } from "react-icons/fi";

const ResetFiltersBtn = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const { deleteParam } = useParams();
  const { setProducts, products } = useContext(productListContext);
  const handleResetFiltering = () => {
    deleteParam("page");
    deleteParam("price");
    deleteParam("rate");
    deleteParam("category");
    deleteParam("featured products");

    if (products.length !== Allproducts.length) {
      setProducts(Allproducts);
    }
  };

  return (
    <MainBtn
      key={"reset-filter-btn"}
      cls={"btn w-100 reset-filter center  gap"}
      btn={"            reset filters"}
      fn={handleResetFiltering}
      Icon={FiRefreshCcw}
    />
  );
};

export default ResetFiltersBtn;
