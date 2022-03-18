import { Client } from "../models/_index.js";

export const getById = async (req, res) => {
  const { idClient: idClient } = req.query;
  const client = await Client.findById(idClient).populate(
    "userLogin",
    "-password"
  );
  res.json({
    status: 1,
    message: "Cliente encontrado",
    client: client,
  });
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.body.idClient);
    client.names = req.body.names;
    client.lastNames = req.body.lastNames;
    client.phone = req.body.phone;
    client.address = req.body.address;
    const updateClient = await client.save();
    res.json({
      status: 1,
      message: "Actualización exitosa",
      client: updateClient,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
