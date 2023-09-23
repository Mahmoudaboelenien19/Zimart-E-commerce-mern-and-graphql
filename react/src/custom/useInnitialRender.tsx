import { useState, useEffect } from "react";
const useInnitialRender = (dur = 500, defVal = true) => {
  const [isInitialRender, setInitialRender] = useState(defVal);
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialRender(!defVal);
    }, dur);
    return () => clearTimeout(timer);
  }, []);
  return { isInitialRender };
};

export default useInnitialRender;
