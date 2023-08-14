import { useAnimate, motion, stagger, useInView } from "framer-motion";
import React, { useEffect } from "react";
import { ChildrenInterFace } from "../../interfaces/general";

interface Props extends ChildrenInterFace {
  fn: () => void;
  cls: string;
}

const FormAnimation = ({ children, fn, cls }: Props) => {
  const [ref, animateForm] = useAnimate();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animateForm(
        ref.current,
        {
          x: [20, 0],
          opacity: [0, 1],
        },
        { duration: 0.2 }
      ).then(() => {
        animateForm(
          "form , form > *",
          { opacity: [0, 1], x: [20, 0] },
          { delay: stagger(0.2) }
        );
      });
    }
  }, [inView]);

  return (
    <motion.form
      className={`hide ${cls}`}
      onSubmit={fn}
      ref={ref}
      autoComplete="off"
    >
      {children}
    </motion.form>
  );
};

export default FormAnimation;
