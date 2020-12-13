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
  },
};
