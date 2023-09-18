import React, { RefAttributes } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";

import { imgArr } from "@/assets/arries/arries";
import FadeWithY from "@/components/widgets/animation/FadeWithY";
const MainProductAnimation = () => {
  const options: RefAttributes<SwiperRef> & SwiperProps = {
    spaceBetween: 5,
    slidesPerView: "auto",
    direction: "horizontal",
  };
  return (
    <div className="products-animation-par">
      <FadeWithY>
        <Swiper
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
              <SwiperSlide className="products-animate-slide" key={i}>
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
      </FadeWithY>
    </div>
  );
};

export default MainProductAnimation;
