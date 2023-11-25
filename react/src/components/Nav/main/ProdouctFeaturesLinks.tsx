import { motion } from "framer-motion";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoGitCompareSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ShowCount from "./showCounter";
import WishList from "../wishlist/WishList";
import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

const ProdouctFeaturesLinks = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { compare } = useAppSelector((state) => state.compare);

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
        <WishList />
      </motion.li>
    </ul>
  );
};

export default ProdouctFeaturesLinks;
