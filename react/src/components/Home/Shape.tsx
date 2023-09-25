import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";
import React, { useContext } from "react";

const Shape = () => {
  const { theme } = useContext(themeContext);
  return (
    <div className={clsx("banner-shape", theme)}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
};

export default Shape;
