import { linksArr } from "@/assets/arries/LinksArr";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { useAppDispatch } from "@/custom/helpers/reduxTypes";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { clearProductRedux } from "@/redux/productSlice";
import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const linkVariant = {
  start: { x: 15, opacity: 0 },
  end: { x: 0, opacity: [0, 0.2, 1] },
  exit: (i: number) => ({
    x: 15,
    opacity: [1, 0],
    transition: {
      duration: 0.17,
      opacity: { delay: i * 0.1 },
    },
  }),
};

interface Props {
  setShowAside?: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavLinks = ({ setShowAside }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setactive] = useState("");
  const { isMobile } = useIsMobile();
  const dispatch = useAppDispatch();
  const linkFn = (to: string) => {
    if (to === "/") {
      //this to make skelton loading not delay
      dispatch(clearProductRedux());
    }
    if (to != "/dashboard") {
      setactive(to);
      setTimeout(() => {
        navigate(to);
      }, 150);
    } else {
      navigate("/dashboard");
    }
    if (setShowAside) {
      setShowAside(false);
    }
  };

  useEffect(() => {
    setactive(pathname);
  }, [pathname]);
  const initialRender = useRef(true);
  return (
    <ul className="links center">
      {linksArr.map(({ to, link }, i) => {
        return (
          <LayoutGroup key={i}>
            <motion.li
              layout
              transition={{
                duration: isMobile ? 0.1 : 0,
                delay: isMobile ? i * 0.05 : 0,
              }}
              custom={i}
              className="center relative link"
              variants={isMobile ? linkVariant : {}}
              key={link + "link"}
              onClick={() => linkFn(to)}
            >
              <FadeElement delay={!isMobile ? 0.15 + i * 0.05 : 0}>
                {link}
              </FadeElement>
              {active === to && !isMobile && (
                <motion.div
                  transition={{
                    duration: 0.15,
                  }}
                  initial={{ background: "rgba(0,0,0,0)" }}
                  animate={{
                    background: "rgb(255,255,255)",
                    transition: {
                      duration: initialRender.current ? 0.4 : 0,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }}
                  layoutId="active-link"
                  className="active-link"
                  onAnimationComplete={() => (initialRender.current = false)}
                />
              )}
            </motion.li>
          </LayoutGroup>
        );
      })}
    </ul>
  );
};

export default NavLinks;
