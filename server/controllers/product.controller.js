const Product = require("../models/Product.model");

const getProducts = async (req, res) => {
  try {
    const { type, color, brand, from, to } = req.query;
    const query = {};
    if (type) query.type = type;
    if (color) query.color = color;
    if (brand) query.brand = brand;
    if (from && !isNaN(parseInt(from, 10)))
      query.price = { $gte: parseInt(from, 10) };
    if (to && !isNaN(parseInt(to, 10)))
      query.price = { ...query.price, $lte: parseInt(to, 10) };

    let products;
    if (Object.keys(query).length === 0) {
      products = await Product.find();
    } else {
      products = await Product.find(query);
    }
    // res.status(200).json(products);
    const productDetails = products.map((product) => ({
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      color: product.color,
      features: product.features,
      type: product.type,
    }));

    res.status(200).json(productDetails);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getProducts };
