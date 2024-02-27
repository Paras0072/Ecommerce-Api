"use strict";
const { DataTypes } = require("sequelize");

// model for order
module.exports = (sequelize) => {
  const Orders = sequelize.define(
    "Order",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      items: { type: DataTypes.ARRAY(DataTypes.JSONB), allowNull: false },
      totalAmount: { type: DataTypes.FLOAT },
      totalItems: { type: DataTypes.INTEGER },
    },
    { timestamps: false }
  );
  Orders.associate = function (models) {
    Orders.hasMany(models.User, { as: "orders", foreignKey: "orders" });
    Orders.belongsToMany(models.Product, { through: "OrderProducts" });
  };

  return Orders;
};



// // <------More features to add in future----->
//  // paymentMethod: {
//     //   type: DataTypes.ENUM("cash", "card"),
//     //   allowNull: false,
//     //   validate: {
//     //     isIn: {
//     //       args: [["cash", "card"]],
//     //       msg: "Enum validator failed for payment",
//     //     },
//     //   },
//     // },
//     // paymentStatus: { type: DataTypes.STRING, defaultValue: "pending" },
//     // orderDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
