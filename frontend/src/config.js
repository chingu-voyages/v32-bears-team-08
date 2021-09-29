const config =  {
  PORT: process.env.REACT_APP_PORT || 8000,
  API_ENDPOINT: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || "AUTH_TOKEN",
};

export default config
