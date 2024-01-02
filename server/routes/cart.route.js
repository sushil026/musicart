const express = require("express");
const router = express.Router();
const { addToCart, displayCart, emptyCart } = require("../controllers/cart.contoller");

router.get("/cart/:id", displayCart);
router.post("/clear-cart/:id", emptyCart);
router.post("/addToCart", addToCart);

module.exports = router;
