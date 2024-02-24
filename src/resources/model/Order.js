const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/connect");

module.exports.Order = sequelize.define(
  "Order",
  {
    items: { type: DataTypes.ARRAY(DataTypes.JSONB), allowNull: false },
    totalAmount: { type: DataTypes.FLOAT },
    totalItems: { type: DataTypes.INTEGER },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
      allowNull: false,
    },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
    selectedAddress: { type: DataTypes.JSONB, allowNull: false },
  },
  { timestamps: true }
);
// <------More features to add in future----->
 // paymentMethod: {
    //   type: DataTypes.ENUM("cash", "card"),
    //   allowNull: false,
    //   validate: {
    //     isIn: {
    //       args: [["cash", "card"]],
    //       msg: "Enum validator failed for payment",
    //     },
    //   },
    // },
    // paymentStatus: { type: DataTypes.STRING, defaultValue: "pending" },