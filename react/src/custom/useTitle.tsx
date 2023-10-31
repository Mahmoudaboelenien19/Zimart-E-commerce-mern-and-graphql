import { useEffect } from "react";

const useTitle = (title: string, check?: any) => {
  useEffect(() => {
    if (check) {
      document.title = title;
    } else {
      document.title = "loading ...";
    }
  }, [check]);
};

export default useTitle;
