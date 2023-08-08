import { AnimatePresence, MotionValue, motion } from "framer-motion";
import React, { useContext } from "react";
import { isAuthContext } from "../../context/isAuth";
import FadeElement from "../widgets/FadeElement";
import NavImg from "../widgets/NavImg";
import { useNavigate } from "react-router-dom";
import ProdouctFeaturesLinks from "./ProdouctFeaturesLinks";

interface Props {
  color: MotionValue;
}
const IsAuth = ({ color }: Props) => {
  const navigate = useNavigate();
  const { isAuth } = useContext(isAuthContext);

  return (
    <AnimatePresence mode="wait">
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
        <FadeElement
          cls="nav-is-auth center"
          delay={0.5}
          key={"user-isn't-autherized"}
        >
          <motion.button
            style={{ color }}
            className="btn main-outline"
            onClick={() => navigate("/login")}
          >
            join now
          </motion.button>
        </FadeElement>
      )}
    </AnimatePresence>
  );
};

export default IsAuth;
