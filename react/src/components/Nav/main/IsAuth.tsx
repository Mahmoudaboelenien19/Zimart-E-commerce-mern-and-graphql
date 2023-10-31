import { motion } from "framer-motion";
import React, { useContext } from "react";
import NavImg from "./NavImg";
import { useNavigate } from "react-router-dom";
import ProdouctFeaturesLinks from "./ProdouctFeaturesLinks";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector } from "@/custom/reduxTypes";

const IsAuth = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(isAuthContext);
  const { clr } = useAppSelector((st) => st.bannerClr);
  return (
    <>
      {isAuth ? (
        <FadeElement
          className="nav-is-auth center"
          delay={0.1}
          key={"user-is-autherized"}
        >
          <ProdouctFeaturesLinks />
          <NavImg />
        </FadeElement>
      ) : (
        <FadeElement
          className="nav-is-auth center"
          key={"user-isn't-autherized"}
        >
          <motion.button
            style={{ border: `${clr}  solid 2px` }}
            initial={{ background: "#00000000" }}
            whileHover={{ background: clr }}
            className="btn main-outline nav-btn"
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
