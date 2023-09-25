import MainBtn from "@/components/widgets/buttons/MainBtn";
import useParams from "@/custom/useParams";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

const ResetFiltersBtn = () => {
  const { deleteParam, getParam } = useParams();

  const isFilterApplied = getParam("isFilterApplied") || "";

  const handleResetFiltering = () => {
    if (isFilterApplied) {
      deleteParam("page");
    }
    deleteParam("price");
    deleteParam("rate");
    deleteParam("category");
    deleteParam("isFilterApplied");
    deleteParam("catFilter");

    deleteParam("featured products");
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
