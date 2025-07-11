import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";
import JWTService from "../services/jwt";
import { schema } from "./graphql/schema";
import { getAllEmp } from "./controller/getAllEmployee";
import { createEmployee } from "./controller/createEmployee";

export async function initServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const graphqlServer = new ApolloServer({
    typeDefs: schema,

    resolvers: {
      Query: {
        Employee: getAllEmp,
      },
      Mutation: {
        createEmployee,
      },
    },
  });

  await graphqlServer.start();

  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
                req.headers.authorization.split("Bearer")[1],
              )
            : undefined,
        };
      },
    }),
  );
  return app;
}
