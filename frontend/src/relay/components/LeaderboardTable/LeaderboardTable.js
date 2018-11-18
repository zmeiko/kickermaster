import React, { Component } from "react";
import { Table, TableBody, TableHead } from "@material-ui/core";
import LeadersHeaderRow from "components/LeadersHeaderRow/LeadersHeaderRow";
import { createFragmentContainer, graphql } from "react-relay";
import LeaderboardRow from "relay/components/LeaderboardRow";

class LeaderboardTable extends Component {
  state = {
    sortingProperty: "rating"
  };

  onChangeSortProperty = property => {
    this.setState({
      sortingProperty: property
    });
  };

  render() {
    const { users } = this.props;
    const { sortingProperty } = this.state;
    return (
      <Table>
        <TableHead>
          <LeadersHeaderRow
            onSortByProperty={this.onChangeSortProperty}
            sortingProperty={sortingProperty}
          />
        </TableHead>
        <TableBody>
          {users.edges.map((edge, index) => (
            <LeaderboardRow
              key={index}
              sortingProperty={sortingProperty}
              user={edge.node}
              nuber={index + 1}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default createFragmentContainer(LeaderboardTable, {
  users: graphql`
    fragment LeaderboardTable_users on UserTypeConnection {
      edges {
        node {
          ...LeaderboardRow_user
        }
      }
    }
  `
});
