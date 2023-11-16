import { User } from "@/types/user";
import UserMobile from "./UserMobile";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
const MobileDashUser = () => {
  const { user } = useAppSelector((st) => st.user);
  return (
    <div className="mobile-dashboard col gap">
      {user?.map((user: User, i: number) => {
        return <UserMobile {...user} key={i} />;
      })}
    </div>
  );
};

export default MobileDashUser;
