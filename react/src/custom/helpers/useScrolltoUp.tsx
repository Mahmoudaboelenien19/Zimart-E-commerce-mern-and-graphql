import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToUp = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
