const products = require("../data.json");
const fs = require("fs");
//const procuctModel = require("../models/Products");
const ProductModel = require("../models/Products");

const returnAllProducts = async (req, res) => {
  // const { category } = req.query;
  // if (category) {
  //   const selectedProducts = products.filter((product) => {
  //     return product.category === category;
  //   });
  //   res.json(selectedProducts);
  //   return;
  // }
  // res.json(products);

  // const { category } = req.query;
  // if (category) {
  //   const selectedProducts = await ProductModel.find({ category });
  //   res.json(selectedProducts);
  //   return;
  // }
  // const products = await ProductModel.find();
  // res.json(products);

  const { category, price } = req.query;
  console.log(category);

  if (category || price){
    const selectedProducts = await ProductModel.find({ $or: [
      {category: {$in: category}}, 
      {price: {$gt: price}},
    ]})
  }

  if (category) {
    const selectedProducts = await ProductModel.find({
      category: { $in: category },
    });
    res.json(selectedProducts);
    return;
  }
  if (price) {
    const selectedProducts = await ProductModel.find({ price: { $gt: price } });
    res.json(selectedProducts);
    return;
  }
};

const returnSingleProduct = async (req, res) => {
  // const { productID } = req.params;
  // const selectedProduct = products.filter((product) => {
  //   return product.id === Number(productID);
  // });
  // res.json(selectedProduct);

  const { productID } = req.params;
  const selectedProduct = await ProductModel.findByID(productID);
  res.json(selectedProduct);
};

const createProduct = async (req, res) => {
  // products.push(req.body);
  // console.log(products);
  // fs.writeFileSync('./data.json', JSON.stringify(products), () => {
  //   console.log("Data written")
  // })
  // res.send("Data received")
  try {
    let product = new ProductModel(req.body);
    await product.save();
    res.json({ product });
  } catch (err) {
    console.log("Error occoured");
  }
};

const updateAndReplaceProduct = async (req, res) => {
  const { productID } = req.params;
  const updatedProduct = await ProductModel.findOneAndReplace(
    productID,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
};

const updateProduct = async (req, res) => {
  const { productID } = req.params;
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productID,
    req.body
  );
  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  const deleteProduct = await ProductModel.findByIdAdndReplace(productID);
  res.json(deleteProduct);
};

module.exports = {
  returnAllProducts,
  returnSingleProduct,
  createProduct,
  updateAndReplaceProduct,
  updateProduct,
  deleteProduct,
};
