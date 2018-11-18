import React, { Component } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import UserAvatar from "components/UserAvatar";
import { createFragmentContainer, graphql } from "react-relay";

const PRIMARY_FONT_SIZE = 18;

class UserLeaderRow extends Component {
  isSortBy = type => {
    return this.props.sortingProperty === type;
  };

  getStyleForCell(type) {
    if (this.isSortBy(type)) {
      return {
        fontSize: PRIMARY_FONT_SIZE
      };
    }
  }

  render() {
    const { user, number } = this.props;
    return (
      <TableRow key={user.id}>
        <TableCell>{number}</TableCell>
        <TableCell>
          <UserAvatar user={user} />
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell numeric style={this.getStyleForCell("games")}>
          {user.games}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("wins")}>
          {user.wins} ({user.winsPercent}%)
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("defeats")}>
          {user.defeats} ({user.defeatsPercent}%)
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("goals")}>
          {user.goals}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("goalsPerMatch")}>
          {user.goalsPerMatch}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("keep")}>
          {user.keep}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("keepPerMatch")}>
          {user.keepPerMatch}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("rating")}>
          {user.rating || 0}
        </TableCell>
      </TableRow>
    );
  }
}

export default UserLeaderRow;
createFragmentContainer(UserLeaderRow, {
  user: graphql`
    fragment UserLeaderRow_user on User {
      id
      createdAt
    }
  `
});
