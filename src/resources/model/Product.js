




const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING, allowNull: false },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0, max: 10000 },
      },
      stock: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  Product.associate = (models) => {
    Product.hasMany(models.Cart, { foreignKey: "product" });
    Product.belongsTo(models.Category, { foreignKey: "category" });
    Product.belongsToMany(models.Order, { through: "OrderProducts" });
  };
  return Product;
};

















// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../../config/connect");
// module.exports = (sequelize) => { 
//   const Product = sequelize.define(
//     "Product",
//     {
//       title: { type: DataTypes.STRING, allowNull: false, unique: true },
//       description: { type: DataTypes.STRING, allowNull: false },
//       price: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//         validate: { min: 0, max: 10000 },
//       },
//       stock: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
//       CategoryId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//        // references: { model: "Categories", key: "id" },
//       },
//     },
//     { timestamps: true, tableName: "Products" }
//   );
//   Product.associate = (models) => {
//     Product.hasMany(models.Cart, { foreignKey: "productId" }); 
//     Product.hasMany(models.Category, { foreignKey: "productId" });
    
//   };
//   return Product;
// }


// // <------More features to add in future----->
//  // discountPercentage: {
//     //   type: DataTypes.FLOAT,
//     //   validate: { min: 1, max: 99 },
//     // },
//     // rating: {
//     //   type: DataTypes.FLOAT,
//     //   defaultValue: 0,
//     //   validate: { min: 0, max: 5 },
//     // },
//       // brand: { type: DataTypes.STRING, allowNull: false },
//        // thumbnail: { type: DataTypes.STRING, allowNull: false },
//     //images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
//     //colors: { type: DataTypes.JSONB },
//    // sizes: { type: DataTypes.JSONB },
//    // highlights: { type: DataTypes.ARRAY(DataTypes.STRING) },
//    // discountPrice: { type: DataTypes.FLOAT },
//      // deleted: { type: DataTypes.BOOLEAN, defaultValue: false },