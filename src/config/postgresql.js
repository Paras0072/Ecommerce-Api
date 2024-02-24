const { sequelize } = require("./connect");

module.exports.connection =async ()=>{

try{
     await sequelize.authenticate();
     console.log("Connection has been established successfully to the database.");
}catch(error){
  console.error("Error:", error);
}

}