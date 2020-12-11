import React, { useEffect, useState } from "react";

// Apollo
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// Material UI
import { Grid, Typography } from "@material-ui/core";
import LoadingComponent from "./loading/LoadingComponent";
import { typeColor } from "../../../shared/util";

// Style
import style from "./style";
import AttackList from "./attackList/AttackList";
import useMedia from "use-media";

const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      height {
        maximum
      }
      weight {
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`;

export default function Details({ match }) {
  const classes = style();
  const [pokemon, setPokemon] = useState(null);
  const mdScreen = useMedia({ minWidth: 960 });

  //  GET POKEMON
  const { data, loading } = useQuery(GET_POKEMON, {
    variables: { name: match?.params?.pokemon },
  });

  useEffect(() => {
    if (!loading) {
      setPokemon(data.pokemon);
    }
  }, [loading, data]);

  return (
    <Grid container style={{ padding: 12 }} justify="center">
      {loading ? (
        <LoadingComponent />
      ) : (
        pokemon && (
          <Grid
            container
            justify="center"
            wrap={mdScreen ? "nowrap" : "wrap"}
            style={{ maxWidth: 960, marginTop: 64 }}
          >
            {/* Pokemon Image */}
            <Grid
              item
              style={{
                padding: 46,
                backgroundColor: "white",
                borderRadius: "50%",
                display: "inline-table",
              }}
            >
              <img
                alt={pokemon.name}
                src={pokemon.image}
                style={{ width: 200, height: 200 }}
              />
            </Grid>

            {/* Descriptions */}
            <Grid container direction="column" style={{ marginLeft: 32 }}>
              {/* Name */}
              <Grid container justify="center">
                <Typography
                  style={{
                    color: "white",
                    fontSize: 48,
                    fontWeight: "bold",
                    marginBottom: 16,
                  }}
                >
                  {pokemon.name}
                </Typography>
              </Grid>

              {/* Types */}
              <Grid container justify="space-around">
                {pokemon.types.map((type) => (
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.typeContainer}
                    style={{
                      backgroundColor: typeColor(type),
                    }}
                  >
                    <Typography className={classes.typeLabel}>
                      {type}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {/* Height x Weight */}
              <Grid container wrap="nowrap" style={{ margin: "48px 0" }}>
                <Grid container>
                  <Grid container justify="center">
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 32,
                      }}
                    >
                      {pokemon.weight?.maximum.replace(/kg/i, " KG")}
                    </Typography>
                  </Grid>
                  <Grid container justify="center">
                    <Typography style={{ color: "white", fontSize: 18 }}>
                      Weight
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid container justify="center">
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 32,
                      }}
                    >
                      {pokemon.height?.maximum.replace(/m/i, " M")}
                    </Typography>
                  </Grid>
                  <Grid container justify="center">
                    <Typography style={{ color: "white", fontSize: 18 }}>
                      Height
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* Fast Attacks */}
              <AttackList attackList={pokemon.attacks.fast} />

              {/* Special Attacks */}
              <AttackList attackList={pokemon.attacks.special} />
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  );
}
