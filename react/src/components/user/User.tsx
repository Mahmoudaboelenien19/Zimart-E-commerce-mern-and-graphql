import React from "react";
import UserDetails from "./UserDetails";
import UserImage from "./UserImage";

export const Component = () => {
  return (
    <div className="user-page">
      <UserImage />
      <UserDetails />
    </div>
  );
};
