const express = require("express");
const { viewcart, addtocart, updatecart, removefromcart } = require("../controllers/Cart");

const router = express.Router();

router.post('/:userId/:productId',addtocart)
      .get('/viewcart/:userId',viewcart)
      .patch('/updatequantity/:userId/:productId',updatecart)
      .delete('/removefromcart/:userId/:productId',removefromcart);
 
exports.router = router;
