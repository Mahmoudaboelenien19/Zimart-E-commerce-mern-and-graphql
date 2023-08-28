import { motion, MotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoGitCompareSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ShowCount from "./showCounter";
import WishList from "../wishlist/WishList";
import Title from "../../widgets/Title";
import { useAppSelector } from "../../../custom/reduxTypes";
import useIsMobile from "../../../custom/useIsMobile";
interface Props {
  LinkClr?: MotionValue | string;
}
const ProdouctFeaturesLinks = ({ LinkClr = "white" }: Props) => {
  const [showFav, setShowFav] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const { compare } = useAppSelector((state) => state.compare);
  const { fav } = useAppSelector((state) => state.fav);
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (isMobile && showFav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showFav, isMobile]);
  return (
    <ul>
      <NavLink to="/cart" className="cart-active-link ">
        <motion.li id="cart-link-par" style={{ color: LinkClr }}>
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
        <motion.li id="cart-link-par" style={{ color: LinkClr }}>
          <Title title="compare products list">
            <ShowCount length={compare.length} />
            <IoGitCompareSharp fontSize={"1.2rem"} />
          </Title>
        </motion.li>
      </NavLink>

      <motion.li
        style={{ color: showFav ? "var(--delete)" : LinkClr }}
        className="fav-par center"
      >
        <WishList showFav={showFav} setter={setShowFav} />
        <Title title={!showFav ? "show your wishlist" : "hide your wishList"}>
          <ShowCount length={fav.length} />

          <AiFillHeart fontSize={"1.2rem"} onClick={() => setShowFav(true)} />
        </Title>
      </motion.li>
      {/* <motion.li className="center auth-par"></motion.li> */}
    </ul>
  );
};

export default ProdouctFeaturesLinks;
