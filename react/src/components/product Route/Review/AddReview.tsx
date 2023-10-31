import { useState, useContext, useEffect } from "react";

import AddRate from "./AddRate";
import { useMutation } from "@apollo/client";
import SlideButton from "@/components/widgets/buttons/SlideButton";
import { isAuthContext } from "@/context/isAuth";
import useAddReview from "@/custom/useAddReview";
import { update_Review } from "@/graphql/mutations/user";

interface Props {
  setShowAddRate: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  rateIndex: number;
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultVal: string;
  hasReview: boolean;
  bool: boolean;
}

const AddReview = ({
  setShowAddRate,
  _id,
  rateIndex,
  setRateIndex,
  hasReview,
  defaultVal,
  bool,
}: Props) => {
  const { userId, name, profile } = useContext(isAuthContext);
  const [inpVal, setInpVal] = useState("");
  const obj = {
    userId,
    image: profile,
    _id,
    rate: rateIndex + 1,
    review: inpVal,
    user: name,
  };

  const [addReviewFn] = useAddReview(obj);

  const updateReviewObj = {
    userId,
    productId: _id,
    review: inpVal || defaultVal,
    rate: rateIndex + 1,
  };

  const [updateReviewFn] = useMutation(update_Review, {
    variables: {
      input: updateReviewObj,
    },
  });
  const [Status, setStatus] = useState<number>(0);
  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };

  const handleAddReview = async () => {
    const { data } = await addReviewFn();
    if (data?.addReview?.status === 200) {
      setStatus(200);
    }
  };

  const updateReview = async () => {
    const { data } = await updateReviewFn();
    if (data?.updateReview?.msg) {
      setStatus(200);
    }
  };
  useEffect(() => {
    if (bool) {
      setStatus(0);
    }
  }, [bool]);
  return (
    // <SlideButton
    //   doneMsg={hasReview ? "rate updated" : "rate added"}
    //   head="add rate"
    //   sethide={setShowAddRate}
    //   Status={Status}
    //   isVaild
    //   bool={bool}
    //   fn={hasReview ? updateReview : handleAddReview}
    // >
    //   <AddRate setRateIndex={setRateIndex} rateIndex={rateIndex} />
    //   <form className="rate-form ">
    //     <input
    //       placeholder="add review"
    //       style={{ paddingLeft: 8 }}
    //       type="text"
    //       className="inp rate-inp"
    //       onChange={handleCHange}
    //       defaultValue={defaultVal}
    //     />
    //   </form>
    // </SlideButton>
    <></>
  );
};

export default AddReview;
