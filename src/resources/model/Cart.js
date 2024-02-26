const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user" });
    Cart.belongsTo(models.Product, { foreignKey: "product" });
  };
  return Cart;
};

















// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../../config/connect");
// module.exports = (sequelize) => {
  
//   const Cart = sequelize.define(
//     "Cart",
//     {
//       quantity: { type: DataTypes.INTEGER, allowNull: false },
//       productId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         // references: { model: "Products", key: "id" },
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         // references: { model: "Users", key: "id" },
//       },
//     },
//     { timestamps: true, tableName: "Carts" }
//   );
//   Cart.associate = (models) => {
//     Cart.belongsTo(models.User, { foreignKey: "userId" });
//     Cart.belongsTo(models.Product, { foreignKey: "productId" });
//   };
//   return Cart;
// } 


// <------More features to add in future----->
// size: { type: DataTypes.JSONB },
    //color: { type: DataTypes.JSONB },