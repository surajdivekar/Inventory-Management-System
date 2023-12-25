process.env.NODE_ENV = "development";
var cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const customerRouter = require("./api/customers/customer.router");
const productRouter = require("./api/products/product.router");
const invoiceRouter = require("./api/invoices/invoice.router");

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/customers", customerRouter);
app.use("/api/products", productRouter);
app.use("/api/invoices", invoiceRouter);
const port = process.env.PORT || 9092;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
