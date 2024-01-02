const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const filterRoutes  = require('./routes/filter.route');
const cartRoutes  = require('./routes/cart.route');

// for sending data manually to the Database
// const { insertProducts } = require('./controllers/productPost');
// insertProducts();

const app = express();
const port = process.env.PORT;
app.use(
  cors({
    credentials: true,
    origin: "https://musicart-client.vercel.app/",
    allowedHeaders: ["Content-Type", "Authorization", "other-header"],
  })
);
app.use(express.json());
app.use(cookieParser());


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/health", (req, res) => {
  res.json("Server up & running");
});

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", filterRoutes);
app.use("/api", cartRoutes);

app.listen(port, () => {
  console.log(`Server up at http://localhost:${port}`);
});

