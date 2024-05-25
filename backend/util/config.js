require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DEBUG: process.env.DEBUG,
  NODE_VERSION: process.env.NODE_VERSION,
};
