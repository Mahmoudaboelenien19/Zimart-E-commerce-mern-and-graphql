import React, { useContext, useEffect, useState } from "react";
import { isAuthContext } from "../../context/isAuth";
import MainPop from "../widgets/MainPop";

interface Props {
  isLoaded: boolean;
}
const AdminEmailPop = ({ isLoaded }: Props) => {
  const { isAdmin } = useContext(isAuthContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isAdmin) {
      setShow(false);
    } else {
      if (isLoaded) {
        setTimeout(() => {
          setShow(true);
        }, 2000);
      }
    }
  }, [isAdmin, isLoaded]);
  return (
    <MainPop setter={setShow} bool={show}>
      <h3
        className="center col gap"
        style={{
          marginBottom: 20,
          color: "var(--wheat)",

          padding: "0 20px",
          textTransform: "capitalize",
        }}
      >
        <span>If you want to test Admin features</span>
        <span>use this Email</span>
      </h3>
      <div className="center col gap w-100">
        <div>
          <span className="detail">Email :</span>
          <span className="value">admin@gmail.com</span>
        </div>
        <div>
          <span className="detail">password :</span>
          <span className="value">admin123#</span>
        </div>
      </div>
    </MainPop>
  );
};

export default AdminEmailPop;
