import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  FormControlLabel,
  Switch,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { store } from "../../../store/index";
import WeekPicker from "../../../components/WeekPicker/WeekPicker";
import LeadersBar from "../../../components/LeadersBar/LeadersBar";
import UserLeaderRow from "relay/components/UserLeaderRow";
import LeadersHeaderRow from "components/LeadersHeaderRow";

const OF_ALL_TIME = 1;
const OF_THE_WEEK = 0;

@observer
class Leaders extends Component {
  @observable sortingProperty = "rating";

  constructor(props) {
    super(props);
    this.state = {
      currentTab: OF_ALL_TIME,
      position: false,
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

  onSwitchPosition = e => {
    this.setState({ position: e.target.checked });
  };

  onChangeSortProperty = property => {
    this.sortingProperty = property;
  };

  renderStats(games) {
    return (
      <Table>
        <TableHead>
          <LeadersHeaderRow
            onSortByProperty={this.onChangeSortProperty}
            sortingProperty={this.sortingProperty}
          />
        </TableHead>
        <TableBody>
          {games
            .filter(user => !!user.games)
            .sort((a, b) => b[this.sortingProperty] - a[this.sortingProperty])
            .map((user, index) => (
              <UserLeaderRow
                sortingProperty={this.sortingProperty}
                user={user}
                nuber={index + 1}
              />
            ))}
        </TableBody>
      </Table>
    );
  }

  renderStatsByPosition() {
    return (
      <React.Fragment>
        <div style={{ padding: "20px 0" }}>
          <Typography
            variant="title"
            style={{ paddingBottom: "20px", textAlign: "center" }}
          >
            Forwards
          </Typography>
          {this.renderStats(store.usersStats.forwards)}
        </div>
        <div style={{ padding: "20px 0" }}>
          <Typography
            variant="title"
            style={{ paddingBottom: "20px", textAlign: "center" }}
          >
            Defenders
          </Typography>
          {this.renderStats(store.usersStats.defenders)}
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }
    return (
      <React.Fragment>
        <LeadersBar onChange={this.onSwitchTab} value={this.state.currentTab} />
        {this.state.currentTab === OF_THE_WEEK && (
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateLeadersList}
          />
        )}
        {!store.usersStats.all.length &&
        this.state.currentTab === OF_THE_WEEK ? (
          <Typography
            variant="subheading"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            There were no games on this week yet
          </Typography>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <FormControl style={{ padding: "10px 20px" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.position}
                    onChange={this.onSwitchPosition}
                    color="primary"
                  />
                }
                label="by position"
              />
            </FormControl>
            {this.state.position
              ? this.renderStatsByPosition()
              : this.renderStats(store.usersStats.all)}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Leaders;
