import React, { useEffect, useState } from "react";

// Apollo
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

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
import { GET_POKEMONS_CLIENT } from "../../../components/pokemons/Pokemons";

const GET_POKEMON = gql`
  query GetPokemon($id: String!) {
    pokemon(id: $id) {
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

const MUTATION_EDIT_POKEMONS = gql`
  mutation($pokemon: PokemonInput!) {
    editPokemon(pokemon: $pokemon) @client
  }
`;

export default function Details({ match }) {
  const classes = style();
  const [edit, setEdit] = useState(false);
  const [editPokemon] = useMutation(MUTATION_EDIT_POKEMONS);
  const [pokemon, setPokemon] = useState(null);
  const { data: dataCliente } = useQuery(GET_POKEMONS_CLIENT);
  const pokemons = dataCliente.state.fetch.pokemons;
  const mdScreen = useMedia({ minWidth: 960 });

  //  GET POKEMON
  const { data, loading } = useQuery(GET_POKEMON, {
    variables: { id: match?.params?.pokemon },
  });

  const [initialValues, setInitialValues] = useState({
    name: data?.pokemon?.name,
  });

  useEffect(() => {
    let findCliente = null;
    if (pokemons) {
      findCliente = pokemons.filter((p) => p.id === match?.params?.pokemon)[0];
    }
    if (!loading) {
      setPokemon({
        ...data.pokemon,
        name: findCliente ? findCliente.name : data.pokemon.name,
      });
      setInitialValues({
        ...data.pokemon,
        name: findCliente ? findCliente.name : data.pokemon.name,
      });
    }
  }, [loading, data, match.params.pokemon, pokemons]);

  const onSave = (formik) => {
    editPokemon({
      variables: {
        pokemon: {
          id: data.pokemon.id,
          name: formik.values.name,
          image: data.pokemon.image,
          types: data.pokemon.types,
          __typename: data.pokemon.__typename,
        },
      },
    });
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
                            onClick={() => onSave(formik)}
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
                        {formik.values.name}
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
