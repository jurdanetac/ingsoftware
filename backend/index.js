const cors = require("cors");
const express = require("express");
const app = express();
const debug = require("debug")("backend-ingsoftware:server");
const logger = require("morgan");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const { errorHandler, unknownEndpoint } = require("./util/middleware");

const pingRouter = require("./controllers/ping");
const infoRouter = require("./controllers/info");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const indexRouter = require("./controllers/index");
const transactionRouter = require("./controllers/transactions");
const clientRouter = require("./controllers/clients");
const supplierRouter = require("./controllers/suppliers");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/ping", pingRouter);
app.use("/api/info", infoRouter);
app.use("/api/login", loginRouter);
app.use("/api/usuarios", userRouter);
app.use("/api/clientes", clientRouter);
app.use("/api/proveedores", supplierRouter);
app.use("/api/transacciones", transactionRouter);
app.use("/", indexRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
