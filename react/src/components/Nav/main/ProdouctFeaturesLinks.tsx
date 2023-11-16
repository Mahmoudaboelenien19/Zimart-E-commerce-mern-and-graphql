import { motion } from "framer-motion";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoGitCompareSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ShowCount from "./showCounter";
import WishList from "../wishlist/WishList";
import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import useHideScroll from "@/custom/helpers/useHideScroll";
import useIsMobile from "@/custom/helpers/useIsMobile";

const ProdouctFeaturesLinks = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { compare } = useAppSelector((state) => state.compare);
  const { fav } = useAppSelector((state) => state.fav);
  const [showFav, setShowFav] = useState(false);
  const { isMobile } = useIsMobile();
  useHideScroll(showFav, isMobile);

  return (
    <ul>
      <NavLink to="/cart" className="cart-active-link ">
        <motion.li id="cart-link-par">
          <Title title="go to your cart">
            <ShowCount
              length={
                Number(sessionStorage.getItem("cart-length")) || cart.length
              }
            />
            <BsFillCartPlusFill fontSize={"1.2rem"} />
          </Title>
        </motion.li>
      </NavLink>
      <NavLink to="/compare" className="cart-active-link ">
        <motion.li id="cart-link-par">
          <Title title="compare products list">
            <ShowCount length={compare.length} />
            <IoGitCompareSharp fontSize={"1.2rem"} />
          </Title>
        </motion.li>
      </NavLink>
      <motion.li className="relative">
        <WishList showFav={showFav} setter={setShowFav} />
        <Title title={!showFav ? "show your wishlist" : "hide your wishList"}>
          <ShowCount length={fav.length} />
          <AiFillHeart fontSize={"1.2rem"} onClick={() => setShowFav(true)} />
        </Title>
      </motion.li>
    </ul>
  );
};

export default ProdouctFeaturesLinks;
