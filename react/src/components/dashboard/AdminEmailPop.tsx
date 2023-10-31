import { useContext, useEffect, useState } from "react";
import { isAuthContext } from "../../context/isAuth";
import MainPop from "../widgets/shared/popup/MainPop";

const AdminEmailPop = () => {
  const { isAdmin } = useContext(isAuthContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer: number;
    if (isAdmin) {
      setShow(false);
    } else {
      timer = setTimeout(() => {
        setShow(true);
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isAdmin]);
  return (
    <MainPop setter={setShow} bool={show} className="admin-pop">
      <h2
      // className="center col gap"
      >
        If you want to test Admin features use this Email
      </h2>
      <div className=" email">
        <div className="details">
          <span className="detail">Email :</span>
          <span className="value">admin@gmail.com</span>
        </div>
        <div className="details">
          <span className="detail">password :</span>
          <span className="value">admin123#</span>
        </div>
      </div>
    </MainPop>
  );
};

export default AdminEmailPop;
