const express = require("express");
const router = express.Router();
const {
  returnAllProducts,
  returnSingleProduct,
  createProduct,
  updateAndReplaceProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.get("/", returnAllProducts);
router.get("/:productID", returnSingleProduct);
router.post("/", createProduct);

router.put("/:productId", updateAndReplaceProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
module.exports = router;
