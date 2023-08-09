import React, { useState } from "react";
import FadeElement from "../../widgets/FadeElement";
import { AnimatePresence, motion } from "framer-motion";
import DashDropDown from "../Order/DashDropDown";

interface Props {
  role: string;
  _id: string;
  name: string;
  email: string;
  index: number;
  createdAt: string;
  lastLogIn: string;
}
const UserMobile = ({
  role,
  _id,
  lastLogIn,
  name,
  email,

  index,
  createdAt,
}: Props) => {
  const [updateRole, setUpdateRole] = useState(role);

  return (
    <motion.div
      initial={{ y: 40 }}
      viewport={{ once: true }}
      whileInView={{ y: 0 }}
      className="order-mobile box-shadow center gap col start"
      style={{ padding: 20 }}
    >
      <div className="center between w-100">
        <span
          style={{
            fontWeight: "bold",
            color: "var(--third)",
            marginBottom: -4,
          }}
        >
          <span>Name : </span>
          {name}
        </span>
        <div className="order-state-par center gap`">
          <AnimatePresence mode="wait">
            <FadeElement cls="" key={role}>
              <span
                style={{ background: `var(--${role?.split(" ").slice(-1)})` }}
                className="order-state center gap"
              >
                {role}
              </span>
            </FadeElement>
          </AnimatePresence>
          <DashDropDown
            _id={_id}
            setter={setUpdateRole}
            state={updateRole}
            arr={["user", "admin", "owner", "moderator"]}
            type="user"
          />
        </div>
      </div>

      <span className="date">
        <span className="order-date" style={{ margin: 0 }}>
          email :{" "}
        </span>
        {email}
      </span>
      <span className="date">
        <span className="order-date" style={{ margin: 0 }}>
          created at :{" "}
        </span>
        &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </span>
      <span className="date " style={{ display: "flex" }}>
        <span className="order-date" style={{ margin: 0 }}>
          last login :{" "}
        </span>
        <AnimatePresence mode="wait">
          <FadeElement cls="" key={lastLogIn}>
            &#160;{" "}
            {lastLogIn
              ? `${new Date(lastLogIn).toLocaleDateString()} -
        ${new Date(lastLogIn).toLocaleTimeString()}`
              : "_"}
          </FadeElement>
        </AnimatePresence>
      </span>
      {/* <StyledPrice price={cost} /> */}
    </motion.div>
  );
};

export default UserMobile;
