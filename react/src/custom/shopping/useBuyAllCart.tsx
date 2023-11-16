import { useMemo } from "react";
import { useAppSelector } from "../helpers/reduxTypes";
const intialArr = [
  {
    productId: "",
    count: 0,
    price: 0,
    title: "",
    path: "",
  },
];
const useBuyAllCart = () => {
  const { cart } = useAppSelector((st) => st.cart);

  const ar = useMemo(() => {
    if (cart.length >= 1 && cart.every((ob) => ob?.product)) {
      return cart
        .filter((item) => item?.product?.stock !== 0)
        ?.map(({ id: productId, count, product }) => {
          if (product) {
            console.log("product memo");
            const { title = "", price = 0, images } = product;
            return {
              productId,
              count,
              price,
              title,
              path: images[0].productPath || "",
            };
          } else {
            return {
              productId,
              count,
              price: 0,
              title: "",
              path: "",
            };
          }
        });
    } else {
      return intialArr;
    }
  }, [cart]);

  return { ar, intialArr };
};

export default useBuyAllCart;
