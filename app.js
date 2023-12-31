const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// comment

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://E-commerce:deliveryboy@cluster0.9h59ya4.mongodb.net/E-commerce?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("error");
    console.log("Database connected failed");
  }
});

database();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
//mongoose.connect('mongodb+srv://E-commerce:  deliveryboy@cluster0.ht7vds6.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
