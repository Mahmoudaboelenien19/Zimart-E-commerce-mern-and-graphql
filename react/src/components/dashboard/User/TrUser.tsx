import { AnimatePresence } from "framer-motion";
import FadeElement from "../../widgets/animation/FadeElement";
import Skeleton from "react-loading-skeleton";
import DashDropDown from "../DashDropDown";
import useUpdateUserRole from "@/custom/dashboadrd/useUpdateUserRole";
import { User } from "@/types/user";
const ar = ["user", "admin", "owner", "moderator"];
type Props = {
  index: number;
} & User;
const Order = ({ role, _id, lastLogIn, name, email, createdAt }: Props) => {
  const { handleUpdateUserRole } = useUpdateUserRole();
  const updateRole = (st: string) => {
    handleUpdateUserRole(_id, st);
  };
  return (
    <tr>
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
      <td className="w-20">
        <AnimatePresence mode="wait">
          {name ? (
            <>
              {lastLogIn ? (
                <FadeElement className="" key={`order${lastLogIn}`}>
                  {new Date(lastLogIn).toLocaleDateString()} -
                  {new Date(lastLogIn).toLocaleTimeString()}
                </FadeElement>
              ) : (
                <FadeElement className="" key={"underscore" + lastLogIn}>
                  &#95;
                </FadeElement>
              )}
            </>
          ) : (
            <Skeleton width={30} height={12} />
          )}
        </AnimatePresence>
      </td>
      <td className="  w-15">
        {name ? (
          <div className="center user-table state-par">
            <AnimatePresence mode="wait">
              <FadeElement
                key={role}
                style={{
                  color: `var(--${role?.split(" ").slice(-1)})`,
                }}
              >
                {role}
              </FadeElement>
            </AnimatePresence>
            <DashDropDown arr={ar} state={role} fn={updateRole} />
          </div>
        ) : (
          <Skeleton width={60} height={12} />
        )}
      </td>
    </tr>
  );
};

export default Order;
