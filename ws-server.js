import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { schema, pubsub } from "./graphqlize";
import config from "./config";

export default {
  activate: function(hapiServer) {
    const subscriptionServer = SubscriptionServer.create(
      {
        execute,
        subscribe,
        schema
      },
      {
        server: hapiServer.listener,
        path: config.GRAPHQL_ENDPOINT
      }
    );
  }
};
