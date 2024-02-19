const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart_quantity: {
    type: Number,
    default: 0, 
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
});

userSchema.pre("save", function (next) {
  this.cart.reduce((total, item) => total + item.quantity, 0);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
