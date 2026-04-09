import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import fetch from "node-fetch";


const port = 3000;
const apiUrl = "http://localhost:3030";

const typeDefs = gql`

  extend type Price @key(fields: "referenceEntityId") {
    referenceEntityId: Int! @external
  }

  type Movie @key(fields: "id") {
    id: ID!
    name: String
    duration: Int
    genre: String
    views: Int
    priceDetails: Price
  }

  type Query {
    movies: [Movie]
  }
`;


const resolvers = {
    Query: {
        movies: async () => {
            const response = await fetch(`${apiUrl}/movies`);
            return response.json();
        },
    },
    Movie: {
        priceDetails: async (movie) => {
            return {
                __typename: "Price",
                referenceEntityId: Number(movie.id),
            }
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{
        typeDefs,
        resolvers,
    }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Movies Subgraph has successfully started and listening at ${url}`);
});