import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import { Product } from "@/types/product";
import { Get_All_Products } from "@/graphql/general";
import { addToProductRedux } from "@/redux/productSlice";
import { useLazyQuery } from "@apollo/client";
import ProductCard from "../Product/Products/ProductList/ProductCard/ProductCard";
import Header from "./shared/Header";
import useInnitialRender from "@/custom/helpers/useInnitialRender";

const SLiderComponent = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [getProducts] = useLazyQuery(Get_All_Products);

  const dispatch = useAppDispatch();
  const { isInitialRender } = useInnitialRender(5000, false);

  const initialRef = useRef(true);
  useEffect(() => {
    if (!Allproducts.length && initialRef.current) {
      initialRef.current = false;
      getProducts({
        variables: {
          skip: 0,
          limit: 12,
        },
      }).then(({ data }: { data: { products: { products: Product[] } } }) => {
        const ar = data?.products?.products;
        dispatch(addToProductRedux(ar));
      });
    }
  }, []);

  return (
    <>
      {isInitialRender && (
        <div className="product-slider" id="my-swiper">
          <Header head="you may like. !" />
          <Swiper
            className=" product-list-par grid"
            loop
            spaceBetween={5}
            direction="horizontal"
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              400: {
                slidesPerView: 1,
              },
              700: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1500: {
                slidesPerView: 4,
              },
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
          >
            {Allproducts.slice(0, 8).map((product: Product, index: number) => {
              return (
                <SwiperSlide key={index} className="product-slide">
                  <ProductCard {...product} isSLide />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default SLiderComponent;
