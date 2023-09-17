import React, { RefAttributes, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import BannerText from "./BannerText";
import useIsMobile from "@/custom/useIsMobile";
import FadeElement from "../widgets/animation/FadeElement";
import Shape from "./Shape";
import useBuildBannerArr from "@/custom/useBuildBannerArr";
const arrClrs = ["var(--green)", "var(--gmail)", "var(--delete)", "var(--fb)"];

const Banner = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [ind, setInd] = useState(0);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    setTimeout(() => {
      setShowArrow(true);
    }, 1500);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-btn", `${arrClrs[ind]}`);
    sessionStorage.setItem("banner-index", `${ind}`);
  }, [ind]);

  const options: RefAttributes<SwiperRef> & SwiperProps = {
    loop: true,
    spaceBetween: 5,
    slidesPerView: 1,
    direction: "horizontal",
    pagination: { clickable: true },
    modules: [Pagination, Navigation],
    navigation: showArrow && !isMobile ? true : false,
    onSlideChange: (e: any) => setInd(e.realIndex),
  };

  const bannerArr = useBuildBannerArr();
  return (
    <>
      <Swiper
        className="banner-par container "
        {...options}
        initialSlide={Number(sessionStorage.getItem("banner-index")) || 0}
        lazyPreloadPrevNext={1}
      >
        <FadeElement cls="" delay={0.6}>
          <Shape />
        </FadeElement>
        {bannerArr.map((ob, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="banner ">
                <BannerText
                  clr={arrClrs[index]}
                  {...ob}
                  key={ob.header}
                  isShown={index === ind && showArrow}
                />
                <LazyLoadImage
                  src={ob.image}
                  alt={`banner proile`}
                  wrapperClassName="banner-image"
                  effect="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
