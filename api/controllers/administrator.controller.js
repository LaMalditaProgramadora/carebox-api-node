import { Administrator } from "../models/_index.js";

export const updateAdministrator = async (req, res) => {
  try {
    let administrator = await Administrator.findById(
      req.body.idAdministrator
    );
    administrator.names = req.body.names;
    administrator.lastNames = req.body.lastNames;
    administrator.phone = req.body.phone;
    const updateAdministrator = await administrator.save();
    res.json({
      status: 1,
      message: "Actualización exitosa",
      adminsitrator: updateAdministrator,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
