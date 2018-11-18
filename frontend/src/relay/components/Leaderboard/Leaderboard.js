import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { store } from "../../../store/index";
import WeekPicker from "../../../components/WeekPicker/WeekPicker";
import LeadersBar from "../../../components/LeadersBar/LeadersBar";
import LeaderboardTable from "relay/components/LeaderboardTable";
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay";

const OF_ALL_TIME = 1;
const OF_THE_WEEK = 0;

@observer
class Leaderboard extends Component {
  @observable sortingProperty = "rating";
  @observable currentTab = OF_ALL_TIME;

  updateLeadersList = date => {};

  onSwitchTab = value => {
    this.currentTab = value;
  };

  render() {
    return (
      <React.Fragment>
        <LeadersBar onChange={this.onSwitchTab} value={this.currentTab} />
        {this.currentTab === OF_THE_WEEK && (
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateLeadersList}
          />
        )}
        {this.props.viewer.users ? (
          <div style={{ overflowX: "auto" }}>
            <LeaderboardTable users={this.props.viewer.users} />
          </div>
        ) : (
          <Typography
            variant="subheading"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            There were no games on the week
          </Typography>
        )}
      </React.Fragment>
    );
  }
}

export default createFragmentContainer(Leaderboard, {
  viewer: graphql`
    fragment Leaderboard_viewer on Viewer {
      users {
        ...LeaderboardTable_users
      }
    }
  `
});
