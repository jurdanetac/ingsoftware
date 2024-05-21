const router = require("express").Router();
const User = require("../models/User");

/* GET users listing. */
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // find user
  const user = await User.findOne({ where: { cedula: username } });

  res.json(user);
});

module.exports = router;
