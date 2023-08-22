import React, { RefAttributes } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { imgArr } from "../../../assets/arries/arries";
import "swiper/css/effect-coverflow";
const MainProductAnimation = () => {
  const options: RefAttributes<SwiperRef> & SwiperProps = {
    spaceBetween: 5,
    slidesPerView: "auto",
    direction: "horizontal",
  };
  return (
    <motion.div
      className="products-animation-par"
      style={{ opacity: 0 }}
      transition={{ delay: 0.05 }}
      whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
    >
      <Swiper
        style={{ width: "100%" }}
        modules={[EffectCoverflow]}
        {...options}
        effect="coverflow"
        grabCursor
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 7.5,
        }}
        initialSlide={2}
        onInit={(swiper) => {
          swiper.slideTo(3, 0);
        }}
      >
        {[...Array(7)].map((_, i) => {
          return (
            <SwiperSlide key={i} className="products-animate-slide">
              <LazyLoadImage
                src={imgArr[i]}
                effect="blur"
                className="products-animate-img "
                wrapperClassName="products-animate"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
};

export default MainProductAnimation;
