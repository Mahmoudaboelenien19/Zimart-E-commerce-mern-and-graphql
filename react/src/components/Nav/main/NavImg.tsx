import { useState } from "react";

import UserDropDown from "./userDropDown";
import ProfileImg from "@/components/user/ProfileImg";
import Title from "@/components/widgets/Title";

const NavImg = () => {
  const [showUserDrop, setShowUserDrop] = useState(false);
  const handleSHowUser = () => {
    setShowUserDrop(true);
  };

  return (
    <div
      onClick={handleSHowUser}
      className="relative "
      // style={{ display: "inline-block", height: "100%" }}
    >
      <Title
        title={!showUserDrop ? "go to your profile" : ""}
        className="user-profile"
      >
        <ProfileImg />
        <UserDropDown bool={showUserDrop} setter={setShowUserDrop} />
      </Title>
    </div>
  );
};

export default NavImg;
