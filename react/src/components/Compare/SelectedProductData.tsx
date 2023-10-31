import { useContext } from "react";
import ProductRate from "../product Route/ProductRate";
import StyledPrice from "../widgets/StyledPrice";
import MainBtn from "../widgets/buttons/MainBtn";
import { FiMinusSquare } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../widgets/Title";
import { isAuthContext } from "@/context/isAuth";
import useAvg from "@/custom/useAvg";
import useRemoveFromCompareList from "@/custom/useRemoveFromCompareList";
import { GET_Product_By_Id } from "@/graphql/general";
import { useQuery } from "@apollo/client";
import FadeElement from "../widgets/animation/FadeElement";
import { AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useModifyUrl from "@/custom/useModifyUrl";
import FetchLoading from "../widgets/loaders/FetchLoading";
import { Link } from "react-router-dom";

interface Props {
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

const SelectedProductData = ({ id, setProduct }: Props) => {
  const { data } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });

  const { userId } = useContext(isAuthContext);
  const { avgRate, reviewLength } = useAvg(
    data?.product?.rating,
    data?.product?.reviews
  );
  const { handleRemoveFromCompare } = useRemoveFromCompareList({
    userId,
    productId: data?._id,
  });

  if (data?.product?.title) {
    const { images, rating, reviews, title, description, price, _id } =
      data.product;
    const { getlink } = useModifyUrl();
    return (
      <FadeElement key={id} className="w-100 center col  selected-pro-data">
        {images[0]?.productPath && (
          <LazyLoadImage
            src={getlink(images[0].productPath, 300)}
            alt={title}
          />
        )}
        <Link className=" title-product" to={`/product/${_id}`}>
          {title}
        </Link>
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
          rating={rating}
          reviews={reviews}
        />
        <p style={{ color: "var(--third)" }}> {description}</p>
        <MainBtn
          onClick={() => {
            handleRemoveFromCompare();
            setProduct("");
          }}
          btn="remove from select list"
          Icon={FiMinusSquare}
          className="remove-compare btn gap center"
        />
      </FadeElement>
    );
  } else {
    return (
      <AnimatePresence mode="wait">
        {id ? (
          <div key="loading -compare" className="nodata-compare center">
            <FetchLoading clr="yellow" />
          </div>
        ) : (
          <FadeElement
            className="nodata-compare center"
            key={"no data compare"}
          >
            <p>Select a product to compare</p>
          </FadeElement>
        )}
      </AnimatePresence>
    );
  }
};
export default SelectedProductData;
