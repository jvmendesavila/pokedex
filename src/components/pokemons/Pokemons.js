import React, { useEffect, useState } from "react";

// Apollo
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// Material UI
import { Grid } from "@material-ui/core";

// Custom Components
import PokemonItem from "./pokemonItem/PokemonItem";

// Images
import background from "../../assets/img/background.jpeg";
import CustomTextField from "../CustomTextField/CustomTextField";
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

// render all items available in our demo store
export function Pokemons() {
  const [pokemons, setPokemons] = useState(null);
  const [allPokemons, setAllPokemons] = useState(null);
  const { data, loading, error } = useQuery(GET_POKEMONS);

  useEffect(() => {
    if (!loading && !error) {
      setPokemons(data.pokemons);
      setAllPokemons(data.pokemons);
    }
  }, [data, loading, error]);

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
      <Search setPokemons={setPokemons} allPokemons={allPokemons} />
      <Grid
        container
        style={{ minHeight: "calc(100vh - 120px)", margin: "48px 0px" }}
      >
        {pokemons?.length > 0 &&
          pokemons.map((item) => <PokemonItem key={item.id} {...item} />)}
      </Grid>
    </Grid>
  );
}
