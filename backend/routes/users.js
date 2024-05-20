const router = require("express").Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.json({ message: "respond with a resource" });
});

module.exports = router;
