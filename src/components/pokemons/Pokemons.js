import React, { useEffect, useState } from "react";

// Apollo
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

// Material UI
import { Grid } from "@material-ui/core";

// Custom Components
import PokemonItem from "./pokemonItem/PokemonItem";

// Images
import background from "../../assets/img/background.jpeg";
import Search from "./Search";

const GET_POKEMONS = gql`
  {
    pokemons(first: 151) {
      id
      name
      image
      types
    }
  }
`;

export const GET_POKEMONS_CLIENT = gql`
  query {
    state @client {
      allPokemons
      fetch {
        pokemons
      }
    }
  }
`;

const MUTATION_FETCH_POKEMONS = gql`
  mutation($pokemons: PokemonInput!) {
    fetchPokemons(pokemons: $pokemons) @client
  }
`;

const MUTATION_FETCH_ALL_POKEMONS = gql`
  mutation($pokemons: PokemonInput!) {
    fetchAllPokemons(pokemons: $pokemons) @client
  }
`;

// render all items available in our demo store
export function Pokemons() {
  const { data, loading, error } = useQuery(GET_POKEMONS);
  const [fetchPokemons] = useMutation(MUTATION_FETCH_POKEMONS);
  const [fetchAllPokemons] = useMutation(MUTATION_FETCH_ALL_POKEMONS);
  const { data: dataCliente } = useQuery(GET_POKEMONS_CLIENT);
  const { pokemons } = dataCliente.state.fetch;
  const { allPokemons } = dataCliente.state;

  useEffect(() => {
    if (!loading && !error && allPokemons.length === 0) {
      fetchPokemons({ variables: { pokemons: data.pokemons } });
      fetchAllPokemons({ variables: { pokemons: data.pokemons } });
    }
  }, [
    data,
    loading,
    error,
    fetchPokemons,
    fetchAllPokemons,
    pokemons,
    allPokemons,
  ]);

  return (
    <Grid
      container
      justify="center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Search allPokemons={allPokemons} />
      <Grid
        container
        style={{ minHeight: "calc(100vh - 120px)", margin: "48px 0px" }}
      >
        {pokemons?.length > 0 &&
          pokemons?.map((item) => <PokemonItem key={item.id} {...item} />)}
      </Grid>
    </Grid>
  );
}
