const Sequelize = require("sequelize");
const { NODE_ENV, DATABASE_URL } = require("./config");

const options =
  NODE_ENV === "production"
    ? {
        dialect: "postgres",
        keepAlive: true,
      }
    : {
        dialect: "mariadb",
        keepAlive: true,
      };

const sequelize = new Sequelize(DATABASE_URL, options);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed");
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDatabase, sequelize };
