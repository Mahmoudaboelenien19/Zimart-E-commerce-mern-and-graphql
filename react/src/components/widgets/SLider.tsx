import { useEffect, useRef, useState } from "react";
import ProductFliter from "../Product/Products/AllProducts/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/custom/reduxTypes";
import { ProductInterface } from "@/interfaces/product";
import { Get_All_Products } from "@/graphql/general";
import { addToProductRedux } from "@/redux/productSlice";
import { useLazyQuery } from "@apollo/client";
import useParams from "@/custom/useParams";

const SLiderComponent = () => {
  const { setParam } = useParams();
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [showSlider, setShowSlider] = useState(false);
  const [getProducts] = useLazyQuery(Get_All_Products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setParam("view", "grid");
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const initialRef = useRef(true);
  useEffect(() => {
    if (!Allproducts.length && initialRef.current) {
      initialRef.current = false;
      getProducts({
        variables: {
          skip: 0,
          limit: 12,
        },
      }).then(
        ({
          data,
        }: {
          data: { products: { products: ProductInterface[] } };
        }) => {
          const ar = data?.products?.products;
          dispatch(addToProductRedux(ar));
        }
      );
    }
  }, []);
  return (
    <>
      {showSlider && (
        <div className="product-slider" id="my-swiper">
          <h2
            className=" header  "
            style={{ margin: "50px 30px", marginBottom: 15 }}
          >
            you may like
          </h2>

          <Swiper
            className=" product-list-par grid"
            loop
            spaceBetween={5}
            direction="horizontal"
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              1: {
                slidesPerView: 1,
              },

              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
          >
            {Allproducts.slice(0, 8).map(
              (product: ProductInterface, index: number) => {
                return (
                  <SwiperSlide key={index} className="product-slide">
                    <ProductFliter index={index} {...product} isSLide />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default SLiderComponent;
