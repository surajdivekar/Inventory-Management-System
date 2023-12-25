const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  getAllInvoices,
  getAllCustomerGroupWiseInvoices,
  getCustomerIdWiseInvoices,
  getCustomerIdWiseInvoicesDetails,
  getInvoiceDetailsById,
  getInvoiceIdWiseItem,
  createInvoiceses,
  getInvoiceIdWisePayments,
} = require("./invoice.controller");
router.post("/", checkToken, createInvoiceses);
router.get("/:user_id", checkToken, getAllInvoices);
router.get(
  "/customergroupwiseinvoices/:user_id",
  checkToken,
  getAllCustomerGroupWiseInvoices
);
router.get(
  "/customeridwiseinvoices/:customer_id",
  checkToken,
  getCustomerIdWiseInvoices
);
router.get(
  "/customeridwiseinvoicedetails/:customer_id",
  checkToken,
  getCustomerIdWiseInvoicesDetails
);
router.get("/byid/:invoice_id", checkToken, getInvoiceDetailsById);
router.get("/byidwiseitem/:invoice_id", checkToken, getInvoiceIdWiseItem);
router.get(
  "/byidwisepayment/:invoice_id",
  checkToken,
  getInvoiceIdWisePayments
);
// router.patch("/", checkToken, updateProduct);
// router.delete("/:item_id", checkToken, deleteProduct);

module.exports = router;
