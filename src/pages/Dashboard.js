import React from "react";
//
import { Pokemons } from "../components/pokemons/Pokemons";

// Material UI
import { Grid } from "@material-ui/core";

export default function Dashboard() {
  return (
    <Grid container>
      <Grid container wrap="nowrap">
        <Grid container>
          <Pokemons />
        </Grid>
      </Grid>
    </Grid>
  );
}
