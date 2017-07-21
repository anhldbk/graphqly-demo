import hapi from "hapi";
import { graphqlHapi, graphiqlHapi } from "graphql-server-hapi";
import { GraphQLSchema } from "graphql";
import { schema } from "./graphqlize";
import Good from "good";
import config from "./config";

const server = new hapi.Server();
server.connection({ host: "localhost", port: config.API_PORT });

// register plugins to server instance
server.register({
  register: graphqlHapi,
  options: {
    path: config.GRAPHQL_ENDPOINT,
    graphqlOptions: () => ({ pretty: true, schema }),
    route: {
      cors: true
    }
  }
});

server.register({
  register: graphiqlHapi,
  options: {
    path: config.GRAPHIQL_ENDPOINT,
    graphiqlOptions: {
      endpointURL: config.GRAPHQL_ENDPOINT
    }
  }
});

server.register(
  {
    register: Good,
    options: {
      reporters: {
        console: [
          {
            module: "good-squeeze",
            name: "Squeeze",
            args: [
              {
                response: "*",
                log: "*"
              }
            ]
          },
          {
            module: "good-console"
          },
          "stdout"
        ]
      }
    }
  },
  err => {
    if (err) {
      throw err; // something bad happened loading the plugin
    }

    server.start(err => {
      if (err) {
        throw err;
      }
      server.log("info", "Server running at: " + server.info.uri);
    });
  }
);
