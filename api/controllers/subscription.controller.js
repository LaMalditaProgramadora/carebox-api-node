import { Box, Subscription, Client, UserLogin } from "../models/_index.js";

const shippingFee = 0.05;

const formaStringToDate = (dateString) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(8, 10);
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date;
};

export const createSubscription = async (req, res) => {
  try {
    let date = formaStringToDate(req.body.deliveryDate);
    const box = await Box.findById(req.body.idBox);
    let client = await Client.findById(req.body.idClient);
    date.setDate(date.getDate() + 1);
    let dateString = date.toLocaleDateString("en-CA");
    const subscription = new Subscription({
      address: client.address,
      price: (box.price + shippingFee * box.price).toFixed(2),
      deliveryDate: dateString,
      deliveredThisMonth: false,
      box: box._id,
      client: client._id,
    });

    const newSubscription = await subscription.save();

    res.json({
      status: 1,
      message: "Creación exitosa",
      subscription: newSubscription,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const cancel = async (req, res) => {
  try {
    const { idSubscription: idSubscription } = req.query;
    const subscription = await Subscription.findById(idSubscription)
      .populate("box")
      .populate("client");
    const deleteSubscription = await Subscription.deleteOne(subscription);

    res.json({
      status: 1,
      message: "Suscripción cancelada",
      subscription: subscription,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const getByIdClient = async (req, res) => {
  const { idClient: idClient } = req.query;
  const subscriptions = await Subscription.find({ client: idClient }).populate(
    "box"
  );

  res.json({
    status: 1,
    message: "Suscripciones encontradas",
    subscriptions: subscriptions,
  });
};

export const getAll = async (req, res) => {
  const subscriptions = await Subscription.find()
    .populate("box")
    .populate("client");
  res.json({
    status: 1,
    message: "Suscripciones encontradas",
    subscriptions: subscriptions,
  });
};

export const getAllByEmail = async (req, res) => {
  const { email: email } = req.query;
  let subscriptions = [];

  const userLogin = await UserLogin.findOne({ email: email });
  if (userLogin) {
    const client = await Client.findOne({ userLogin: userLogin._id });
    if (client) {
      subscriptions = await Subscription.find({
        client: client._id,
      })
        .populate("box")
        .populate("client");
    }
  }
  res.json({
    status: 1,
    message: "Suscripciones encontradas",
    subscriptions: subscriptions,
  });
};

export const getTodaySubscriptions = async (req, res) => {
  const date = new Date();
  const dateString = date.toLocaleDateString("en-CA");
  const subscriptions = await Subscription.find({ deliveryDate: dateString })
    .populate("box")
    .populate("client");
  res.json({
    status: 1,
    message: "Suscripciones encontradas",
    subscriptions: subscriptions,
  });
};

export const getTodaySubscriptionsByEmail = async (req, res) => {
  const { email: email } = req.query;
  const date = new Date();
  const dateString = date.toLocaleDateString("en-CA");
  let subscriptions = [];

  const userLogin = await UserLogin.findOne({ email: email });
  if (userLogin) {
    const client = await Client.findOne({ userLogin: userLogin._id });
    if (client) {
      subscriptions = await Subscription.find({
        deliveryDate: dateString,
        client: client._id,
      })
        .populate("box")
        .populate("client");
    }
  }

  res.json({
    status: 1,
    message: "Suscripciones encontradas",
    subscriptions: subscriptions,
  });
};

export const updateDeliveredThisMonth = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.body.idSubscription);
    const date = formaStringToDate(subscription.deliveryDate);
    date.setMonth(date.getMonth() + 1);
    subscription.deliveredThisMonth = true;
    subscription.deliveryDate = date.toLocaleDateString("en-CA");
    const updateSubscription = await subscription.save();
    res.json({
      status: 1,
      message: "Actualización exitosa",
      subscription: updateSubscription,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
