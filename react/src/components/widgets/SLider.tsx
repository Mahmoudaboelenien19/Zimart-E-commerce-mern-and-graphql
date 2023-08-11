import React, { useEffect, useContext } from "react";

import ProductFliter from "../Product/Products/AllProducts/ProductFliter";
import { viewContext } from "../../context/gridView";
import { useAppSelector } from "../../custom/reduxTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const SLiderComponent = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const { setGridView } = useContext(viewContext);

  useEffect(() => {
    setGridView(true);
  }, []);
  return (
    <>
      <h2
        className="underline header  heading-slider"
        style={{ margin: "12px  " }}
      >
        you may like{" "}
      </h2>

      <Swiper
        className="banner-par "
        loop
        spaceBetween={5}
        slidesPerView={1}
        direction="horizontal"
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
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
        {Allproducts.map((product: any, index: number) => {
          return (
            <SwiperSlide key={`${product._id}-list`}>
              <ProductFliter index={index} {...product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SLiderComponent;
