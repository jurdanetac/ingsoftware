const router = require("express").Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to the API" });
});

module.exports = router;
