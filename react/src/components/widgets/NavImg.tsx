import React, { useState } from "react";
import Title from "./Title";
import UserDropDown from "./userDropDown";
import ProfileImg from "./ProfileImg";

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
