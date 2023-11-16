import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import BannerText from "./BannerText";
import useBuildBannerArr from "@/custom/helpers/useBuildBannerArr";
import clsx from "clsx";
import { arrClrs } from "@/assets/arries/arries";
import { useAppDispatch } from "@/custom/helpers/reduxTypes";
import { changeBannerClr } from "@/redux/bannerClr";
import "swiper/css/autoplay";
import CustomArrows from "./CustomArrows";
import { bannerOptions } from "@/lib/swiper/options";
import Container from "../widgets/shared/Container";
import FadeElement from "../widgets/animation/FadeElement";
import useModifyUrl from "@/custom/helpers/useModifyUrl";
const Banner = () => {
  const [ind, setInd] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeBannerClr(arrClrs[ind]));
  }, [ind]);
  const bannerArr = useBuildBannerArr();
  const { getlink } = useModifyUrl();
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <Container id="banner-container">
      <Swiper
        ref={swiperRef}
        onSlideChange={(e) => setInd(e.realIndex)}
        className={clsx("banner-par ")}
        id="my-swiper"
        {...bannerOptions}
      >
        {bannerArr.map((ob, index) => {
          const clr = arrClrs[index];
          return (
            <SwiperSlide key={index}>
              <div className="banner">
                {index === ind && (
                  <>
                    <BannerText clr={clr} {...ob} />
                    {/* <div className="banner-image center"> */}
                    <LazyLoadImage
                      src={getlink(ob.image, undefined, 800)}
                      alt={`banner proile`}
                      wrapperClassName=" banner-image"
                      effect="blur"
                    />
                    {/* <FadeElement
                        delay={1.8}
                        endOpacity={0.5}
                        duration={0.6}
                        className="banner-bg"
                        style={{
                          background: clr,
                        }}
                      >
                        <></>
                      </FadeElement> */}
                    {/* </div> */}
                  </>
                )}
              </div>
            </SwiperSlide>
          );
        })}
        <CustomArrows />
      </Swiper>
    </Container>
  );
};

export default Banner;
