const router = require("express").Router();
const { Client } = require("../models");

/* GET clients listing. */
router.get("/", async (req, res) => {
  const clients = await Client.findAll();

  res.json(clients);
});

router.post("/", async (req, res) => {
  const client = await Client.create(req.body);

  res.json(client);
});

module.exports = router;
