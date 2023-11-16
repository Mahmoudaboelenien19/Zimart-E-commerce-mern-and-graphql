export const dropdownVariant = {
  start: {
    opacity: 0,
    scale: 0.8,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: {
        delay: 0.3,
      },
      scale: {
        delay: 0.3,
      },
    },
  },
  exit: {
    scale: 0.8,

    opacity: 0,
    transition: {
      opacity: { duration: 0.1 },
    },
  },
};
export const staggerChildrenVariant = {
  start: { height: 0 },
  end: {
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.07,
      staggerDirection: 1,
    },
  },
  exit: {
    height: 0,
    margin: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.07,
      staggerDirection: -1,
    },
  },
};
export const opacityVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0 },
};

// export const selectDropDownVariants = {
//   start: { opacity: 0 },
//   end: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.1,
//       duration: 0.01,
//       delay: 0.3,
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       // when: "afterChildren",
//       duration: 0.05,
//     },
//   },
// };

export const asideVariant = {
  start: { width: 0, opacity: 0 },
  end: ({ bool = false, w = 300 }) => ({
    width: bool ? "100%" : w,
    opacity: [0, 0.2, 0.3, 0.5, 1],
    transition: {
      ease: "easeInOut",
      width: { delay: 0.3, duration: 0.6 },
      opacity: { delay: 0.6, duration: 0.2 },
    },
  }),
  exit: {
    padding: 0,
    width: 0,
    opacity: [0.2, 0],
    transition: {
      opacity: { duration: 0.075 },
      width: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  },
};

export const textVariant = {
  start: { y: 20, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.8,
      repeatDelay: 1,
      duration: 0.4,
    },
  },
};

export const reverseVariant = {
  start: (order: string) => ({ x: order === "first" ? -100 : 100 }),
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

export const seachVariant = {
  hide: {
    borderRadius: "50%",
    height: 40,
    width: 40,
    transition: { duration: 0.2 },
  },
  show: {
    borderRadius: "2%",
    width: "100%",
    transition: { delay: 0.2, duration: 0.15 },
  },
  main: {
    width: "100%",
    borderRadius: "1%",
  },
};

export const parentVariant = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { when: "beforeChildren" } },
  exit: { opacity: 0, transition: { when: "afterChildren" } },
};
