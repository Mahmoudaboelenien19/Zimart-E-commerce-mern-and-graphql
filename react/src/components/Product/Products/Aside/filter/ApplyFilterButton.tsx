import { categoriesArr, FeaturedProductsArr } from "@/assets/arries/arries";
import MainBtn from "@/components/widgets/buttons/MainBtn";
import { productListContext } from "@/context/FilterData";
import useParams from "@/custom/useParams";
import { FILTER_All } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { MdFilterListAlt } from "react-icons/md";

const ApplyFilterButton = () => {
  const { setProducts, startTransition } = useContext(productListContext);

  const [isPending, setIsPending] = useState(false);
  const { priceFilter, rateFilter, categoryFilter, featuredProductsFilter } =
    useParams();
  const [filterAllFn] = useMutation(FILTER_All);
  const handleFiltering = async () => {
    setIsPending(true);
    const res = await filterAllFn({
      variables: {
        input: {
          price: Number(priceFilter) === 0 ? 10000 : Number(priceFilter),
          category: categoryFilter === "" ? categoriesArr : [categoryFilter],
          state:
            featuredProductsFilter === ""
              ? FeaturedProductsArr
              : [featuredProductsFilter],
          rate: rateFilter === "" ? 5 : Number(rateFilter),
        },
      },
    });
    startTransition(() => {
      setProducts(res?.data.filterAllTypes);
      setIsPending(false);
    });
  };

  return (
    <MainBtn
      key={"apply-btn"}
      cls={"btn shadow main center  gap"}
      btn={"apply"}
      fn={handleFiltering}
      Icon={MdFilterListAlt}
      isPending={isPending}
    />
  );
};

export default ApplyFilterButton;
