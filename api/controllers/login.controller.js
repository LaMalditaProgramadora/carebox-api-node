import { UserLogin, Client, Administrator } from "../models/_index.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.js";
import { sendMail } from "../utils/emailSender.js";
import { generateString } from "../utils/randomString.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const loginClient = async (req, res) => {
  const userLogin = await UserLogin.findOne({
    email: req.body.email,
  });
  let client = null;
  if (userLogin) {
    client = await Client.findOne({
      userLogin: userLogin._id,
    }).populate("userLogin", "-password");
  }
  if (!client) {
    res.json({
      status: 0,
      message: "Correo electrónico incorrecto",
    });
  } else {
    if (comparePassword(req.body.password, userLogin.password)) {
      jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 36000, _id: userLogin._id },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.json({
              status: 1,
              message: "Login exitoso",
              token: token,
              client: client,
            });
          } else {
            console.log(error);
            res.json({
              status: -1,
              message: "Error en el token",
            });
          }
        }
      );
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
    }).populate("userLogin", "-password");
  }

  if (!administrator) {
    res.json({
      status: 0,
      message: "Correo electrónico incorrecto",
    });
  } else {
    if (administrator.isActive === false) {
      res.json(createResponse(-1, "Administrador no activo", null));
    } else {
      if (comparePassword(req.body.password, userLogin.password)) {
        jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 36000, _id: userLogin._id },
          process.env.SECRET_KEY,
          (error, token) => {
            if (!error) {
              res.json({
                status: 1,
                message: "Login exitoso",
                token: token,
                administrator: administrator,
              });
            } else {
              console.log(error);
              res.json({
                status: -1,
                message: "Error en el token",
              });
            }
          }
        );
      } else {
        res.json({
          status: 0,
          message: "Contraseña incorrecta",
        });
      }
    }
  }
};

export const registerAdministrator = async (req, res) => {
  const userLoginExist = await UserLogin.findOne({
    email: req.body.email,
  });

  if (userLoginExist) {
    res.json({
      status: 0,
      message: "Email ya registrado",
    });
  } else {
    const userLogin = new UserLogin({
      email: req.body.email,
      password: encryptPassword(req.body.password),
    });
    const newUserLogin = await userLogin.save();

    const administrator = new Administrator({
      isActive: false,
      names: req.body.names,
      lastNames: req.body.lastNames,
      phone: req.body.phone,
      userLogin: newUserLogin._id,
    });
    const newAdministrator = await administrator.save();
    const administratorDto = await Administrator.findById(
      newAdministrator._id
    ).populate("userLogin", "-password");
    res.json({
      status: 1,
      message: "Registro exitoso: Espere aprobación",
      administrator: administratorDto,
    });
  }
};

export const registerClient = async (req, res) => {
  const userLoginExist = await UserLogin.findOne({
    email: req.body.email,
  });

  if (userLoginExist) {
    res.json({
      status: 0,
      message: "Email ya registrado",
    });
  } else {
    const userLogin = new UserLogin({
      email: req.body.email,
      password: encryptPassword(req.body.password),
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
    const clientDto = await Client.findById(newClient._id).populate(
      "userLogin",
      "-password"
    );

    jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 36000, _id: userLogin._id },
      process.env.SECRET_KEY,
      (error, token) => {
        if (!error) {
          res.json({
            status: 1,
            message: "Registro exitoso",
            token: token,
            client: clientDto,
          });
        } else {
          console.log(error);
          res.json({
            status: -1,
            message: "Error en el token",
          });
        }
      }
    );
  }
};

export const restoreClientPassword = async (req, res) => {
  try {
    let userLogin = await UserLogin.findOne({
      email: req.body.email,
    });
    let client = null;
    if (userLogin) {
      client = await Client.findOne({
        userLogin: userLogin._id,
      }).populate("userLogin", "-password");
    }

    if (client === null) {
      res.json({
        status: 0,
        message: "No se encontró ningún usuario",
      });
    } else {
      const password = generateString();
      userLogin.password = encryptPassword(password);
      const userLoginSave = await userLogin.save();
      const result = await sendMail(userLogin.email, password);
      if (result === true) {
        res.json({
          status: 1,
          message: "Envío exitoso",
        });
      } else {
        res.json({
          status: -1,
          message: "Error al enviar correo",
        });
      }
    }
  } catch {
    res.json({
      status: -1,
      message: "Error en el servidor",
    });
  }
};
