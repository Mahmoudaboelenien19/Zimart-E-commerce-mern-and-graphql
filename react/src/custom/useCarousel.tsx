import { useState } from "react";

const useCarousel = (index: number, len: number) => {
  type Tuple = [number | null, number];

  const [tuple, setTuple] = useState<Tuple>([null, index]);
  index;
  if (tuple[1] !== index) {
    setTuple([tuple[1], index]);
  }

  let direction = "";

  if (tuple[0]) {
    direction = tuple[0] > tuple[1] ? "increase" : "decrease";
  }

  if (tuple[0] && tuple[0] === 0 && tuple[1] === len - 1) {
    direction = "increase";
  }

  if (tuple[0] && tuple[0] === len - 1 && tuple[1] === 0) {
    direction = "decrease";
  }

  const variant = {
    end: { x: 0, opacity: 1 },
    start: ({ dir, width }: { dir: string; width: number }) => ({
      x: dir === "increase" ? width : -width,
      opacity: 0,
      transition: { type: "tween", duraion: 0.4 },
    }),
    exit: ({ dir, width }: { dir: string; width: number }) => ({
      x: dir === "increase" ? -0.5 * width : 0.5 * width,
      opacity: 0,
      transition: { type: "tween", duraion: 0.1 },
    }),
  };

  return [variant, direction];
};

export default useCarousel;
