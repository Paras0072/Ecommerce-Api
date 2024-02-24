const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/connect");

module.exports.User = sequelize.define(
  "User",
  {
   
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    addresses: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    orders: { type: DataTypes.INTEGER },
  },
  { timestamps: true }
);

// <------More features to add in future----->
  // role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
     // salt: { type: DataTypes.BLOB },
    //resetPasswordToken: { type: DataTypes.STRING, defaultValue: "" },