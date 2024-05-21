const cors = require("cors");
const express = require("express");
const app = express();
const debug = require("debug")("backend-ingsoftware:server");
const logger = require("morgan");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const userRouter = require("./controllers/users");
const indexRouter = require("./controllers/index");
const infoRouter = require("./controllers/info");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/info", infoRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.json({
    error: err.message,
  });
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
