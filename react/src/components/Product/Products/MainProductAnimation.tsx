import { RefAttributes } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { imgArr } from "@/assets/arries/arries";

import InViewAnimation from "@/components/widgets/animation/InViewAnimation";
import useModifyUrl from "@/custom/helpers/useModifyUrl";

const MainProductAnimation = () => {
  const options: RefAttributes<SwiperRef> & SwiperProps = {
    spaceBetween: 5,
    slidesPerView: "auto",
    direction: "horizontal",
  };
  const { getlink } = useModifyUrl();

  return (
    <InViewAnimation className={" center"}>
      <div className="products-animation-par center">
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
              <SwiperSlide className={"products-animate-slide"} key={i}>
                <LazyLoadImage
                  src={getlink(imgArr[i], 400)}
                  effect="blur"
                  wrapperClassName="img-par"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </InViewAnimation>
  );
};

export default MainProductAnimation;
