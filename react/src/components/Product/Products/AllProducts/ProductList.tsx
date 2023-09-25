import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { AnimatePresence, motion } from "framer-motion";
import NoData from "@/components/widgets/NoData";
import { productListContext } from "@/context/ProductsContext";
import { viewContext } from "@/context/gridView";
import useIsMobile from "@/custom/useIsMobile";
import { ProductInterface } from "@/interfaces/product";
import useParams from "@/custom/useParams";
import { Get_All_Products } from "@/graphql/general";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "@/custom/reduxTypes";
import { addToProductRedux } from "@/redux/productSlice";
const ProductList = ({ isDash }: { isDash?: boolean }) => {
  // const ar = isDash ? Allproducts : products || [];
  const { products, setProducts, totalProductsNum, setTotalProductsNum } =
    useContext(productListContext);

  const { gridView } = useContext(viewContext);
  const { isMobile } = useIsMobile();
  const { getParam, showAsideFilter } = useParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const search = getParam("search");
  const sort = getParam("sort");
  const page = getParam("page") || 1;
  const catFilter = getParam("catFilter");
  const isFilterApplied = getParam("isFilterApplied") || "";
  const [getProducts, { refetch }] = useLazyQuery(Get_All_Products, {});
  const dispatch = useAppDispatch();

  const refetchFn = () =>
    refetch().then((res: any) => {
      console.log("data", res);
      const data = res.data;
      setProducts(data?.products?.products);
      setTotalProductsNum(data?.products?.totalProducts);
    });

  useEffect(() => {
    if (!isFilterApplied && !search && !sort && !catFilter) {
      setProducts(Array.from({ length: 12 }));
      getProducts({
        variables: {
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      }).then(({ data }: any) => {
        const ar = data?.products?.products;
        setProducts(ar);
        dispatch(addToProductRedux(ar));
        setTotalProductsNum(data?.products?.totalProducts);
      });
    }
  }, [search, page, isFilterApplied, sort, catFilter]);

  console.log({ products });
  return (
    <AnimatePresence initial={false}>
      <motion.div
        ref={ref}
        className={`product-list-par ${!gridView ? "list" : "grid"}`}
        animate={{
          width:
            showAsideFilter && !isMobile ? "calc(100% - 200px - 20px)" : "96%",
        }}
      >
        <>
          {products?.length !== 0 ? (
            <>
              {products?.map((product: ProductInterface, index: number) => (
                <ProductFliter
                  {...product}
                  index={index}
                  isDash={isDash}
                  key={product?._id ? `${product?._id}-list` : index}
                />
              ))}
            </>
          ) : (
            <NoData message="No Products Found" cls="nodata-products" />
          )}
        </>
        {products?.length !== 0 && (
          <Pages
            to="products"
            key="pages"
            page={Number(page)}
            total={totalProductsNum}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductList;
