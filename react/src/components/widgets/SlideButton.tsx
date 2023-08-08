import React, { useEffect, useState } from "react";
import Overley from "./Overley";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import CircleCheckSvg from "../../custom SVGs/CircleCheckSvg";
import { FaGreaterThan } from "react-icons/fa";
import { ChildrenInterFace } from "../../interfaces/general";
interface Props extends ChildrenInterFace {
  sethide: React.Dispatch<React.SetStateAction<boolean>>;
  cls: string;
  head: string;
  doneMsg: string;
  height: number;
  fn: () => void;
  isVaild?: boolean;
  Status?: number;
}
const SlideButton = ({
  height,
  doneMsg,
  sethide,
  head,
  cls,
  children,
  isVaild,
  fn,
  Status,
}: Props) => {
  const offset = useMotionValue(0);
  const controls = useAnimation();
  const opacity = useTransform(offset, [0, 200], [1, 0]);
  const background = useTransform(offset, [0, 200], ["#378758", "#c5af87c9"]);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const textVariant = {
    start: { y: 20, opacity: 0 },
    end: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.8, repeatDelay: 1, duration: 0.4 },
    },
  };

  useEffect(() => {
    let timer: number;
    if (Status === 200) {
      setIsConfirmed(true);
    } else if (Status == 404) {
      controls.start({ x: 0, y: 0 });
    }
    return () => clearTimeout(timer);
  }, [Status, fn]);

  return (
    <Overley
      sethide={sethide}
      cls={`${cls} slide-bottom center col ${
        !isConfirmed ? "between" : "center"
      }`}
      dir="bottom"
      height={height}
    >
      {!isConfirmed ? (
        <>
          <h4 className="underline header underline-sm header-sm pop-head ">
            {head}
          </h4>

          {children}
          <motion.div
            className="slide-par center 
      "
            style={{ background }}
          >
            <motion.button
              type="submit"
              style={{ x: offset }}
              drag="x"
              dragConstraints={{
                top: 0,
                left: 0,
              }}
              animate={controls}
              onPan={(e, info) => {
                const x = info.offset.x;
                if (x > 0) {
                  controls.set({
                    x: x < 200 ? x : 200,
                    y: 0,
                  });
                }
              }}
              onPanEnd={(_, info) => {
                if (info.offset.x >= 200 && isVaild) {
                  fn();
                } else {
                  controls.start({ x: 0, y: 0 });
                }
              }}
              className="btn slide center gap"
            >
              <FaGreaterThan className="icon" />
              <FaGreaterThan className="icon" />
            </motion.button>
            <motion.span style={{ opacity }} className="slide-text">
              slide to confirm
            </motion.span>
          </motion.div>
        </>
      ) : (
        <div className={`${cls} confirmed center col gap`}>
          <div className="scale">
            <CircleCheckSvg check={true} />
          </div>
          <motion.span
            variants={textVariant}
            initial="start"
            exit="exit"
            animate="end"
            onAnimationComplete={() =>
              setTimeout(() => {
                sethide(false);
              }, 1000)
            }
          >
            {doneMsg}
          </motion.span>
        </div>
      )}
    </Overley>
  );
};

export default SlideButton;
