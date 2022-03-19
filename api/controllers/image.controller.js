
import { streamUpload } from "../utils/imageUploader.js";

export const uploadBoxImage = async (req, res) => {
  try {
    const result = await streamUpload(req);
    res.json({ status: 1, message: "Imagen guardada", result: result });
  } catch(e) {
    console.log(e);
    res.json({ status: -1, message: "Error al guardar imagen" });
  }
};
