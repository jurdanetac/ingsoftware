const router = require("express").Router();
const { Supplier } = require("../models");

/* GET clients listing. */
router.get("/", async (req, res) => {
  const suppliers = await Supplier.findAll();

  res.json(suppliers);
});

module.exports = router;
