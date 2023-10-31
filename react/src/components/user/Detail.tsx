import { useState, useContext } from "react";
import MainBtn from "../widgets/buttons/MainBtn";
import { GrUpdate } from "react-icons/gr";
import { userDataInterface } from "./UserInfo";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { isAuthContext } from "@/context/isAuth";
import clsx from "clsx";
import UpdateForm from "./UpdateForm";
import MainPop from "../widgets/shared/popup/MainPop";
interface Props {
  value: string;
  detail: string;
  // fn: (variables: any) => any;
  // placeholder?: string;
  // setUpdateUserData: React.Dispatch<React.SetStateAction<userDataInterface>>;
  // userdata: userDataInterface;
}

const Detail = ({ detail, value }: Props) => {
  const { userId, isAdmin } = useContext(isAuthContext);
  // const [UpdatedCountry, setUpdatedCountry] = useState("");
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (userdata?.country && UpdatedCountry === "") {
  //     setUpdatedCountry(userdata.country);
  //   }
  // }, [userdata?.country]);

  // const update = async (data: FieldValues) => {
  //   const { [detail]: detailvalue } = data;
  //   const { data: res } = await fn({
  //     variables: {
  //       _id: userId,
  //       [detail]: detail === "country" ? UpdatedCountry : detailvalue,
  //     },
  //   });

  //   if (detail === "email") {
  //     if (res?.updateEmail?.status === 200) {
  //       setStatus(200);
  //     } else {
  //       toast.error(res?.updateEmail.msg);
  //       setStatus(404);
  //     }
  //   }

  //   if (detail === "phone") {
  //     if (res?.updateUserPhone?.status === 200) {
  //       setStatus(200);
  //     } else {
  //       toast.error(res?.updateUserPhone.msg);
  //       setStatus(404);
  //     }
  //   }

  //   if (detail === "name") {
  //     if (res?.updateUserName?.status === 200) {
  //       setStatus(200);
  //     } else {
  //       toast.error(res?.updateUserName.msg);
  //       setStatus(404);
  //     }
  //   }

  //   if (detail === "country") {
  //     if (res?.updateUserCountry?.status === 200) {
  //       setStatus(200);
  //     } else {
  //       toast.error(res?.updateUserCountry.msg);
  //       setStatus(404);
  //     }
  //   }

  //   setUpdateUserData((cur: userDataInterface) => ({
  //     ...cur,
  //     [detail]: detailvalue,
  //     country: UpdatedCountry,
  //   }));
  // };

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
