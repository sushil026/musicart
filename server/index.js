const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const filterRoutes  = require('./routes/filter.route');

const app = express();
const port = process.env.PORT;
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
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

app.listen(port, () => {
  console.log(`Server up at http://localhost:${port}`);
});

