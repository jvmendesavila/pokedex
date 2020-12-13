import React, { useState, useEffect } from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { persistCache } from "apollo-cache-persist";
//
import { resolvers } from "../resolvers/index";

const cache = new InMemoryCache({});

const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: cache,
  clientState: {
    defaults: {
      state: {
        allPokemons: [],
        fetch: {
          pokemons: [],
          __typename: "FetchPokemons",
        },
        custom: {
          pokemons: [],
          __typename: "CustomPokemons",
        },
        __typename: "State",
      },
    },
    resolvers: resolvers,
  },
});

async function setupPersistence() {
  try {
    await persistCache({
      cache: cache,
      storage: window.localStorage,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function Apollo({ children }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setupPersistence().finally(() => setHydrated(true));
  }, []);

  if (!hydrated) return <p>loading our persisted cache...</p>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
