import React, { Fragment, useContext, useRef, useState } from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { motion } from "framer-motion";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import usePagination from "../../../../custom/useNumberOfPages";
import { useAppSelector } from "../../../../custom/reduxTypes";
import NoData from "../../../widgets/NoData";
import useIsMobile from "../../../../custom/useIsMobile";
import GridLoader from "../../../widgets/GridLoader";

const ProductList = ({ isDash }: { isDash?: boolean }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { showFilter, products, isPending } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [page, setPage] = useState(1);
  const { isMobile } = useIsMobile();
  const arr = isDash ? Allproducts || [] : products || [];
  const [dataShown, numberOfPages] = usePagination(8, page, arr);
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <NoData
      length={dataShown.length >= 1}
      message="no products matched"
      cls="h-80 center"
    >
      <motion.div
        ref={ref}
        className={`product-list-par ${!gridView ? "list" : "grid"} `}
        animate={{
          width: showFilter && !isMobile ? " calc(100% - 200px - 20px)" : "90%",
        }}
      >
        {isPending ? (
          <GridLoader cls={`h-80 center`} />
        ) : (
          <>
            {dataShown?.map((product: any, index: number) => {
              return (
                <Fragment key={`${product._id}-list`}>
                  <ProductFliter {...product} index={index} isDash={isDash} />
                </Fragment>
              );
            })}
          </>
        )}
        <Pages
          key={"pages"}
          page={page}
          numOfPages={numberOfPages}
          setPage={setPage}
        />
      </motion.div>
    </NoData>
  );
};

export default ProductList;
