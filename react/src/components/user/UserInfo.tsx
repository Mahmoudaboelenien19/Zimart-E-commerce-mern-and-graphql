import { useState, useContext, useEffect, Fragment } from "react";
import Detail from "./Detail";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_DATA } from "@/graphql/mutations/user";
import { isAuthContext } from "@/context/isAuth";
import useTitle from "@/custom/useTitle";

export interface userDataInterface {
  name: string;
  email: string;
  country: string;
  phone: string;
  [key: string]: any;
}

const UserInfo = () => {
  const { userId } = useContext(isAuthContext);
  const [userData, setUserData] = useState<userDataInterface>({
    name: "",
    email: "",
    country: "",
    phone: "",
  });
  const [getData] = useLazyQuery(GET_USER_DATA);
  useEffect(() => {
    if (userId) {
      getData({
        variables: {
          id: userId,
        },
      }).then((res: any) => {
        setUserData(res.data?.getUserData);
      });
    }
  }, [userId]);

  useTitle(userData?.name, userData?.name);

  const userArr = [
    {
      detail: "name",
      value: userData.name,
    },

    {
      detail: "email",
      value: userData.email,
    },
    {
      detail: "password",
      value: "*********",
    },
    {
      detail: "phone",
      value: userData.phone || "No Phone Number is Added",
    },
    {
      detail: "country",
      value: userData.country,
    },
  ];
  return (
    <div className="user-details">
      <h2 className="underline header user-head">User Info</h2>

      {userArr.map(({ detail, value }) => {
        return (
          <Fragment key={detail}>
            <Detail
              detail={detail}
              value={value}

              // setUpdateUserData={setUserData}
              // userdata={userData}
            />
            <div className="hr" />
          </Fragment>
        );
      })}
    </div>
  );
};
export default UserInfo;
