import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { BiCommentEdit } from "react-icons/bi";
import { AiFillPlusSquare } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { Review } from "@/types/product";
import Title from "@/components/widgets/Title";
import MainPop from "@/components/widgets/shared/popup/MainPop";
import AddReviewPop from "./AddReviewPop";
interface Props {
  _id: string;
  setReviewData: React.Dispatch<React.SetStateAction<Review[]>>;
  reviews: Review[];
}

const AddReview = ({ setReviewData, _id, reviews = [] }: Props) => {
  const { isAuth, userId } = useAppSelector((st) => st.isAuth);
  const currentUserReview = reviews?.find((e: Review) => e.userId === userId);
  const hasReview = currentUserReview ? true : false;
  const userReview = currentUserReview?.review || "";
  const userRate = currentUserReview?.rate || 1;
  const toggleSHowAddRate = () => setShowAddRate(!showAddRate);
  const [showAddRate, setShowAddRate] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasReview ? (
          <Title title="add review" key={"add-review"}>
            <AiFillPlusSquare
              color="var(--green)"
              fontSize={12}
              onClick={() => {
                isAuth
                  ? toggleSHowAddRate()
                  : toast.error("you must log in to add review");
              }}
            />
          </Title>
        ) : (
          <Title title="edit your review" key={"has-review"}>
            <BiCommentEdit
              fontSize={12}
              color="var(--green)"
              onClick={toggleSHowAddRate}
            />
          </Title>
        )}
      </AnimatePresence>
      <MainPop
        bool={showAddRate}
        setter={setShowAddRate}
        className="add-review-pop"
      >
        <AddReviewPop
          _id={_id}
          hasReview={hasReview}
          userRate={userRate}
          userReview={userReview}
          setter={setShowAddRate}
          setReviewData={setReviewData}
        />
      </MainPop>
    </>
  );
};

export default AddReview;
