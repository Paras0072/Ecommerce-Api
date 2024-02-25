const express =require('express');
const { fetchProductsByCategory, fetchProductsById } = require('../controllers/Product');


const router =express.Router();

router.get("/byCategory/:categoryId", fetchProductsByCategory);
router.get("/:productId", fetchProductsById);

exports.router=router;