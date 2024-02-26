const express =require('express');
const { fetchProductsByCategory, fetchProductsById } = require('../controllers/Product');



const router =express.Router();

router.get("/:categoryId", fetchProductsByCategory);
router.get("/:productId",fetchProductsById);

exports.router=router;