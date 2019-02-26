import React from "react";
import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import { store } from "../../store/tournamentStore";
import Standings from "./Standings";
import Games from "./Games";

@withRouter
@observer
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadTournament();
  }

  @observable tournament = null;

  get tournamentId() {
    return this.props.match.params.id;
  }

  async loadTournament() {
    try {
      this.setState({ isLoading: true });
      this.tournament = await store.getTournament(this.tournamentId);
      await Promise.all([
        this.tournament.loadGamesResults(),
        this.tournament.loadStats()
      ]);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }

    return (
      <React.Fragment>
        <Games tournament={this.tournament} />
        <Standings tournament={this.tournament} />
      </React.Fragment>
    );
  }
}

export default Tournament;
