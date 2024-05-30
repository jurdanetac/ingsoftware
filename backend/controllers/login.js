const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const { User, Session } = require("../models/");

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
    // expiresIn: 1 * 1, // test for expired token
  });

  // save session in database log (table `sesiones`)
  await Session.create({
    token: token,
    usuariosId: user.id,
    validoHasta: new Date(Date.now() + 60 * 60 * 1000),
  });

  response
    .status(200)
    .send({ token, username: user.cedula, name: user.nombre, rol: user.rol });
});

module.exports = loginRouter;
