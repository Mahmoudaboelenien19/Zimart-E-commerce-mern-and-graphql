export const checkSvgVariant = {
  start: { opacity: 0, rotate: 0 },
  end: {
    opacity: [0, 1],

    transition: {
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

export const checkpathVariant = {
  start: { pathLength: 0, pathOffset: 1 },
  end: {
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: 0.4 },
  },
  exit: {
    pathLength: 0,

    pathOffset: -1,
    transition: { duration: 0.4 },
  },
};
