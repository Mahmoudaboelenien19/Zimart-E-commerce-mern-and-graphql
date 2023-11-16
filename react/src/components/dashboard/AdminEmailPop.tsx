import { useEffect, useState } from "react";
import MainPop from "../widgets/shared/popup/MainPop";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

const AdminEmailPop = () => {
  const { role } = useAppSelector((st) => st.userData);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer: number;
    if (role === "admin") {
      setShow(false);
    } else {
      timer = setTimeout(() => {
        setShow(true);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [role]);
  return (
    <MainPop setter={setShow} bool={show} className="admin-pop">
      <h2>If you want to test Admin features use this Email. !</h2>
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
