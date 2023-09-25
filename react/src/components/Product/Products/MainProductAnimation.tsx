import React, { RefAttributes, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";

import { imgArr } from "@/assets/arries/arries";
import FadeWithY from "@/components/widgets/animation/FadeWithY";
import useModifyUrl from "@/custom/useModifyUrl";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";
const MainProductAnimation = () => {
  const options: RefAttributes<SwiperRef> & SwiperProps = {
    spaceBetween: 5,
    slidesPerView: "auto",
    direction: "horizontal",
  };
  const { getlink } = useModifyUrl();
  const { theme } = useContext(themeContext);
  return (
    <div className={"products-animation-par"}>
      {/* <FadeWithY> */}
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
            <SwiperSlide
              className={clsx("products-animate-slide", theme)}
              key={i}
            >
              <LazyLoadImage
                src={getlink(imgArr[i], 400)}
                effect="blur"
                className="products-animate-img "
                wrapperClassName="products-animate"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* </FadeWithY> */}
    </div>
  );
};

export default MainProductAnimation;
