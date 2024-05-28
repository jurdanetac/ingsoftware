const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const { User } = require("../models/");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ where: { cedula: username } });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.hashDeContrasena);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.cedula,
    id: user.id,
  };

  console.log(userForToken);

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.cedula, name: user.nombre });
});

module.exports = loginRouter;
