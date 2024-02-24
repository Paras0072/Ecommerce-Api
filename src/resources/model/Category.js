const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/connect");
module.exports.Category = sequelize.define(
  "Category",
  {
    label: { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: true }
);