const express = require("express");
const bodyParser = require("body-parser");
const  {connection}  = require("./src/resources/model/index")
const server = express();
const PORT = 8080;
const productsRouters =require('./src/resources/routes/Products');
const categoriesRouters=require("./src/resources/routes/Categories");
const authRoutes = require("./src/resources/routes/Auth");
const cartRoutes=require("./src/resources/routes/Cart");
const orderRoutes = require("./src/resources/routes/Order");
//const secureRoutes = require("./src/resources/routes/Secure"); // test for authentication
const authenticate=require("./src/authorization/authenticate");
//middlewares
server.use(bodyParser.json()); // to parse req.body
connection(); // for connecting the database
server.use("/categories", categoriesRouters.router);
server.use('/products',productsRouters.router);
server.use("/auth",authRoutes.router);
server.use("/cart",authenticate, cartRoutes.router);
server.use("/order",authenticate, orderRoutes.router);
//server.use("/secure",secureRoutes); // test for authentication

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(PORT, () => {
  console.group("Server Started on port " + PORT);
});
