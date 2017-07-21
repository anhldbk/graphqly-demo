import { SubscriptionServer } from "subscriptions-transport-ws";
import { SubscriptionManager } from "graphql-subscriptions";
import { schema, pubsub } from "./graphqlize";
import config from "./config";

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub
});

export default {
  activate: function(hapiServer) {
    const subscriptionServer = SubscriptionServer.create(
      {
        schema,
        subscriptionManager
      },
      {
        server: hapiServer.listener,
        path: config.GRAPHQL_ENDPOINT
      }
    );
  }
};
