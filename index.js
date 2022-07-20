const express = require("express");
const cors = require("cors");
const productAPIRoutes = require("./routes/productapi");
const products = require("./data.json");
const hbs = require("hbs");
//let fs = require('fs');
const connectDatabase = require("./database/connection");

//Connect Database
connectDatabase();

const app = express();
app.use(cors());
app.use(express.json()); //middleware
app.set("view engine", "hbs");
app.use("/static", express.static("./public"));
hbs.registerPartials(__dirname + "/views/partials");

//app.use((req, res, next) => {
//req.name = "Sachyam";
//console.log("Hello from middleware!");
//next();
//})

const logger = (req, res, next) => {
  console.log("This is midleware.");
  next();
};

const logger2 = (req, res, next) => {
  console.log("This is next midleware.");
  next();
};

app.get("/", [logger, logger2], (req, res) => {
  //console.log(req.name)
  res.render("index", { products });
});

app.use("/api/products", productAPIRoutes);

app.listen(4000, () => {
  console.log("server started at port 4000");
});
