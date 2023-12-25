const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createCustomer,
  getCustomers,
  getCustomersByid,
  updateCustomer,
  deleteCustomer,
} = require("./customer.controller");
router.post("/", checkToken, createCustomer);
router.get("/:user_id", checkToken, getCustomers);
router.get("/byid/:customer_id", checkToken, getCustomersByid);
router.patch("/", checkToken, updateCustomer);
router.delete("/:customer_id", checkToken, deleteCustomer);

module.exports = router;
