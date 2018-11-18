import React, { Component } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import UserAvatar from "components/UserAvatar";
import { createFragmentContainer, graphql } from "react-relay";

const PRIMARY_FONT_SIZE = 18;

class LeaderboardRow extends Component {
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
    const { statistic } = user;
    return (
      <TableRow key={user.id}>
        <TableCell>{number}</TableCell>
        <TableCell>
          <UserAvatar user={user} />
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell numeric style={this.getStyleForCell("games")}>
          {statistic.games}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("wins")}>
          {statistic.wins} ({statistic.winsPercent}%)
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("defeats")}>
          {statistic.defeats} ({statistic.defeatsPercent}%)
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("goals")}>
          {statistic.goals}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("goalsPerMatch")}>
          {statistic.goalsPerMatch}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("keep")}>
          {statistic.keep}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("keepPerMatch")}>
          {statistic.keepPerMatch}
        </TableCell>
        <TableCell numeric style={this.getStyleForCell("rating")}>
          {statistic.rating || 0}
        </TableCell>
      </TableRow>
    );
  }
}

export default createFragmentContainer(LeaderboardRow, {
  user: graphql`
    fragment LeaderboardRow_user on User {
      id
      name
      createdAt
      photoUrl
      statistic {
        games
        wins
        goals
        goalsPerMatch
        winsPercent
        defeats
        defeatsPercent
        keep
        keepPerMatch
        rating
      }
    }
  `
});
