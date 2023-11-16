import { RefAttributes, useState } from "react";
import Review from "./Review";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import MainPop from "../../widgets/shared/popup/MainPop";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { type Review as ReviewType } from "@/types/product";
import { BiShow } from "react-icons/bi";
import Header from "@/components/widgets/shared/Header";
import Title from "@/components/widgets/Title";
type Props = {
  reviews: ReviewType[];
};
const options: RefAttributes<SwiperRef> & SwiperProps = {
  loop: true,
  spaceBetween: 5,
  slidesPerView: 1,
  direction: "horizontal",
  modules: [Navigation],
};
const Reviews = ({ reviews }: Props) => {
  const [showPop, setShowPop] = useState(false);
  const handleshowPop = () => setShowPop(true);

  return (
    <>
      {reviews?.length >= 1 && (
        <Title title="show all reviews">
          <BiShow fontSize={12} color="var(--third)" onClick={handleshowPop} />
        </Title>
      )}
      <MainPop bool={showPop} setter={setShowPop} className="reviews-pop">
        <Header head="reviews" />
        <Swiper
          className="pop-up-reviews center"
          {...options}
          navigation={{
            nextEl: ".btn-review  .next-swiper",
            prevEl: " .btn-review  .prev-swiper",
          }}
        >
          {reviews?.map((review: ReviewType, i) => {
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
          <button className="center prev-swiper">
            <FaLessThan />
          </button>
          <button className="center next-swiper">
            <FaGreaterThan />
          </button>
        </div>
      </MainPop>
    </>
  );
};

export default Reviews;
