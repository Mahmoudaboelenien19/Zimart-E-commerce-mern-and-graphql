import React, { useState, useContext, useEffect, Fragment } from "react";
import Detail from "./Detail";
import { useMutation } from "@apollo/client";

import Password from "./Password";
import {
  Update_Country,
  Update_User_Email,
  Update_User_Phone,
  Update_user_name,
} from "@/graphql/mutations/user";
import { isAuthContext } from "@/context/isAuth";

export interface userDataInterface {
  name: string;
  email: string;
  country: string;
  phone: string;
  [key: string]: any;
}

const UserInfo = () => {
  const { name, email, country, phone } = useContext(isAuthContext);
  const [updateNameFn] = useMutation(Update_user_name);
  const [updatePhoneFn] = useMutation(Update_User_Phone);
  const [updateEmailFn] = useMutation(Update_User_Email);
  const [updateCountryFn] = useMutation(Update_Country);
  const [userData, setUserData] = useState<userDataInterface>({
    name: "",
    email: "",
    country: "",
    phone: "",
  });
  useEffect(() => {
    if (name !== "") {
      setUserData({ name, email, country, phone });
    }
  }, [name]);
  useEffect(() => {
    document.title = userData?.name;
  }, [userData?.name]);
  const userArr = [
    {
      detail: "name",
      value: userData.name,
      fn: updateNameFn,
    },

    {
      detail: "email",
      value: userData.email,
      fn: updateEmailFn,
    },
    {
      detail: "phone",
      value: userData.phone || "No Phone Number is Added",
      fn: updatePhoneFn,
    },
    {
      detail: "country",
      value: userData.country,
      fn: updateCountryFn,
    },
  ];
  return (
    <div>
      <h2 className="underline header user-head">User Info</h2>

      {userArr.map(({ detail, value, fn }) => {
        return (
          <Fragment key={detail}>
            <Detail
              detail={detail}
              value={value}
              fn={fn}
              setUpdateUserData={setUserData}
              userdata={userData}
            />
            <div className="hr"></div>
            {detail === "email" && (
              <>
                <Password />
                <div className="hr"></div>
              </>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default UserInfo;
