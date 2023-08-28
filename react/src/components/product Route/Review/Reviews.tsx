import React, { RefAttributes, useContext } from "react";

import Review from "./Review";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { motion } from "framer-motion";

import { productContext } from "../Product";

import MainPop from "../../widgets/MainPop";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import "swiper/css/navigation";
interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
}

const Reviews = ({ setShowPop, bool }: Props) => {
  const { reviews } = useContext(productContext);

  const options: RefAttributes<SwiperRef> & SwiperProps = {
    loop: true,
    spaceBetween: 5,
    slidesPerView: 1,
    direction: "horizontal",
    modules: [Navigation],
  };
  return (
    <MainPop bool={bool} setter={setShowPop}>
      <h2 className="underline header" style={{ marginBottom: 20 }}>
        reviews
      </h2>
      <Swiper
        className="pop-up-reviews center"
        {...options}
        navigation={{
          nextEl: ".btn-review  .next-swiper",
          prevEl: " .btn-review  .prev-swiper",
        }}
      >
        {reviews?.map((review: any, i) => {
          {
            return (
              <SwiperSlide key={i} className="review">
                <Review {...review} i={i} />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
      <div className="btn-review center">
        <motion.button
          className="center prev-swiper"
          style={{ background: "var(--delete)", color: "var(--white)" }}
        >
          <FaLessThan />
        </motion.button>
        <motion.button
          className="center next-swiper"
          style={{ background: "var(--green)", color: "var(--white)" }}
        >
          <FaGreaterThan />
        </motion.button>
      </div>
    </MainPop>
  );
};

export default Reviews;
