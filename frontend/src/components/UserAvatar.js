import React from "react";
import "./UserAvatar.css";
import { withRouter } from "react-router-dom";

const UserAvatar = ({
  user,
  size = 60,
  className,
  history,
  staticContext,
  ...other
}) => {
  const handleClick = () => {
    history.push(`/user_page/?id=${user.id}`);
  };

  return user.photoUrl ? (
    <div
      className={`${className} UserAvatar`}
      onClick={handleClick}
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
      onClick={handleClick}
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
};

export default withRouter(UserAvatar);
