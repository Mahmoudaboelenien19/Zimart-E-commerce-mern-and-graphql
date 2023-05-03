import React, { useContext } from "react";
import { imagesInterface } from "../../interfaces/user";
import { reviewInterface } from "../../interfaces/product";
import ProductRate from "../product Route/ProductRate";
import useAvg from "../../custom/useAvg";
import StyledPrice from "../widgets/StyledPrice";
import OpacityBtn from "../widgets/OpacityBtn";
import useRemoveFromCompareList from "../../custom/useRemoveFromCompareList";
import { isAuthContext } from "../../context/isAuth";
import { FiMinusSquare } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../widgets/Title";

interface Props {
  setProduct: React.Dispatch<React.SetStateAction<string>>;

  images: imagesInterface[];
  reviews: reviewInterface[];
  rating: number[];
  title: string;
  price: number;
  description: string;
  _id: string;
}

const SelectedProductData = ({
  images,
  rating,
  reviews,
  title,
  description,
  setProduct,
  price,
  _id,
}: Props) => {
  const { userId } = useContext(isAuthContext);
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const { handleRemoveFromCompare } = useRemoveFromCompareList({
    userId,
    productId: _id,
  });
  return (
    <>
      <img src={images[0]?.productPath} alt={title} />
      <span
        className=" select-text"
        style={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}
      >
        {title}
      </span>
      <span onClick={() => setProduct("")} className="unselect-par">
        <Title title="unselect this product">
          <AiFillCloseCircle className="icon unselect-icon" />
        </Title>
      </span>
      <StyledPrice price={price} />
      <ProductRate
        key={`${title}-rate`}
        avgRate={avgRate}
        ratingLen={reviewLength}
      />
      <p>{description}</p>
      <OpacityBtn
        fn={() => {
          handleRemoveFromCompare();
          setProduct("");
        }}
        btn="remove from select list"
        Icon={FiMinusSquare}
        cls="remove-compare btn gap center"
      />
    </>
  );
};

export default SelectedProductData;
