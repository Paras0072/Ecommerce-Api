const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./src/config/postgresql");
const server = express();
const PORT = 8080;
const productsRouters =require('./src/resources/routes/Products');
const categoriesRouters=require("./src/resources/routes/Categories");
//middlewares
server.use(express.json()); // to parse req.body
server.use("/categories", categoriesRouters.router);
server.use('/products',productsRouters.router);

connection();
server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(PORT, () => {
  console.group("Server Started on port " + PORT);
});
