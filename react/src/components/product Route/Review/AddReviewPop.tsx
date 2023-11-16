import MainBtn from "@/components/widgets/buttons/MainBtn";
import Header from "@/components/widgets/shared/Header";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { addReview, update_Review } from "@/graphql/mutations/user";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import AddRate from "./AddRate";
import toast from "react-hot-toast";
import { Review } from "@/types/product";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

type Props = {
  hasReview: boolean;
  _id: string;
  userReview: string;
  userRate: number;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewData: React.Dispatch<React.SetStateAction<Review[]>>;
};

const AddReviewPop = ({
  setter,
  userReview,
  setReviewData,
  _id,
  hasReview,
  userRate = 1,
}: Props) => {
  const [rateIndex, setRateIndex] = useState(userRate);
  const [inpVal, setInpVal] = useState(userReview);
  const { name, image } = useAppSelector((st) => st.userData);
  const { userId } = useAppSelector((st) => st.isAuth);

  const ob = { userId, _id, rate: rateIndex, review: inpVal, user: name };
  const [addReviewFn, { loading }] = useMutation(addReview, {
    variables: {
      input: ob,
    },
  });

  const [updateReviewFn, { loading: updateLoading }] = useMutation(
    update_Review,
    {
      variables: {
        input: ob,
      },
    }
  );
  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };
  const closePopup = () => setter(false);

  const handleAddReview = async () => {
    const { data } = await addReviewFn();
    if (data?.addReview?.status === 200) {
      closePopup();
      toast.success(data?.addReview?.msg);
      setReviewData((cur) => [...cur, { ...ob, image }]);
    }
  };

  const updateReview = async () => {
    const { data } = await updateReviewFn();
    if (data?.updateReview?.msg) {
      closePopup();
      toast.success(data?.updateReview?.msg);
      setReviewData((cur) =>
        cur.map((ob) =>
          ob.userId === userId ? { ...ob, rate: rateIndex, review: inpVal } : ob
        )
      );
    }
  };

  return (
    <>
      <Header head={hasReview ? "update Rate" : "Add Rate"} />
      <AddRate setRateIndex={setRateIndex} rateIndex={rateIndex} />
      <Form className="w-80  center col between">
        <input
          placeholder="add review"
          style={{ paddingLeft: 8 }}
          type="text"
          className="inp w-100 "
          onChange={handleCHange}
          defaultValue={userReview}
        />
        <div className="btns center">
          <MainBtn
            btn={hasReview ? "update" : "add"}
            type="submit"
            disabled={loading || updateLoading}
            onClick={hasReview ? updateReview : handleAddReview}
            pos="right"
            className="main btn gap"
            Icon={BsArrowRight}
          />
          <MainBtn
            btn="cancel"
            type="button"
            className="btn cancel-outline"
            onClick={closePopup}
          />
        </div>
      </Form>
    </>
  );
};

export default AddReviewPop;
