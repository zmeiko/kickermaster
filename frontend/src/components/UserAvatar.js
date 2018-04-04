import React from "react";
import Avatar from "material-ui/Avatar";

const UserAvatar = ({ user, ...other }) => (
  user.photoUrl
    ? <Avatar src={user.photoUrl} {...other} />
    : <Avatar {...other}>{user.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</Avatar>
)

export default UserAvatar;
