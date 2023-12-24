const Product = require("../models/Product.model");

const getDistinctValues = async (req, res) => {
  try {
    const brands = await Product.distinct("brand");
    const colors = await Product.distinct("color");
    const types = await Product.distinct("type");
    res.status(200).json({
      brands: brands,
      colors: colors,
      types: types,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching distinct values:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getDistinctValues };
