// config.js
const BASE_PORT = process.env.PORT || 3000;
const BASE_HOST = `localhost`;
const API_PORT = process.env.API_PORT | 8080;
const API_HOST = `localhost`;

const GRAPHQL_ENDPOINT = "/api/graphql";
const GRAPHIQL_ENDPOINT = "/api/graphiql";
const FACEBOOK_AUTH_ENDPOINT = "/api/auth/facebook";

const API_ENDPOINT = `http://${API_HOST}:${API_PORT}${GRAPHQL_ENDPOINT}`;
const WS_ENDPOINT = `ws://${API_HOST}:${API_PORT}${GRAPHQL_ENDPOINT}`;

module.exports = {
  BASE_PORT,
  BASE_HOST,
  API_PORT,
  API_HOST,
  API_ENDPOINT,
  WS_ENDPOINT,

  GRAPHQL_ENDPOINT,
  GRAPHIQL_ENDPOINT,
  FACEBOOK_AUTH_ENDPOINT
};
