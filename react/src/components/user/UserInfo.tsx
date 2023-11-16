import { Fragment } from "react";
import Detail from "./Detail";
import useTitle from "@/custom/helpers/useTitle";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
const UserInfo = () => {
  const { name, phone, country, email } = useAppSelector((st) => st.userData);

  useTitle((name as string) || "", name);

  const userArr = [
    {
      detail: "name",
      value: name,
    },

    {
      detail: "email",
      value: email,
    },
    {
      detail: "password",
      value: "*********",
    },
    {
      detail: "phone",
      value: phone || "No Phone Number is Added",
    },
    {
      detail: "country",
      value: country,
    },
  ];
  return (
    <div className="user-details">
      <h2 className="underline header user-head">User Info</h2>

      {userArr.map(({ detail, value }) => {
        return (
          <Fragment key={detail}>
            <Detail detail={detail} value={value} />
            <div className="hr" />
          </Fragment>
        );
      })}
    </div>
  );
};
export default UserInfo;
