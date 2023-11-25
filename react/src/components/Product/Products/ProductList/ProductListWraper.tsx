import { ReactNode, useEffect, useRef } from "react";
import useParams from "@/custom/helpers/useParams";
import { Get_All_Products } from "@/graphql/general";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import {
  addToProductRedux,
  changeTotalProductsCount,
  skeltonProductSlice,
} from "@/redux/productSlice";
import useProductsSubscription from "@/custom/subscriptions/useProductsSubscription";
import { useInView } from "framer-motion";
type Props = {
  children: ReactNode;
};
const ProductListWrapper = ({ children }: Props) => {
  const { getParam } = useParams();
  const search = getParam("search");
  const sort = getParam("sort");
  const page = getParam("page") || 1;
  const catFilter = getParam("catFilter");
  const isFilterApplied = getParam("isFilterApplied") || "";
  const [getProducts] = useLazyQuery(Get_All_Products);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const check = inView && !isFilterApplied && !search && !sort && !catFilter;
  const initialRender = useRef(Boolean(Allproducts.length));
  const initialPage = useRef(page);

  useEffect(() => {
    if (page !== initialPage.current) {
      initialRender.current = false;
    }
    if (check && !initialRender.current) {
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
  }, [check, page]);

  useProductsSubscription();

  return (
    <div className={`product-list-par center gap `} ref={ref}>
      {children}
    </div>
  );
};

export default ProductListWrapper;
