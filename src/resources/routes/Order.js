const express = require("express");
const { placeOrder, orderHistory, orderDetails } = require("../controllers/Order");

const router = express.Router();

router
  .post("/:userId", placeOrder)
  .get("/orderhistory/:userId", orderHistory)
  .get("/orderdetails/:orderId", orderDetails);

exports.router = router;
