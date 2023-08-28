import React, { useEffect, useContext, useState } from "react";

import ProductFliter from "../Product/Products/AllProducts/ProductFliter";
import { viewContext } from "../../context/gridView";
import { useAppSelector } from "../../custom/reduxTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { ProductInterface } from "../../interfaces/product";
const SLiderComponent = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const { setGridView } = useContext(viewContext);
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setGridView(true);
    setTimeout(() => {
      setShowSlider(true);
    }, 3000);
  }, []);
  return (
    <>
      {showSlider && (
        <>
          <h2
            className="underline header  heading-slider"
            style={{ margin: "12px  " }}
          >
            you may like
          </h2>

          <Swiper
            loop
            spaceBetween={5}
            direction="horizontal"
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {" "}
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
        </>
      )}
    </>
  );
};

export default SLiderComponent;
