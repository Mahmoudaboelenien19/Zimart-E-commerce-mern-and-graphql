import React, { useState } from "react";
import FadeElement from "../../widgets/animation/FadeElement";
import { AnimatePresence, motion } from "framer-motion";
import DashDropDown from "../Order/DashDropDown";
import { UserInterface } from "@/interfaces/user";
import Skeleton from "react-loading-skeleton";

const UserMobile = ({
  role,
  _id,
  lastLogIn,
  name,
  email,
  createdAt,
}: UserInterface) => {
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
        {name ? (
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
        ) : (
          <Skeleton height={15} width={300} />
        )}

        {name ? (
          <div className="order-state-par center gap`">
            <AnimatePresence mode="wait">
              <FadeElement cls="" key={role}>
                <span
                  style={{
                    background: `var(--${role?.split(" ").slice(-1)})`,
                    padding: 5,
                  }}
                  className="order-state w-100 center gap"
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
        ) : (
          <Skeleton height={25} width={40} />
        )}
      </div>

      {name ? (
        <span className="date">
          <span className="order-date" style={{ margin: 0 }}>
            email :{" "}
          </span>
          {email}
        </span>
      ) : (
        <Skeleton height={15} width={300} />
      )}

      {name ? (
        <span className="date">
          <span className="order-date" style={{ margin: 0 }}>
            created at :{" "}
          </span>
          &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
          {new Date(createdAt).toLocaleTimeString()}
        </span>
      ) : (
        <Skeleton height={15} width={300} />
      )}

      {name ? (
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
      ) : (
        <Skeleton height={15} width={300} />
      )}
    </motion.div>
  );
};

export default UserMobile;
