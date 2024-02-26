const Sequelize = require("sequelize");
const UserModel = require("./User");
const CategoryModel = require("./Category");
const ProductModel = require("./Product");
const OrderModel = require("./Order");
const CartModel = require("./Cart");
const OrderProductModel = require("./OrderProducts");
require("dotenv").config();
const database = process.env.POSTGRE_DATABASE;
const username = process.env.POSTGRE_USERNAME;
const password = process.env.POSTGRE_PASSWORD;
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
  timezone: "UTC",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
});

const models = {
  User: UserModel(sequelize, Sequelize),
  Category: CategoryModel(sequelize, Sequelize),
  Product: ProductModel(sequelize, Sequelize),
  Cart: CartModel(sequelize, Sequelize),
  Order: OrderModel(sequelize, Sequelize),
  OrderProducts: OrderProductModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection has been established successfully to the database."
    );
    await sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Database and tables synchronized.");
      })
      .catch((error) => {
        console.error("Error synchronizing the database:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = { models, connection };
