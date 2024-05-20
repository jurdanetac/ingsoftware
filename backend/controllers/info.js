const router = require("express").Router();
const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  DEBUG,
  NODE_VERSION,
} = require("../util/config");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({ NODE_VERSION, PORT, NODE_ENV, DEBUG, DATABASE_URL });
});

module.exports = router;
