const express = require("express");
const  {connection}  = require("./src/resources/model/index")
const server = express();
const PORT = 8080;
const productsRouters =require('./src/resources/routes/Products');
const categoriesRouters=require("./src/resources/routes/Categories");
const authRoutes = require("./src/resources/routes/Auth");
const cartRoutes=require("./src/resources/routes/Cart");
const orderRoutes = require("./src/resources/routes/Order");
//middlewares
server.use(express.json()); // to parse req.body
connection(); // for connecting the database
server.use("/categories", categoriesRouters.router);
server.use('/products',productsRouters.router);
server.use("/auth",authRoutes.router);
server.use("/cart", cartRoutes.router);
server.use("/order", orderRoutes.router);


server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(PORT, () => {
  console.group("Server Started on port " + PORT);
});
