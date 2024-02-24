const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/connect");
module.exports.Cart = sequelize.define(
  "Cart",
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Products", key: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
  },
  { timestamps: true }
);
// <------More features to add in future----->
// size: { type: DataTypes.JSONB },
    //color: { type: DataTypes.JSONB },