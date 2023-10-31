import { RefAttributes } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperProps, SwiperRef } from "swiper/react";

export const bannerOptions: RefAttributes<SwiperRef> & SwiperProps = {
  loop: true,
  navigation: {
    nextEl: ".next-slide",
    prevEl: ".prev-slide",
    enabled: true,
  },
  autoplay: {
    delay: 350000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    waitForTransition: true,
  },
  pagination: {
    dynamicBullets: true,
    clickable: true,
  },
  lazyPreloadPrevNext: 1,
  spaceBetween: 5,
  slidesPerView: 1,
  modules: [Pagination, Navigation, Autoplay],
};
