import { useEffect } from "react";
import useIsMobile from "./useIsMobile";

const useHideScroll = (...boolArr: boolean[]) => {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    if ([...boolArr, isMobile].every((bool) => bool)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [...boolArr]);
  return;
};

export default useHideScroll;
