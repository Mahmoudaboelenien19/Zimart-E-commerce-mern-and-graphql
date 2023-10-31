import UserMobile from "./UserMobile";
import { UserInterface } from "@/interfaces/user.interface";
import { useAppSelector } from "@/custom/reduxTypes";
const MobileDashUser = () => {
  const { user } = useAppSelector((st) => st.user);
  return (
    <div className="mobile-dashboard col gap">
      {user?.map((user: UserInterface, i: number) => {
        return <UserMobile {...user} key={i} />;
      })}
    </div>
  );
};

export default MobileDashUser;
