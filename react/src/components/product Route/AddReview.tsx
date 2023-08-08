import React, { useState, useContext, useEffect } from "react";
import SlideButton from "../widgets/SlideButton";
import AddRate from "./AddRate";
import useAddReview from "../../custom/useAddReview";
import { isAuthContext } from "../../context/isAuth";
import { useAppDispatch } from "../../custom/reduxTypes";
import { addReviewRedux, updateReviewRedux } from "../../redux/productSlice";
import { useMutation } from "@apollo/client";
import { update_Review } from "../../graphql/mutations/user";

interface Props {
  setShowAddRate: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  rateIndex: number;
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultVal: string;
  hasReview: boolean;
}

const AddReview = ({
  setShowAddRate,
  _id,
  rateIndex,
  setRateIndex,
  hasReview,
  defaultVal,
}: Props) => {
  const dispatch = useAppDispatch();
  const {
    userId,
    name,
    userData: { image },
  } = useContext(isAuthContext);
  const [inpVal, setInpVal] = useState("");
  const obj = {
    userId,
    image: image,
    _id,
    rate: rateIndex + 1,
    review: inpVal,
    user: name,
  };

  const [addReviewFn] = useAddReview(obj);
  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };

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

  const handleAddReview = async () => {
    const { data } = await addReviewFn();
    if (data?.addReview?._id) {
      setStatus(200);
      dispatch(
        addReviewRedux({
          reviewObj: { ...obj, _id: data?.addReview?._id },
          _id,
        })
      );
    }
  };

  const updateReview = async () => {
    await updateReviewFn();
    setStatus(200);
    dispatch(updateReviewRedux(updateReviewObj));
  };
  useEffect(() => {
    setStatus(0);
  }, []);
  return (
    <SlideButton
      doneMsg={hasReview ? "rate updated" : "rate added"}
      head="add rate"
      sethide={setShowAddRate}
      cls="add-rate-pop"
      height={200}
      Status={Status}
      isVaild
      fn={hasReview ? updateReview : handleAddReview}
    >
      <AddRate setRateIndex={setRateIndex} rateIndex={rateIndex} />
      <form className="rate-form">
        <input
          placeholder="add review"
          style={{ paddingLeft: 8 }}
          type="text"
          className="inp rate-inp"
          onChange={handleCHange}
          defaultValue={defaultVal}
        />
      </form>
    </SlideButton>
  );
};

export default AddReview;
