const express = require("express");
const router = express.Router();
const { getProducts, getProductById, getProductForCart } = require("../controllers/product.controller")

router.get("/products", getProducts);
router.get("/product-details/:id", getProductById);
router.get("/product-for-cart/:id", getProductForCart);


module.exports = router;