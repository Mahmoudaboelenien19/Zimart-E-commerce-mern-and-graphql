import { AnimatePresence } from "framer-motion";
import React, { useState, Fragment } from "react";
import FadeElement from "../../widgets/animation/FadeElement";
import DashDropDown from "../Order/DashDropDown";
import { UserInterface } from "@/interfaces/user";
import Skeleton from "react-loading-skeleton";

interface Props extends UserInterface {
  index: number;
}
const Order = ({
  role,
  _id,
  lastLogIn,
  name,
  email,

  createdAt,
}: Props) => {
  const [updateRole, setUpdateRole] = useState(role);
  return (
    <Fragment>
      <td className="w-15">{name || <Skeleton width={50} height={12} />}</td>
      <td className="w-30">{email || <Skeleton width={50} height={12} />}</td>
      <td className="w-20">
        {name ? (
          <>
            {new Date(createdAt).toLocaleDateString()} -
            {new Date(createdAt).toLocaleTimeString()}
          </>
        ) : (
          <Skeleton width={100} height={12} />
        )}
      </td>
      <td className="w-25">
        <AnimatePresence mode="wait">
          {name ? (
            <>
              {lastLogIn ? (
                <FadeElement cls="" key={`order${lastLogIn}`}>
                  {new Date(lastLogIn).toLocaleDateString()} -
                  {new Date(lastLogIn).toLocaleTimeString()}
                </FadeElement>
              ) : (
                <FadeElement cls="" key={"underscore" + lastLogIn}>
                  &#95;
                </FadeElement>
              )}
            </>
          ) : (
            <Skeleton width={30} height={12} />
          )}
        </AnimatePresence>
      </td>
      <td
        className="order-state  w-10"
        style={{
          color: `var(--${role?.split(" ").slice(-1)})`,
        }}
      >
        {name ? (
          <div className="center state-par">
            <AnimatePresence mode="wait">
              <FadeElement cls="" key={role}>
                <div>{role}</div>
              </FadeElement>
            </AnimatePresence>
            <DashDropDown
              arr={["user", "admin", "owner", "moderator"]}
              _id={_id}
              setter={setUpdateRole}
              state={updateRole}
              type="user"
            />
          </div>
        ) : (
          <Skeleton width={60} height={12} />
        )}
      </td>
    </Fragment>
  );
};

export default Order;
