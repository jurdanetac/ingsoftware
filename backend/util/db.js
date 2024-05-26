const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const { NODE_ENV, DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const options =
  NODE_ENV === "production"
    ? {
        dialect: "postgres",
      }
    : {
        dialect: "mariadb",
      };

if (NODE_ENV === "production") {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
    multipleStatements: true,
  };
}

const sequelize = new Sequelize(DATABASE_URL, options);

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();

  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    // create db if not exists
    if (NODE_ENV === "development") {
      const connection = await mysql.createConnection(
        DATABASE_URL.replace("camicandy", ""),
      );
      await connection.query("CREATE DATABASE IF NOT EXISTS camicandy;");
      await connection.end();
    }

    // connect to server
    await sequelize.authenticate();
    // sync models with database
    await runMigrations();

    console.log("database connected");
    // TODO: populate tables with dummy data if on development
  } catch (err) {
    console.log(err);
    console.log("connecting database failed");
    return process.exit(1);
  }
  return null;
};

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }
