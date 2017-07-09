const BASE_PORT = process.env.PORT || 3000;
const API_PORT = process.env.API_PORT | 8080;
const API_HOST = `http://localhost:${API_PORT}`;
const API_ENDPOINT = `${API_HOST}/graphql`;

module.exports = {
  BASE_PORT,
  API_PORT,
  API_HOST,
  API_ENDPOINT
};
