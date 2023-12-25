const {
  create,
  getCustomers,
  getCustomersByid,
  updateCustomer,
  deleteCustomer,
} = require("./customer.service");

module.exports = {
  createCustomer: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Customer Added Successfully",
      });
    });
  },

  getCustomers: (req, res) => {
    const id = req.params.user_id;
    // console.log(id);
    getCustomers(id, (err, results) => {
      if (err) {
         console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      // return res.send(results);
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },
  getCustomersByid: (req, res) => {
    const id = req.params.customer_id;
    getCustomersByid(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }

      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateCustomer: (req, res) => {
    const body = req.body;
    updateCustomer(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to Update Customer",
        });
      }
      return res.json({
        success: 1,
        message: "Customer Updated Successfully",
      });
    });
  },
  deleteCustomer: (req, res) => {
    const id = req.params.customer_id;
    deleteCustomer(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "Customer Deleted Successfully",
      });
    });
  },
};
