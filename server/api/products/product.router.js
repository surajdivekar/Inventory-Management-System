const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createProduct,
  getProducts,
  getProductByid,
  updateProduct,
  deleteProduct,
} = require("./product.controller");
router.post("/", checkToken, createProduct);
router.get("/:user_id", checkToken, getProducts);
router.get("/byid/:item_id", checkToken, getProductByid);
router.patch("/", checkToken, updateProduct);
router.delete("/:item_id", checkToken, deleteProduct);

// router.post("/", createProduct);
// router.get("/:user_id", getProducts);
// router.get("/byid/:item_id", getProductByid);
// router.patch("/", updateProduct);
// router.delete("/:item_id", deleteProduct);

module.exports = router;
