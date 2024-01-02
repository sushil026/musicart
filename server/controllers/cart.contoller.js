const User = require("../models/User.model");

const addToCart = async (req, res) => {
  const { id, prod_id, price } = req.body;
  try {
    const user = await User.findById(id);
    const existingProduct = user.cart.find((item) =>
      item.productId.equals(prod_id)
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({ productId: prod_id, quantity: 1, price: price });
    }
    await user.save();
    res.status(200).json({ msg: "Added Successfully to Cart" });
  } catch (error) {
    console.error(error);
  }
};

const displayCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }
    const cart = user.cart;
    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
  }
};

const emptyCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }
    user.cart = [];
    await user.save();
    res.status(200).json({ msg: "Cart emptied successfully" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addToCart, displayCart, emptyCart };
