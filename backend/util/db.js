const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const { NODE_ENV, DATABASE_URL } = require("./config");

const options =
  NODE_ENV === "production"
    ? {
        dialect: "postgres",
        keepAlive: true,
      }
    : {
        dialect: "mariadb",
      };

const sequelize = new Sequelize(DATABASE_URL, options);

const connectToDatabase = async () => {
  try {
    // create db if not exists
    if (NODE_ENV === "development") {
      console.log("populating database with default data");
      const connection = await mysql.createConnection(
        DATABASE_URL.replace("camicandy", ""),
      );
      await connection.query("CREATE DATABASE IF NOT EXISTS camicandy;");
      await connection.end();
    }

    // connect to server
    await sequelize.authenticate();
    console.log("database connected");
  } catch (err) {
    console.log(err);
    console.log("connecting database failed");
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDatabase, sequelize };
