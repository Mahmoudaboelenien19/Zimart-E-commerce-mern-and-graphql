import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import StarIcon from "@/custom SVGs/StarIcon";
import Title from "@/components/widgets/Title";
import { Review as ReviewType } from "@/types/product";
import MainImage from "@/components/widgets/shared/Image";
import RateAnimation from "./RateAnimation";
const clrsArr = [
  "var(--green)",
  "var(--delete)",
  "var(--twitter)",
  "var(--secondary)",
  "var(--fb)",
  "var(--delete)",
  "var(--twitter)",
  "var(--secondary)",
  "var(--fb)",
];

interface Props extends ReviewType {
  i: number;
}

const Review = ({ image: img, user, rate, review, i, userData }: Props) => {
  /*  note differece between image and userData.image
  when  i created database i added fake reviews this is shown by user & image
  but userData:{image,user} these when new user add a review and i don't save their data
   directly to database to get up to date deta 
  
  */
  const url = userData?.image || img;
  return (
    <div>
      <Title title={userData?.name || user} className="img-review center">
        <div className="before" style={{ background: clrsArr[i] }} />
        <MainImage path={url} width={100} />
      </Title>

      <p className="review-user center">{userData?.name || user}</p>
      <div className="review-rate center">
        <StarIcon avgRate={4} id={1} />
        <span className="center" style={{ marginBottom: -4 }}>
          <RateAnimation rate={rate} />

          <span className="five center">
            <span>/</span>5
          </span>
        </span>
      </div>

      <div className="user-review center">
        <span>
          <FaQuoteLeft className="icon" fill={clrsArr[i]} />
        </span>
        <p>{review}</p>
        <span>
          <FaQuoteRight className="icon" color={clrsArr[i]} />
        </span>
      </div>
    </div>
  );
};

export default Review;
