import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { typeColor } from "../../../shared/util";

// Style
import style from "./style";

// render an item with some styling
export default function PokemonItem({ image, name, types }) {
  const classes = style();
  return (
    <Grid item xl={2} lg={3} md={4} sm={6} xs={12} container justify="center">
      <Link to={`/pokemon/${name}`} style={{ textDecoration: "none" }}>
        <Grid
          container
          wrap="nowrap"
          direction="column"
          className={classes.container}
        >
          <Grid container justify="center" className={classes.nameContainer}>
            <Typography style={{ fontSize: 24 }}>{name}</Typography>
          </Grid>
          <Grid container justify="center">
            <img alt={name} src={image} style={{ width: 240, height: 240 }} />
          </Grid>
          <Grid container style={{ minHeight: 90 }} alignItems="center">
            {types.map((type) => (
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.typeContainer}
                style={{
                  backgroundColor: typeColor(type),
                }}
              >
                <Typography className={classes.typeLabel}>{type}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
}
