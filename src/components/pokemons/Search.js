import React, { useEffect, useState } from "react";

// Material UI
import { Grid } from "@material-ui/core";
import CustomTextField from "../CustomTextField/CustomTextField";
import { FastField, Formik } from "formik";

// Apollo
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

const GET_POKEMON = gql`
  query GetPokemon($search: String!) {
    pokemon(name: $search) {
      id
      name
      image
      types
    }
  }
`;

const MUTATION_FETCH_POKEMONS = gql`
  mutation($pokemons: PokemonInput!) {
    fetchPokemons(pokemons: $pokemons) @client
  }
`;

export default function Search({ allPokemons }) {
  const [search, setSearch] = useState("");
  const [fetchPokemons] = useMutation(MUTATION_FETCH_POKEMONS);
  const initialValues = {
    search: "",
  };

  const onChange = ({ values }) => {
    setSearch(values.search);
  };

  //  GET POKEMON
  const { data, loading } = useQuery(GET_POKEMON, {
    variables: { search: search },
  });

  useEffect(() => {
    let findCliente = null;
    if (!loading && allPokemons.length > 0) {
      findCliente = allPokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      if (search) {
        fetchPokemons({
          variables: {
            pokemons: findCliente
              ? [...findCliente]
              : data.pokemon
              ? [{ ...data.pokemon }]
              : [],
          },
        });
      } else {
        fetchPokemons({ variables: { pokemons: allPokemons } });
      }
    }
  }, [data, loading, search, allPokemons, fetchPokemons]);

  return (
    <Grid
      container
      style={{
        padding: 12,
        backgroundColor: "white",
        position: "sticky",
        top: 48,
      }}
    >
      <Formik initialValues={initialValues}>
        {(formik) => (
          <FastField
            shrink
            fullWidth
            name={"search"}
            label="Pokémon"
            placeholder="Buscar pelo nome..."
            onChangeValue={onChange}
            style={{ color: "red !important" }}
            component={CustomTextField}
          />
        )}
      </Formik>
    </Grid>
  );
}
