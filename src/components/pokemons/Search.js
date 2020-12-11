import React, { useEffect, useRef, useState } from "react";

// Material UI
import { Grid } from "@material-ui/core";
import CustomTextField from "../CustomTextField/CustomTextField";
import { FastField, Formik } from "formik";

// Apollo
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_POKEMON = gql`
  query GetPokemon($search: String!) {
    pokemon(name: $search) {
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

export default function Search({ setPokemons, allPokemons }) {
  const formikRef = useRef();
  const [search, setSearch] = useState("");
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
    if (!loading) {
      if (search) {
        setPokemons(data.pokemon ? [{ ...data.pokemon }] : null);
      } else {
        setPokemons(allPokemons);
      }
    }
  }, [data, loading, search, setPokemons]);

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
            placeholder="Buscar"
            innerRef={formikRef}
            onChangeValue={onChange}
            style={{ color: "red !important" }}
            component={CustomTextField}
          />
        )}
      </Formik>
    </Grid>
  );
}
