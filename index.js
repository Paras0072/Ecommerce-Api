const express = require("express");
const dotenv = require("dotenv");
const server = express();

const PORT = 8080;

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(PORT, () => {
  console.group("Server Started on port " + PORT);
});
