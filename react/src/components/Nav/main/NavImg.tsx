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
    <>
      <span
        onClick={handleSHowUser}
        className="relative "
        // style={{ display: "inline-block", height: "100%" }}
      >
        <Title title={!showUserDrop ? "go to your profile" : ""}>
          <ProfileImg dimension={30} />
        </Title>

        <UserDropDown bool={showUserDrop} setter={setShowUserDrop} />
      </span>
    </>
  );
};

export default NavImg;
