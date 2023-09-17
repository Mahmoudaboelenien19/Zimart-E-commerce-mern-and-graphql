import React, { Fragment, useContext, useEffect, useRef } from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { motion } from "framer-motion";
import NoData from "@/components/widgets/NoData";
import GridLoader from "@/components/widgets/loaders/GridLoader";
import { productListContext } from "@/context/FilterData";
import { viewContext } from "@/context/gridView";
import { useAppSelector } from "@/custom/reduxTypes";
import useIsMobile from "@/custom/useIsMobile";
import usePagination from "@/custom/useNumberOfPages";
import { ProductInterface } from "@/interfaces/product";
import useParams from "@/custom/useParams";

const ProductList = ({ isDash }: { isDash?: boolean }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { isPending, products, setProducts } = useContext(productListContext);
  const ar = isDash ? Allproducts : products || [];
  const { gridView } = useContext(viewContext);

  const { page, showAsideFilter } = useParams();
  const { isMobile } = useIsMobile();
  const [dataShown, numberOfPages] = usePagination(12, Number(page), ar);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setProducts(Allproducts);
  }, [Allproducts]);

  return (
    <NoData
      length={dataShown.length >= 1}
      message="no products matched"
      cls="loading-recap w-100"
    >
      <motion.div
        ref={ref}
        className={`product-list-par  ${!gridView ? "list" : "grid"} `}
        animate={{
          width:
            showAsideFilter && !isMobile ? " calc(100% - 200px - 20px)" : "96%",
        }}
      >
        {isPending ? (
          <GridLoader cls={`product-loader  center w-100`} />
        ) : (
          <>
            {dataShown?.map((product: ProductInterface, index: number) => {
              return (
                <Fragment key={`${product._id}-list`}>
                  <ProductFliter {...product} index={index} isDash={isDash} />
                </Fragment>
              );
            })}
          </>
        )}
        <Pages
          to="products"
          key={"pages"}
          page={Number(page)}
          numOfPages={numberOfPages}
        />
      </motion.div>
    </NoData>
  );
};

export default ProductList;
