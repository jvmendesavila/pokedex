import { GET_POKEMONS_CLIENT } from "../components/pokemons/Pokemons";

export const resolvers = {
  Mutation: {
    fetchPokemons: (_, { pokemons }, { cache }) => {
      cache.writeQuery({
        query: GET_POKEMONS_CLIENT,
        data: {
          state: {
            fetch: {
              pokemons: pokemons,
              __typename: "FetchPokemons",
            },
            __typename: "State",
          },
        },
      });

      return null;
    },
    fetchAllPokemons: (_, { pokemons }, { cache }) => {
      cache.writeQuery({
        query: GET_POKEMONS_CLIENT,
        data: {
          state: {
            allPokemons: pokemons,
            __typename: "State",
          },
        },
      });

      return null;
    },
    editPokemon: (_, { pokemon }, { cache }) => {
      const { state } = cache.readQuery({ query: GET_POKEMONS_CLIENT });
      const { allPokemons } = state;
      cache.writeQuery({
        query: GET_POKEMONS_CLIENT,
        data: {
          state: {
            allPokemons: [
              ...allPokemons.map((p) => (p.id === pokemon.id ? pokemon : p)),
            ],
            __typename: "State",
          },
        },
      });

      return null;
    },
  },
};
