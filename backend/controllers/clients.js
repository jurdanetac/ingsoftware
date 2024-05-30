const router = require("express").Router();
const { Client } = require("../models");

/* GET clients listing. */
router.get("/", async (req, res) => {
  const clients = await Client.findAll();

  res.json(clients);
});

module.exports = router;
