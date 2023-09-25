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
    localStorage.setItem("zimart-theme", theme);
    document.body.classList.add(theme, "main-bg");
    if (theme === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.remove("light");
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
