export default {
  PORT: process.env.PORT || 8000,
  API_ENDPOINT: process.env.API_BASE_URL || "http://localhost:5000",
  TOKEN_KEY: process.env.TOKEN_KEY || "AUTH_TOKEN",
};
