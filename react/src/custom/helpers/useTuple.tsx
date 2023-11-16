import { useState } from "react";

const useTuple = (num: number) => {
  const [tuple, setTuple] = useState([-1, num]);
  num;
  if (tuple[1] !== num) {
    setTuple([tuple[1], num]);
  }

  const dir = tuple[1] > tuple[0] ? "increase" : "decrease";
  return { dir };
};

export default useTuple;
