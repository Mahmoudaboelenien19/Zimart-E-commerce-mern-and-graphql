import React, { useEffect } from "react";
import { Children } from "./types/general";
import { useAppSelector } from "./custom/helpers/reduxTypes";

const ThemeWrapper = ({ children }: Children) => {
  const { theme } = useAppSelector((st) => st.theme);
  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("zimart-theme", theme);
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("zimart-theme", theme);
    }
  }, [theme]);
  return <>{children}</>;
};

export default ThemeWrapper;
