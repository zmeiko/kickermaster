import React, { Component } from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../../environment";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Leaderboard from "relay/components/Leaderboard";

class Leaders extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query LeadersQuery {
            viewer {
              ...Leaderboard_viewer
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <CircularProgress style={{ margin: "15px auto" }} />;
          }
          return <Leaderboard viewer={props.viewer} />;
        }}
      />
    );
  }
}

export default Leaders;
