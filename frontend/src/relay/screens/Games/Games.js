import GamesList from "relay/components/GameList/GameList";
import React from "react";
import { graphql, QueryRenderer } from "react-relay";

import environment from "relay/environment";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export default class Games extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query GamesQuery {
            viewer {
              ...GameList_viewer
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
          return <GamesList viewer={props.viewer} />;
        }}
      />
    );
  }
}
