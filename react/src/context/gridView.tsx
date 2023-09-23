import React, { createContext, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general.js";
interface viewConntext {
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
  gridView: boolean;
}
export const viewContext = createContext({} as viewConntext);
const GridViewContext = ({ children }: ChildrenInterFace) => {
  const [gridView, setGridView] = useState(true);

  return (
    <viewContext.Provider
      value={{
        gridView,
        setGridView,
      }}
    >
      {children}
    </viewContext.Provider>
  );
};

export default GridViewContext;
