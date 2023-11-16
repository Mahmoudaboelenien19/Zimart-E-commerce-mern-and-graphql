import CompareIcons from "@/components/svgs/CompareIcons";
import ProductListHeart from "@/components/svgs/ProductListHeart";
import Title from "@/components/widgets/Title";
import clsx from "clsx";
import { Fragment } from "react";
import { BsFillCartXFill, BsFillCartPlusFill } from "react-icons/bs";
import { RiEditLine } from "react-icons/ri";
import CartBtns from "./CartBtns";
import useParams from "@/custom/helpers/useParams";
import { useNavigate } from "react-router-dom";

type Props = {
  isDash: boolean;
  _id: string;
};

const ProductCardButtons = ({ isDash, _id }: Props) => {
  const navigat = useNavigate();
  const { showDashBoaedAside } = useParams();

  return (
    <div className={clsx("card-actions   center gap ")}>
      {!isDash ? (
        <Fragment>
          <CartBtns
            offCollection={
              <BsFillCartXFill
                size={14}
                color="var(--delete)"
                className="cart-remove"
              />
            }
            onCollection={
              <BsFillCartPlusFill
                size={14}
                className={"cart-icon"}
                color="var(--green)"
              />
            }
            _id={_id}
          />
          <CompareIcons id={_id} />
          <ProductListHeart id={_id} />
        </Fragment>
      ) : (
        <span
          onClick={() =>
            navigat(
              `/dashboard/products/${_id}` +
                `${showDashBoaedAside ? "?showDashBoaedAside=true" : ""}`
            )
          }
        >
          <Title title="edit product">
            <RiEditLine color="var(--third)" />
          </Title>
        </span>
      )}
    </div>
  );
};

export default ProductCardButtons;
