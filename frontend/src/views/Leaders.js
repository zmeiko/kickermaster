import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress
} from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import WeekPicker from "../components/WeekPicker";
import LeadersBar from "../components/LeadersBar";

const OF_ALL_TIME = 1;
const OF_THE_WEEK = 0;

const Leaders = observer(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTab: OF_THE_WEEK,
        isLoading: true
      };
    }

    async loadStatsIfNeeded(filter) {
      this.setState({ isLoading: true });
      try {
        await store.loadStats(filter);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    componentDidMount() {
      this.loadStatsIfNeeded(store.gamesWeekFilter);
    }

    updateLeadersList = date => {
      store.applyGamesWeekFilter(date.toString());
      this.loadStatsIfNeeded(store.gamesWeekFilter);
    };

    onSwitchTab = value => {
      this.setState({ currentTab: value });
      value === OF_ALL_TIME
        ? this.loadStatsIfNeeded()
        : this.loadStatsIfNeeded(store.gamesWeekFilter);
    };

    @observable sortingProperty = "rating";

    render() {
      if (this.state.isLoading) {
        const spinnerStyle = {
          marginTop: "15px",
          marginLeft: "auto",
          marginRight: "auto"
        };
        return <CircularProgress style={spinnerStyle} />;
      }
      return (
        <React.Fragment>
          <LeadersBar
            onChange={this.onSwitchTab}
            value={this.state.currentTab}
          />
          {this.state.currentTab === OF_THE_WEEK && (
            <WeekPicker
              value={store.gamesWeekFilter}
              onChange={this.updateLeadersList}
            />
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell />
                <TableCell style={{ width: "100%" }} />
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "games" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "games";
                    }}
                  >
                    Games
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "wins" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "wins";
                    }}
                  >
                    Wins
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "defeats" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "defeats";
                    }}
                  >
                    Defeats
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "goals" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "goals";
                    }}
                  >
                    Goals
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "goalsPerMatch"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "goalsPerMatch";
                    }}
                  >
                    <nobr>Goals per match</nobr>
                  </Button>
                </TableCell>
                <TableCell numeric>
                  <Button
                    color={
                      this.sortingProperty === "rating" ? "primary" : "default"
                    }
                    onClick={() => {
                      this.sortingProperty = "rating";
                    }}
                  >
                    Rating
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.usersStats
                .sort(
                  (a, b) => b[this.sortingProperty] - a[this.sortingProperty]
                )
                .map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <UserAvatar user={user} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "games" && 18
                      }}
                    >
                      {user.games}
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "wins" && 18
                      }}
                    >
                      {user.wins} ({user.winsPercent}%)
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "defeats" && 18
                      }}
                    >
                      {user.defeats} ({user.defeatsPercent}%)
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "goals" && 18
                      }}
                    >
                      {user.goals}
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "goalsPerMatch" && 18
                      }}
                    >
                      {user.goalsPerMatch}
                    </TableCell>
                    <TableCell
                      numeric
                      style={{
                        fontSize: this.sortingProperty === "rating" && 18
                      }}
                    >
                      {user.rating}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </React.Fragment>
      );
    }
  }
);

export default Leaders;
