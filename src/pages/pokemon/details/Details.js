import React, { useEffect, useState } from "react";

// Apollo
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// Material UI
import { Button, Grid, Typography } from "@material-ui/core";
import LoadingComponent from "./loading/LoadingComponent";
import { typeColor } from "../../../shared/util";
import EditIcon from "@material-ui/icons/Edit";

// Style
import style from "./style";
import AttackList from "./attackList/AttackList";
import useMedia from "use-media";
import { FastField, Formik } from "formik";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";

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
  const [edit, setEdit] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  console.log("aqui");
  const mdScreen = useMedia({ minWidth: 960 });

  //  GET POKEMON
  const { data, loading } = useQuery(GET_POKEMON, {
    variables: { name: match?.params?.pokemon },
  });
  const [initialValues, setInitialValues] = useState({
    name: data?.pokemon?.name,
  });

  useEffect(() => {
    if (!loading) {
      setPokemon(data.pokemon);
      setInitialValues(data.pokemon);
    }
  }, [loading, data]);

  const onSave = (formik) => {
    console.log(formik);
    // setPokemon((pokemon) => {...pokemon, });
    setEdit((oldState) => !oldState);
  };

  return (
    <Grid container style={{ padding: 12 }} justify="center">
      {loading ? (
        <LoadingComponent />
      ) : (
        pokemon && (
          <Formik initialValues={initialValues}>
            {(formik) => (
              <Grid
                container
                justify="center"
                wrap={mdScreen ? "nowrap" : "wrap"}
                style={{ maxWidth: 960, marginTop: 64 }}
              >
                {/* Pokemon Image */}
                <Grid item>
                  <Grid container style={{ padding: 12 }} justify="flex-end">
                    {edit ? (
                      <Grid container wrap="nowrap" spacing={2}>
                        <Grid item style={{ width: "100%" }}>
                          <Button
                            fullWidth
                            size="medium"
                            style={{ backgroundColor: "gray" }}
                            onClick={() => setEdit((oldState) => !oldState)}
                          >
                            <Typography style={{ color: "white" }}>
                              Cancelar
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item style={{ width: "100%" }}>
                          <Button
                            fullWidth
                            size="medium"
                            style={{ backgroundColor: "#69a95b" }}
                            onClick={onSave(formik)}
                          >
                            <Typography style={{ color: "white" }}>
                              Salvar
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Button
                        size="medium"
                        onClick={() => setEdit((oldState) => !oldState)}
                      >
                        <EditIcon style={{ color: "white" }} />
                      </Button>
                    )}
                  </Grid>
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
                </Grid>

                {/* Descriptions */}
                <Grid container direction="column" style={{ marginLeft: 32 }}>
                  {/* Name */}
                  <Grid container justify="center">
                    {edit ? (
                      <Grid
                        container
                        style={{
                          padding: "6px 24px",
                          backgroundColor: "white",
                          borderRadius: 32,
                        }}
                      >
                        <FastField
                          shrink
                          fullWidth
                          name={"name"}
                          label="Pokémon Name"
                          style={{ color: "red !important" }}
                          component={CustomTextField}
                        />
                      </Grid>
                    ) : (
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
                    )}
                  </Grid>

                  {/* Types */}
                  <Grid container justify="space-around">
                    {pokemon.types.map((type, i) => (
                      <Grid
                        key={i}
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
            )}
          </Formik>
        )
      )}
    </Grid>
  );
}
