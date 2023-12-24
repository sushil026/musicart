const Product = require("../models/Product.model");

const getProducts = async (req, res) => {
  try {
    const { type, color, brand, from, to, sort, search } = req.query;

    const query = {};
    if (type) query.type = type;
    if (color) query.color = color;
    if (brand) query.brand = brand;
    if (from && !isNaN(parseInt(from, 10)))
      query.price = { $gte: parseInt(from, 10) };
    if (to && !isNaN(parseInt(to, 10)))
      query.price = { ...query.price, $lte: parseInt(to, 10) };
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ];
    }
    let products;
    if (Object.keys(query).length === 0) {
      products = await Product.find();
    } else {
      products = await Product.find(query);
    }

    if (sort) {
      switch (sort) {
        case "price-aesc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "A-to-Z":
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-to-A":
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    const productDetails = products.map((product) => ({
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      color: product.color,
      cover: product.images[0],
      type: product.type,
      id: product._id,
    }));
    res.status(200).json(productDetails);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getProducts };
