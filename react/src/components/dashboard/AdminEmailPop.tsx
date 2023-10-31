import { useContext, useEffect, useState } from "react";
import { isAuthContext } from "../../context/isAuth";
import MainPop from "../widgets/shared/popup/MainPop";

interface Props {
  isLoaded: boolean;
}
const AdminEmailPop = ({ isLoaded }: Props) => {
  const { isAdmin } = useContext(isAuthContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer: number;
    if (isAdmin) {
      setShow(false);
    } else {
      if (isLoaded) {
        timer = setTimeout(() => {
          setShow(true);
        }, 2000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isAdmin, isLoaded]);
  return (
    <MainPop setter={setShow} bool={show} className="admin-pop">
      <h3 className="center col gap">
        <span>If you want to test Admin features</span>
        <span>use this Email</span>
      </h3>
      <p className="center col gap w-100">
        <div>
          <span className="detail">Email :</span>
          <span className="value">admin@gmail.com</span>
        </div>
        <div>
          <span className="detail">password :</span>
          <span className="value">admin123#</span>
        </div>
      </p>
    </MainPop>
  );
};

export default AdminEmailPop;
