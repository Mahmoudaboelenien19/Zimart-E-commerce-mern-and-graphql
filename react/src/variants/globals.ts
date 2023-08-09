export const btnHover = {
  boxShadow: "var(--main-shadow)",
  scale: 1.01,
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 7,
  },
};

export const btnTap = {
  scale: 0.9,
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 7,
  },
};

export const parentVariant = {
  start: { height: 0 },
  end: (delay: number) => ({
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: delay || 0.1,
      duration: 0.4,
    },
  }),
  exit: {
    height: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      when: "afterChildren",
      duration: 0.2,
    },
  },
};

export const opacityVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0 },
};

interface popInterface {
  dir: string;
  height?: number;
}
export const popVariant = {
  start: ({ dir, height }: popInterface) => ({
    y: dir === "bottom" ? height : -500,
  }),
  end: { y: 0, transition: { duration: 0.5, delay: 0.4 } },
  exit: ({ dir, height }: popInterface) => ({
    y: dir === "bottom" ? height : -500,
    transition: { duration: 0.5 },
  }),
};

export const overleyVariant = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren" } },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, when: "afterChildren", ease: "easeInOut" },
  },
};

export const reviewCounter = {
  start: { opacity: 0, y: -5 },
  end: { opacity: 1, y: 0 },
  exit: ({ rate, count }: { count: number; rate: number }) => ({
    y: 5,
    opacity: 0,
    transition: { duration: count === rate - 1 ? 0.4 : 0.1 },
  }),
};

export const selectDropDownVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.01,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      // when: "afterChildren",
      duration: 0.05,
    },
  },
};

export const asideVariant = {
  start: { width: 0, opacity: 0 },
  end: ({ bool = false, w = 200 }) => ({
    width: bool ? "100%" : w,
    opacity: 1,
    transition: {
      opacity: { delay: 0.4, duration: 0.4 },
      width: { delay: 0, duration: 0.4 },
      when: "beforeChildren",
    },
  }),
  exit: {
    width: 0,
    opacity: 0,
    transition: {
      opacity: { delay: 0, duration: 0.1 },
      width: { delay: 0.2, duration: 0.2 },
      when: "afterChildren",
    },
  },
};

export const textVariant = {
  start: { y: 20, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.8, repeatDelay: 1, duration: 0.4 },
  },
};

export const reverseVariant = {
  start: (order: string) => ({ x: order === "first" ? -800 : 800 }),
  end: { x: 0, transition: { type: "tween" } },
};

export const mobileDropDownVariant = {
  start: { width: 0 },
  end: {
    width: "100%",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    width: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};
