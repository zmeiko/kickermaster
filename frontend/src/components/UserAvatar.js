import React from "react";
import "./UserAvatar.css";
import { withRouter } from "react-router-dom";

class UserAvatar extends React.Component {
  handleClick = () => {
    const { history, user } = this.props;
    history.push(`/userpage/${user.id}`);
  };

  render() {
    const {
      user,
      size = 60,
      className,
      history,
      staticContext,
      ...other
    } = this.props;

    return user.photoUrl ? (
      <div
        className={`${className} UserAvatar`}
        onClick={this.handleClick}
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
        onClick={this.handleClick}
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
  }
}

export default withRouter(UserAvatar);
