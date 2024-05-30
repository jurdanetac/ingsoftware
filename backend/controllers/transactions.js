const router = require("express").Router();
const { Transaction } = require("../models/");

/* GET transactions. */
router.get("/", async (req, res, next) => {
  const data = await Transaction.findAll();

  res.json(data);
});

module.exports = router;
