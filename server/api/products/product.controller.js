const {
  create,
  getProducts,
  getProductByid,
  updateProduct,
  deleteProduct,
} = require("./product.service");

module.exports = {
  createProduct: (req, res) => {
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
      });
    });
  },

  getProducts: (req, res) => {
    const id = req.params.user_id;
    getProducts(id, (err, results) => {
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

  getProductByid: (req, res) => {
    const id = req.params.item_id;
    getProductByid(id, (err, results) => {
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

  updateProduct: (req, res) => {
    const body = req.body;
    updateProduct(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to Update Item",
        });
      }
      return res.json({
        success: 1,
        message: "Product Updated Successfully",
      });
    });
  },
  deleteProduct: (req, res) => {
    const id = req.params.item_id;
    deleteProduct(id, (err, results) => {
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
