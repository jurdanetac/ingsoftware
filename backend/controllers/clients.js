const router = require("express").Router();
const { Client } = require("../models");

/* GET clients listing. */
router.get("/", async (req, res) => {
  const clients = await Client.findAll();

  res.json(clients);
});

router.post("/", async (req, res) => {
  const {nombre, cedula, telefono, direccion} = req.body;

  const client = await Client.create({
    nombre,
    cedula,
    telefono,
    direccion
  });

  res.json(client);
});

router.put("/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);

  if (!client) {
    return res.status(404).json({ error: "Client not found" });
  }

  client.update(req.body);

  res.json(client);
});

router.delete("/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);

  if (!client) {
    return res.status(404).json({ error: "Client not found" });
  }

  await client.destroy();

  res.json({ message: "Client deleted" });
});

module.exports = router;
