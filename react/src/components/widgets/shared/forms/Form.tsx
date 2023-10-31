import clsx from "clsx";
import { useAnimate, stagger, useInView } from "framer-motion";
import { useEffect, FormHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  initialTranslate: number;
  delay?: number;
} & FormHTMLAttributes<HTMLFormElement>;
const Form = ({
  children,
  delay,
  initialTranslate,
  className,
  ...props
}: Props) => {
  const [ref, animateForm] = useAnimate();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animateForm(
        ref.current,
        { opacity: [0, 0.3, 0.6, 0.8, 1], x: [initialTranslate, 0] },
        { duration: 0.3, delay: delay || 0 }
      ).then(() => {
        animateForm(
          "form , form > *  ",
          { opacity: [0, 1] },
          { delay: stagger(0.07) }
        );
      });
    }
  }, [inView]);

  return (
    <form
      className={clsx(className, "opacity-0 animeted")}
      ref={ref}
      noValidate
      autoComplete="off"
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
