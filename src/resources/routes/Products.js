const express =require('express');
const { fetchProductsByCategory, fetchProductsById } = require('../controllers/Product');



const router =express.Router();

router.get("/:categoryId", fetchProductsByCategory);
router.get("/findbyid/:productId",fetchProductsById);

exports.router=router;