import { createContext, useEffect, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general";

interface themeContextInterface {
  theme: string;
  toggleTheme: () => void;
}
export const themeContext = createContext({} as themeContextInterface);

const ThemContext = ({ children }: ChildrenInterFace) => {
  const localstorageTheme = localStorage.getItem("zimart-theme");
  const [theme, setTheme] = useState(localstorageTheme || "light");

  useEffect(() => {
    localStorage.setItem("zimart-theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
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
