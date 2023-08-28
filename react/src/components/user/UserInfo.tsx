import React, { useState, useContext, useEffect, Fragment } from "react";
import Detail from "./Detail";
import { isAuthContext } from "../../context/isAuth";
import { useMutation } from "@apollo/client";
import {
  Update_Country,
  Update_User_Email,
  Update_User_Phone,
  Update_user_name,
} from "../../graphql/mutations/user.js";
import Password from "./Password";

export interface userDataInterface {
  name: string;
  email: string;
  country: string;
  phone: string;
  [key: string]: any;
}

const UserInfo = () => {
  const { name, email, country, phone } = useContext(isAuthContext);
  const [updateName, setUpdateName] = useState(false);
  const [updateCountry, setUpdateCountry] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePhone, setUpdatePhone] = useState(false);
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
      setter: setUpdateName,
      fn: updateNameFn,
      bool: updateName,
    },

    {
      detail: "email",
      value: userData.email,
      setter: setUpdateEmail,
      fn: updateEmailFn,
      bool: updateEmail,
    },
    {
      detail: "phone",
      value: userData.phone || "No Phone Number is Added",
      setter: setUpdatePhone,
      fn: updatePhoneFn,
      bool: updatePhone,
    },
    {
      detail: "country",
      value: userData.country,
      setter: setUpdateCountry,
      bool: updateCountry,
      fn: updateCountryFn,
    },
  ];
  return (
    <div>
      <h2 className="underline header user-head">User Info</h2>

      {userArr.map(({ detail, value, fn, setter, bool }) => {
        return (
          <Fragment key={detail}>
            <Detail
              detail={detail}
              value={value}
              setter={setter}
              fn={fn}
              bool={bool}
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
