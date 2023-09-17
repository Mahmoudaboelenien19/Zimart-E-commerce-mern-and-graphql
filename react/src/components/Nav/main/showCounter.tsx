import { isAuthContext } from "@/context/isAuth";
import React, { useContext } from "react";

const ShowCount = ({ length }: { length: number }) => {
  const { isAuth } = useContext(isAuthContext);
  return (
    <>
      {isAuth && length >= 1 && (
        <div key={length} className="show-count center">
          {length}
        </div>
      )}
    </>
  );
};

export default ShowCount;
