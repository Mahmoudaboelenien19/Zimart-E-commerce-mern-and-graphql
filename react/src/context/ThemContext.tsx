import React, { createContext, useEffect, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general";

interface themeContextInterface {
  theme: string;
  toggleTheme: () => void;
}
export const themeContext = createContext({} as themeContextInterface);

const ThemContext = ({ children }: ChildrenInterFace) => {
  const localstorageTheme = localStorage.getItem("zimart-theme");
  const [theme, setTheme] = useState(localstorageTheme || "dark");

  useEffect(() => {
    if (theme == "light") {
      document.documentElement.style.setProperty("--secondary", "#EFF0F2");
      document.documentElement.style.setProperty("--third", "#000");
      document.documentElement.style.setProperty("--main", "#ffffff");
      document.documentElement.style.setProperty("--forth", " #ffffff");
      localStorage.setItem("zimart-theme", "light");
    } else {
      document.documentElement.style.setProperty("--main", "#111417");
      document.documentElement.style.setProperty("--secondary", "#222222");
      document.documentElement.style.setProperty("--third", "#333333");
      document.documentElement.style.setProperty("--forth", " #000000");

      document.documentElement.style.setProperty(
        "--third",
        "rgb(247, 246, 246)"
      );
      localStorage.setItem("zimart-theme", "dark");
    }
  }, [theme]);
  const toggleTheme = () =>
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  return (
    <themeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemContext;
