"use strict";
const { DataTypes } = require("sequelize");

// model for storing information of user
module.exports = (sequelize) => {
  const Users = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING },
      orders: { type: DataTypes.INTEGER },
    },
    { timestamps: false }
  );
  Users.associate = function (models) {
    Users.belongsTo(models.Order, { foreignKey: "orders" });
    Users.hasMany(models.Cart, { foreignKey: "user" });
  };
  return Users;
};


