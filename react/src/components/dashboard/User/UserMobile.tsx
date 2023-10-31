import FadeElement from "../../widgets/animation/FadeElement";
import { AnimatePresence, motion } from "framer-motion";
import { UserInterface } from "@/interfaces/user.interface";
import Skeleton from "react-loading-skeleton";
import DashDropDown from "../DashDropDown";
import { useScrollDirection } from "use-scroll-direction";
import useUpdateUserRole from "@/custom/useUpdateUserRole";
import { Fragment } from "react";

const UserMobile = ({
  role,
  _id,
  lastLogIn,
  name,
  email,
  createdAt,
}: UserInterface) => {
  const { isScrollingDown } = useScrollDirection();
  const { handleUpdateUserRole } = useUpdateUserRole();
  const updateRole = (role: string) => {
    handleUpdateUserRole(_id, role);
  };
  return (
    <motion.div
      initial={{ y: isScrollingDown ? -40 : 40 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="dash-details-mobile   col gap"
    >
      {_id ? (
        <Fragment>
          <div className="mobile-title center between">
            <div className="details">
              <div className="detail">Name : </div>
              <p>{name}</p>
            </div>
            <div className="order-state-par center gap`">
              <AnimatePresence mode="wait">
                <FadeElement className="" key={role}>
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
                fn={updateRole}
                state={role}
                arr={["user", "admin", "owner", "moderator"]}
              />
            </div>
          </div>

          <div className="details">
            <div className="detail">Email :</div>
            <p>{email}</p>
          </div>

          <div className="details">
            <div className="detail">Created at : </div>
            <p>
              &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
              {new Date(createdAt).toLocaleTimeString()}
            </p>
          </div>

          <div className="details ">
            <div className="detail">last login : </div>
            <AnimatePresence mode="wait">
              <FadeElement className="" key={lastLogIn}>
                <p>
                  &#160;{" "}
                  {lastLogIn
                    ? `${new Date(lastLogIn).toLocaleDateString()} -
        ${new Date(lastLogIn).toLocaleTimeString()}`
                    : "_"}
                </p>
              </FadeElement>
            </AnimatePresence>
          </div>
        </Fragment>
      ) : (
        <Skeleton count={4} className="skelton" style={{ margin: "5px 0" }} />
      )}
    </motion.div>
  );
};

export default UserMobile;
