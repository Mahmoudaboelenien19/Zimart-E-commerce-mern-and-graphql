import { useState, useContext } from "react";
import MainBtn from "../widgets/buttons/MainBtn";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { isAuthContext } from "@/context/isAuth";
import clsx from "clsx";
import UpdateForm from "./UpdateForm";
import MainPop from "../widgets/shared/popup/MainPop";
interface Props {
  value: string;
  detail: string;
}

const Detail = ({ detail, value }: Props) => {
  const { isAdmin } = useContext(isAuthContext);
  const [show, setShow] = useState(false);

  const handleShowPopup = () => {
    if (!isAdmin) {
      setShow(true);
    } else {
      toast("admins can't change their data ", {
        icon: <AiFillWarning fontSize={18} color="var(--star)" />,
      });
    }
  };

  return (
    <>
      <div className="user-detail-par ">
        <div className="details w-100">
          <div className="detail">{detail} :</div>
          <p
            className={clsx(
              "user-value ",
              detail === "country" && "capatilize"
            )}
          >
            {value}
          </p>

          <MainBtn
            key={detail}
            btn="update"
            className="btn update-user center gap"
            onClick={handleShowPopup}
            Icon={GrUpdate}
          />

          <MainPop bool={show} setter={setShow}>
            <UpdateForm detail={detail} value={value} setter={setShow} />
          </MainPop>
        </div>
      </div>
    </>
  );
};

export default Detail;
