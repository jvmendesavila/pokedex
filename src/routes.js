import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

// PAGES
import Dashboard from "./pages/Dashboard";
import Details from "./pages/pokemon/details/Details";

export default function RouteConfig() {
  return (
    <Router>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Grid
          container
          justify="center"
          style={{
            color: "white",
            backgroundColor: "#ff5252",
            cursor: "pointer",
            position: "sticky",
            top: 0,
          }}
        >
          <Typography style={{ fontSize: 32, fontWeight: "bold" }}>
            Pokédex
          </Typography>
        </Grid>
      </Link>
      <Route exact path={"/"} component={Dashboard} />
      <Route exact path={"/pokemon/:pokemon"} component={Details} />
    </Router>
  );
}
