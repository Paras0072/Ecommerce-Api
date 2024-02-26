"use strict";
const { DataTypes } = require("sequelize");
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

// const { DataTypes } = require("sequelize");
// const  sequelize  = require("../../config/connect");

// // const User = sequelize.define(
// //   "User",
// //   {
// //     email: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //       unique: true,
// //       validate: {
// //         isEmail: true,
// //       },
// //     },
// //     password: { type: DataTypes.STRING, allowNull: false },
// //     addresses: { type: DataTypes.STRING },
// //     name: { type: DataTypes.STRING },
// //     orders: { type: DataTypes.INTEGER },
// //   },
// //   { timestamps: true, tableName: "Users" }
// // );

// // User.associate = (models) => {
// //   User.hasMany(models.Cart, { foreignKey: "userId" });
// // };
// // module.exports=User;
// // <------More features to add in future----->
//   // role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
//      // salt: { type: DataTypes.BLOB },
//     //resetPasswordToken: { type: DataTypes.STRING, defaultValue: "" },
// module.exports = (sequelize) => {
//   const User = sequelize.define(
//   "User",
//   {
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: { type: DataTypes.STRING, allowNull: false },
//     addresses: { type: DataTypes.STRING },
//     name: { type: DataTypes.STRING },
//     orders: { type: DataTypes.INTEGER },
//   },
//   { timestamps: true, tableName: "Users" }
// );

//   User.associate = (models) => {
//     User.hasMany(models.Cart, { foreignKey: "userId" });
//     User.hasMany(models.Order, { foreignKey: "userId" });
//   };

// return User;
// }
