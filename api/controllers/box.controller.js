import { Box, Product, Client } from "../models/_index.js";

export const createStandardBox = async (req, res) => {
  try {
    let price = 0;
    let products = [];
    const boxDto = req.body;
    for (let i = 0; i < boxDto.idProducts.length; i++) {
      const product = await Product.findById(boxDto.idProducts[i]);
      products.push(product);
      price += product.price;
    }

    const box = new Box({
      name: boxDto.name,
      isCustom: false,
      price: price.toFixed(2),
      products: products,
    });
    const newBox = await box.save();
    res.json({
      status: 1,
      message: "Creación exitosa",
      box: newBox,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const createCustomBox = async (req, res) => {
  try {
    let price = 0;
    let products = [];
    const boxDto = req.body;
    for (let i = 0; i < boxDto.idProducts.length; i++) {
      const product = await Product.findById(boxDto.idProducts[i]);
      products.push(product);
      price += product.price;
    }

    const box = new Box({
      name: boxDto.name,
      isCustom: true,
      price: price.toFixed(2),
      products: products,
    });
    const newBox = await box.save();
    let client = await Client.findById(boxDto.idClient).populate("boxes");
    client.boxes.push(newBox._id);
    const updateClient = await client.save();

    res.json({
      status: 1,
      message: "Creación exitosa",
      box: newBox,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const updateBox = async (req, res) => {
  try {
    let price = 0;
    let products = [];
    const boxDto = req.body;
    for (let i = 0; i < boxDto.idProducts.length; i++) {
      const product = await Product.findById(boxDto.idProducts[i]);
      products.push(product);
      price += product.price;
    }
    let box = await Box.findById(boxDto.idBox);
    box.price = price.toFixed(2);
    box.name = boxDto.name;
    box.products = products;
    const updateBox = await box.save();

    res.json({
      status: 1,
      message: "Actualización exitosa",
      box: updateBox,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getById = async (req, res) => {
  const { idBox: idBox } = req.query;
  const box = await Box.findById(idBox).populate("products");
  res.json({
    status: 1,
    message: "Box encontrado",
    box: box,
  });
};

export const getStandardBoxes = async (req, res) => {
  const boxes = await Box.find({ isCustom: false });
  res.json({
    status: 1,
    message: "Boxes encontrados",
    boxes: boxes,
  });
};

export const getStandardBoxesByName = async (req, res) => {
  const { name: name } = req.query;
  const boxes = await Box.find({ isCustom: false, name: { $regex: name } });
  res.json({
    status: 1,
    message: "Boxes encontrados",
    boxes: boxes,
  });
};

export const getStandardBoxesByNameAndMinPriceAndMaxPrice = async (
  req,
  res
) => {
  const { name: name, minPrice: minPrice, maxPrice: maxPrice } = req.query;
  const boxes = await Box.find({
    isCustom: false,
    name: { $regex: name },
    price: { $gt: minPrice, $lt: maxPrice },
  });
  res.json({
    status: 1,
    message: "Boxes encontrados",
    boxes: boxes,
  });
};

export const getStandardBoxesByMinPriceAndMaxPrice = async (req, res) => {
  const { minPrice: minPrice, maxPrice: maxPrice } = req.query;
  const boxes = await Box.find({
    isCustom: false,
    price: { $gt: minPrice, $lt: maxPrice },
  });
  res.json({
    status: 1,
    message: "Boxes encontrados",
    boxes: boxes,
  });
};

export const getCustomBoxes = async (req, res) => {
  const { idClient: idClient } = req.query;
  const client = await Client.findById(idClient).populate("boxes");
  res.json({
    status: 1,
    message: "Boxes encontrados",
    boxes: client.boxes,
  });
};

export const getCustomBoxesByName = async (req, res) => {
  const { idClient: idClient, name: name } = req.query;
  const client = await Client.findById(idClient).populate("boxes");
  const boxes = [];
  const regexName = new RegExp(name);
  client.boxes.forEach((box) => {
    if (box.name.match(regexName)) {
      boxes.push(box);
    }
  });

  res.json({
    status: 1,
    message: "Boxes encontrados",
    boxes: boxes,
  });
};
