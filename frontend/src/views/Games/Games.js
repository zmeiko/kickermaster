import React, { Component } from "react";
import { observer } from "mobx-react";
import { CircularProgress, List, Typography } from "@material-ui/core";
import { store } from "../../store";
import WeekPicker from "../../components/WeekPicker";
import Games from "../../components/Games";

export default observer(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    async loadGamesIfNeeded(filter) {
      this.setState({ isLoading: true });
      try {
        await store.loadGames(filter);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    componentDidMount() {
      this.loadGamesIfNeeded(store.gamesWeekFilter);
    }

    updateGamesList = date => {
      store.applyGamesWeekFilter(date.toString());
      this.loadGamesIfNeeded(store.gamesWeekFilter);
    };

    render() {
      if (this.state.isLoading) {
        return <CircularProgress style={{ margin: "15px auto" }} />;
      }
      return (
        <React.Fragment>
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateGamesList}
          />
          <Games games={store.games} />
        </React.Fragment>
      );
    }
  }
);
