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
  },
  exit: {
    pathLength: 0,
    pathOffset: 1,
  },
};

interface parentVarientParam {
  filter: string;
  isChecked: string;
  index?: number;
}

export const parentVarient = {
  start: {},
  end: ({ filter, isChecked, index }: parentVarientParam) => ({
    rotate: filter === isChecked ? [0, 15, -15, 0] : "",
    transition: {
      rotate: {
        when: "beforeChildren",
        duration: 0.3,
      },
      delay: index ? index * 0.025 : 0,
    },
  }),
  exit: ({ index }: parentVarientParam) => ({
    transition: {
      when: "afterChildren",
      duration: 0.2,
      delay: index ? index * 0.1 : 0,
      staggerDirection: index ? -1 : 1,
    },
  }),
};
