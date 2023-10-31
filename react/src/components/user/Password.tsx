import { Fragment } from "react";
import Input from "../widgets/shared/forms/Input";

const Password = () => {
  return (
    <Fragment>
      <Input placeholder={"old"} type="password" />
      <Input placeholder={"new"} type="password" />
      <Input placeholder={"confirm"} type="password" />
    </Fragment>
  );
};

export default Password;
