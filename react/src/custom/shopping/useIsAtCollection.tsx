import { useEffect, useState } from "react";

type ArrType = { id: string }[];
const useIsAtCollection = (ar: ArrType, id: string) => {
  const [atCollection, setAtCollection] = useState(false);
  useEffect(() => {
    if (ar?.length > 0) {
      const check = ar.some((product) => id === product.id);

      if (check) {
        setAtCollection(true);
      } else {
        setAtCollection(false);
      }
    } else {
      setAtCollection(false);
    }
  }, [ar]);
  return { atCollection, setAtCollection };
};

export default useIsAtCollection;
