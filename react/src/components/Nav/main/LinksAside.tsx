import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import NavLinks from "./NavLinks";
import ThemeToggle from "@/components/theme/ThemeToggle";
import MenuTogglar from "@/components/widgets/shared/menuToggle/MenuTogglar";
import FadeElement from "@/components/widgets/animation/FadeElement";
export const mobileAside = {
  start: {
    width: 300,
    x: 300,
    clipPath: "ellipse(50% 50% at right)",
  },
  end: {
    x: 0,
    clipPath: "ellipse(160% 160% at right)",
    transition: {
      clipPath: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },

      when: "beforeChildren",
      staggerChildren: 1,
    },
  },
  exit: {
    x: 300,
    clipPath: "ellipse(50% 50% at right)",

    transition: {
      clipPath: {
        duration: 0.7,
      },
      when: "afterChildren",
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.1,
      // staggerDirection: -1,
      duration: 1,
    },
  },
};

const LinksAside = () => {
  const [showAside, setShowAside] = useState(false);

  return (
    <Fragment>
      <div className="nav-menu">
        <MenuTogglar
          bool={showAside}
          showMsg="show nav bar"
          hideMsg="close nav bar"
          setter={setShowAside}
        />
      </div>
      <AnimatePresence>
        {showAside && (
          <motion.aside
            key={"aside-links"}
            variants={mobileAside}
            initial="start"
            animate="end"
            exit="exit"
            className={"aside-links"}
          >
            <FadeElement
              style={{ marginLeft: 15 }}
              delay={showAside ? 0.8 : 0}
              duration={0.1}
            >
              <ThemeToggle />
            </FadeElement>

            <NavLinks setShowAside={setShowAside} />
          </motion.aside>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default LinksAside;
