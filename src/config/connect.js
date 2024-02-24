const { Sequelize } = require("sequelize");

module.exports.sequelize = new Sequelize("Ecommerce", "postgres", "Paras@1312", {
  host: "localhost",
  dialect: "postgres",
  timezone: "UTC",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
});
