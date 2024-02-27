const { DataTypes } = require("sequelize");
// model for category
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

