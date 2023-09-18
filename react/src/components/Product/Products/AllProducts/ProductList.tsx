import React, { useContext, useEffect, useRef } from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { motion } from "framer-motion";
import NoData from "@/components/widgets/NoData";
import GridLoader from "@/components/widgets/loaders/GridLoader";
import { productListContext } from "@/context/FilterData";
import { viewContext } from "@/context/gridView";
import useIsMobile from "@/custom/useIsMobile";
import usePagination from "@/custom/useNumberOfPages";
import { ProductInterface } from "@/interfaces/product";
import useParams from "@/custom/useParams";
import { Get_All_Products } from "@/graphql/general";
import { useLazyQuery } from "@apollo/client";
import SkeltonProducts from "./SkeltonProducts";

const ProductList = ({ isDash }: { isDash?: boolean }) => {
  // const ar = isDash ? Allproducts : products || [];
  const { products, setProducts, totalProductsNum, setTotalProductsNum } =
    useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const { isMobile } = useIsMobile();

  const { getParam, showAsideFilter } = useParams();
  // const [dataShown, numberOfPages] = usePagination(12, Number(page), ar);
  const ref = useRef<HTMLDivElement | null>(null);

  const page = getParam("page") || 1;
  const [getProducts, { loading }] = useLazyQuery(Get_All_Products, {
    variables: {
      skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
      limit: 12,
    },
  });

  useEffect(() => {
    setProducts([]);

    getProducts().then(({ data }: any) => {
      setProducts(data?.products?.products);
      setTotalProductsNum(data?.products?.totalProducts);
    });
  }, [page]);

  console.log({ products });

  return (
    <motion.div
      ref={ref}
      className={`product-list-par  ${!gridView ? "list" : "grid"} `}
      style={{
        width:
          showAsideFilter && !isMobile ? " calc(100% - 200px - 20px)" : "96%",
      }}
    >
      <>
        {" "}
        {products.length === 0 ? (
          <SkeltonProducts />
        ) : (
          <>
            {products?.map((product: ProductInterface, index: number) => {
              return (
                <ProductFliter
                  {...product}
                  index={index}
                  isDash={isDash}
                  key={`${product._id}-list`}
                />
              );
            })}
          </>
        )}
      </>
      <Pages
        to="products"
        key={"pages"}
        page={Number(page)}
        total={totalProductsNum}
      />
    </motion.div>
  );
};

export default ProductList;
