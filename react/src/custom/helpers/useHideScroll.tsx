import { useEffect } from "react";

const useHideScroll = (...boolArr: boolean[]) => {
  useEffect(() => {
    if ([...boolArr].every((bool) => bool)) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [...boolArr]);
  return;
};

export default useHideScroll;
