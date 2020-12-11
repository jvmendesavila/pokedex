import React from "react";

// Material UI
import { Grid, Typography } from "@material-ui/core";
import { typeColor } from "../../../../shared/util";

// Style
import style from "./style";

export default function AttackList({ attackList }) {
  const classes = style();
  return (
    <>
      {/* Special Attacks */}
      <Grid container style={{ marginBottom: 64 }}>
        {/* Title */}
        <Grid container>
          <Typography
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 32,
            }}
          >
            Special Attacks
          </Typography>
        </Grid>

        <Grid container>
          {attackList.map((attack) => (
            <Grid container style={{ margin: "12px 0px" }}>
              <Grid container justify="center" alignItems="center">
                {/* Attack Name */}
                <Typography
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {attack.name}
                </Typography>
                {/* Attack Type */}
                <Grid
                  item
                  style={{
                    backgroundColor: typeColor(attack.type),
                    marginLeft: 12,
                    borderRadius: 24,
                    width: 120,
                    padding: 4,
                  }}
                >
                  <Typography style={{ color: "white", textAlign: "center" }}>
                    {attack.type}
                  </Typography>
                </Grid>
              </Grid>
              {/* Damage */}
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                style={{ marginTop: 12 }}
              >
                <Typography style={{ color: "white", marginRight: 16 }}>
                  Damage
                </Typography>
                <Grid
                  container
                  style={{
                    backgroundColor: "gray",
                    borderRadius: 32,
                  }}
                >
                  <Grid
                    container
                    justify="flex-end"
                    style={{
                      padding: "4px",
                      paddingLeft: 52,
                      borderRadius: 32,
                      backgroundColor: "#ff5252",
                      maxWidth: `${(attack.damage / 120) * 100}%`,
                    }}
                  >
                    <Typography style={{ color: "white" }}>
                      {`${attack.damage}/120`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
