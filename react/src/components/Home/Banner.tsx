import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import BannerText from "./BannerText";
import useBuildBannerArr from "@/custom/useBuildBannerArr";
import useModifyUrl from "@/custom/useModifyUrl";
import clsx from "clsx";
import { arrClrs } from "@/assets/arries/arries";
import { useAppDispatch } from "@/custom/reduxTypes";
import { changeBannerClr } from "@/redux/bannerClr";
import "swiper/css/autoplay";
import CustomArrows from "./CustomArrows";
import { bannerOptions } from "@/lib/swiper/options";
import Container from "../widgets/shared/Container";
const Banner = () => {
  const [ind, setInd] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeBannerClr(arrClrs[ind]));
  }, [ind]);
  console.log(ind);
  const bannerArr = useBuildBannerArr();
  const { getlink } = useModifyUrl();
  const swiperRef = useRef<SwiperRef | null>(null);
  return (
    <Container>
      <Swiper
        ref={swiperRef}
        onSlideChange={(e: any) => setInd(e.realIndex)}
        className={clsx("banner-par ")}
        id="my-swiper"
        {...bannerOptions}
      >
        {bannerArr.map((ob, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="banner">
                {index === ind && (
                  <>
                    <BannerText clr={arrClrs[index]} {...ob} />
                    <LazyLoadImage
                      src={getlink(ob.image, undefined, 800)}
                      alt={`banner proile`}
                      wrapperClassName="banner-image"
                      effect="blur"
                    />
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
