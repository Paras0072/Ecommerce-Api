const { User} = require("../resources/model/User");
const { sequelize } = require("./connect");
const { Product } = require("../resources/model/Product");
const { Order } = require("../resources/model/Order");
const { Category} = require("../resources/model/Category");
const { Cart } = require("../resources/model/Cart");
module.exports.connection =async ()=>{

try{
     await sequelize.authenticate();
     console.log("Connection has been established successfully to the database.");
       await User.sync();
       await Product.sync();
       await Category.sync();
       await Order.sync();
      await Cart.sync();
       console.log(
         "Model has successfully synced to the database."
       );
}catch(error){
  console.error("Error:", error);
}

}