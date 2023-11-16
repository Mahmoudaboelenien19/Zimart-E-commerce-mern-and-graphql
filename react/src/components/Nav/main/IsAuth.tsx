import { AnimatePresence, motion } from "framer-motion";

import NavImg from "./NavImg";
import { useNavigate } from "react-router-dom";
import ProdouctFeaturesLinks from "./ProdouctFeaturesLinks";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import useInnitialRender from "@/custom/helpers/useInnitialRender";

const IsAuth = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((st) => st.isAuth);
  const { clr } = useAppSelector((st) => st.bannerClr);
  const { isInitialRender } = useInnitialRender(1000, true);
  return (
    <FadeElement delay={isInitialRender ? 1 : 0.2}>
      <AnimatePresence initial={false} mode="wait">
        {isAuth ? (
          <FadeElement
            className="nav-is-auth center"
            delay={0}
            duration={0.05}
            key={"user-is-autherized"}
          >
            <ProdouctFeaturesLinks />
            <NavImg />
          </FadeElement>
        ) : (
          <FadeElement
            className="nav-is-auth center"
            key={"user-isn't-autherized"}
            delay={0}
            duration={0.0}
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
      </AnimatePresence>
    </FadeElement>
  );
};

export default IsAuth;
