import { MotionValue, motion } from "framer-motion";
import React, { useContext } from "react";
import NavImg from "./NavImg";
import { useNavigate } from "react-router-dom";
import ProdouctFeaturesLinks from "./ProdouctFeaturesLinks";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { isAuthContext } from "@/context/isAuth";

interface Props {
  color: MotionValue;
}
const IsAuth = ({ color }: Props) => {
  const navigate = useNavigate();
  const { isAuth } = useContext(isAuthContext);

  return (
    <>
      {isAuth ? (
        <FadeElement
          cls="nav-is-auth center"
          delay={0.1}
          key={"user-is-autherized"}
        >
          <ProdouctFeaturesLinks LinkClr={color} />
          <NavImg />
        </FadeElement>
      ) : (
        <FadeElement cls="nav-is-auth center" key={"user-isn't-autherized"}>
          <motion.button
            style={{ color }}
            className="btn main-outline "
            onClick={() => navigate("/login")}
          >
            join now
          </motion.button>
        </FadeElement>
      )}
    </>
  );
};

export default IsAuth;
