import React from "react";
import { Grid } from "@material-ui/core";

// Images
import pokedex from "../../../../assets/img/pokedexLoading.gif";

export default function LoadingComponent() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "70vh" }}
    >
      <img
        alt="loading"
        src={pokedex}
        style={{ width: 240, height: 180 }}
      ></img>
    </Grid>
  );
}
