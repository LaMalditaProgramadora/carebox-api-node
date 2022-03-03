import { UserLogin, Client, Administrator } from "../models/_index.js";

export const loginClient = async (req, res) => {
  const userLogin = await UserLogin.findOne({
    email: req.body.email,
  });
  let client = null;
  if (userLogin) {
    client = await Client.findOne({
      userLogin: userLogin._id,
    }).populate("userLogin");
    // TODO: Ocultar password
  }
  if (!client) {
    res.json({
      status: 0,
      message: "Correo electrónico incorrecto",
    });
  } else {
    if (userLogin.password === req.body.password) {
      res.json({
        status: 1,
        message: "Login exitoso",
        client: client,
      });
    } else {
      res.json({
        status: -1,
        message: "Contraseña incorrecta",
      });
    }
  }
};

export const loginAdministrator = async (req, res) => {
  const userLogin = await UserLogin.findOne({
    email: req.body.email,
  });
  let administrator = null;
  if (userLogin) {
    administrator = await Administrator.findOne({
      userLogin: userLogin._id,
    }).populate("userLogin");
    // TODO: Ocultar password
  }

  if (!administrator) {
    res.json({
      status: 0,
      message: "Correo electrónico incorrecto",
    });
  } else {
    if (userLogin.password === req.body.password) {
      res.json({
        status: 1,
        message: "Login exitoso",
        administrator: administrator,
      });
    } else {
      res.json({
        status: -1,
        message: "Contraseña incorrecta",
      });
    }
  }
};

export const registerAdministrator = async (req, res) => {
  const userLogin = new UserLogin({
    email: req.body.email,
    password: req.body.password,
  });
  const newUserLogin = await userLogin.save();

  const administrator = new Administrator({
    names: req.body.names,
    lastNames: req.body.lastNames,
    phone: req.body.phone,
    userLogin: newUserLogin._id,
  });
  const newAdministrator = await administrator.save();
  const administratorDto = await Administrator.findById(
    newAdministrator._id
  ).populate("userLogin");

  // TODO: Ocultar password (esto no funcionó)
  administratorDto.userLogin.password = "******";

  res.json({
    status: 1,
    message: "Registro exitoso",
    administrator: administratorDto,
  });
};

export const registerClient = async (req, res) => {
  const userLogin = new UserLogin({
    email: req.body.email,
    password: req.body.password,
  });
  const newUserLogin = await userLogin.save();

  const client = new Client({
    names: req.body.names,
    lastNames: req.body.lastNames,
    phone: req.body.phone,
    address: req.body.address,
    userLogin: newUserLogin._id,
  });
  const newClient = await client.save();
  const clientDto = await Client.findById(newClient._id).populate("userLogin");
  // TODO: Ocultar password (esto no funcionó)
  clientDto.userLogin.password = "******";

  res.json({
    status: 1,
    message: "Registro exitoso",
    client: clientDto,
  });
};
