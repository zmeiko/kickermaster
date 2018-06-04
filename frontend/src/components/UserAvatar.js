import React from "react";
import "./UserAvatar.css";

const UserAvatar = ({ user, size = 60, className, ...other }) =>
  user.photoUrl ? (
    <div
      className={`${className} UserAvatar`}
      style={{
        backgroundImage: `url(${user.photoUrl})`,
        width: size,
        height: size
      }}
      {...other}
    />
  ) : (
    <div
      className={`${className} UserAvatar`}
      style={{ width: size, height: size }}
      {...other}
    >
      {user.name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")}
    </div>
  );

export default UserAvatar;
