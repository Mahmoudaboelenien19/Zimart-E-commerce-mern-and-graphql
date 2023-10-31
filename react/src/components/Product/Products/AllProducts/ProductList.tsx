import { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard";
import NoData from "@/components/widgets/NoData";
import { ProductInterface } from "@/interfaces/product";
import useParams from "@/custom/useParams";
import { Get_All_Products } from "@/graphql/general";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "@/custom/reduxTypes";
import {
  addToProductRedux,
  changeTotalProductsCount,
  skeltonProductSlice,
} from "@/redux/productSlice";
import useProductsSubscription from "@/custom/subscriptions/useProductsSubscription";
import Pages from "../Pages";
const ProductList = ({ isDash }: { isDash?: boolean }) => {
  const { Allproducts, totalProducts } = useAppSelector((st) => st.Allproducts);
  const { getParam } = useParams();
  const search = getParam("search");
  const sort = getParam("sort");
  const page = getParam("page") || 1;
  const catFilter = getParam("catFilter");
  const isFilterApplied = getParam("isFilterApplied") || "";
  const [getProducts] = useLazyQuery(Get_All_Products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFilterApplied && !search && !sort && !catFilter) {
      dispatch(skeltonProductSlice());
      getProducts({
        variables: {
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      }).then((res) => {
        const data = res?.data?.products;
        dispatch(addToProductRedux(data?.products));
        dispatch(changeTotalProductsCount(data?.totalProducts));
      });
    }
  }, [search, page, isFilterApplied, sort, catFilter]);
  useProductsSubscription();
  return (
    <div className={`product-list-par center gap `}>
      <Fragment>
        {Allproducts?.length !== 0 ? (
          <>
            {Allproducts?.map((product: ProductInterface, index: number) => (
              <ProductCard
                {...product}
                index={index}
                isDash={isDash}
                key={product?._id ? `${product?._id}-list` : index}
              />
            ))}
            <Pages
              to="products"
              key="pages"
              page={Number(page)}
              total={totalProducts}
            />
          </>
        ) : (
          <NoData message="No Products Found" className="nodata-products" />
        )}
      </Fragment>
    </div>
  );
};

export default ProductList;
