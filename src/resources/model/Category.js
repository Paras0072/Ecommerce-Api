const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  const Category = Sequelize.define(
    "Category",
    {
      label: { type: DataTypes.STRING, allowNull: false, unique: true },
      value: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { timestamps: true, tableName: "Categories" }
  );
  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "category" });
  };
  return Category;
};

// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../../config/connect");

// module.exports = (sequelize) => {
//   const Category = sequelize.define(
//     "Category",
//     {
//       label: { type: DataTypes.STRING, allowNull: false, unique: true },
//       value: { type: DataTypes.STRING, allowNull: false, unique: true },
//     },
//     { timestamps: true, tableName: "Categories" }
//   );
//   Category.associate = (models) => {
//     Category.hasMany(models.Product, { foreignKey: "CategoryId" });
//   };
//   return Category;

// }
