const {
  getAllInvoices,
  getAllCustomerGroupWiseInvoices,
  getCustomerIdWiseInvoices,
  getCustomerIdWiseInvoicesDetails,
  getInvoiceDetailsById,
  getInvoiceIdWiseItem,
  createInvoice,
  insertInvoiceItem,
  getInvoiceIdWisePayments,
} = require("./invoice.service");
const { create, updateCustomer } = require("../customers/customer.service");

module.exports = {
  getAllInvoices: (req, res) => {
    const id = req.params.user_id;
    getAllInvoices(id, (err, results) => {
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
  getAllCustomerGroupWiseInvoices: (req, res) => {
    const id = req.params.user_id;
    getAllCustomerGroupWiseInvoices(id, (err, results) => {
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
  getCustomerIdWiseInvoices: (req, res) => {
    const id = req.params.customer_id;
    getCustomerIdWiseInvoices(id, (err, results) => {
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
  getCustomerIdWiseInvoicesDetails: (req, res) => {
    const id = req.params.customer_id;
    getCustomerIdWiseInvoicesDetails(id, (err, results) => {
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
        data: results[0],
      });
    });
  },

  getInvoiceDetailsById: (req, res) => {
    const id = req.params.invoice_id;
    getInvoiceDetailsById(id, (err, results) => {
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
  getInvoiceIdWiseItem: (req, res) => {
    const id = req.params.invoice_id;
    getInvoiceIdWiseItem(id, (err, results) => {
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
  getInvoiceIdWisePayments: (req, res) => {
    const id = req.params.invoice_id;
    getInvoiceIdWisePayments(id, (err, results) => {
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

  // createInvoices: async(req, res) => {
  //   const body = req.body;
  //   if (body.customer_id === 0) {
  //      create(body, (error, results)  => {
  //       if (error) {
  //         console.log(error);
  //         return res.status(500).json({
  //           success: 0,
  //           message: "Database connection errror",
  //         });
  //       }
  //       const data = {
  //         invoice_date: body.invoice_date,
  //         customer_id: results,
  //         total_amount: body.total_amount,
  //         invoice_items: body.invoice_items,
  //       };
  //       // console.log(data);
  //       createInvoice(data, (err, resp) => {
  //         if (err) {
  //           console.log(err);
  //           return res.status(500).json({
  //             success: 0,
  //             message: "Database connection errror",
  //           });
  //         }
  //         return res.status(200).json({
  //           success: 1,
  //           message: "Invoice Added Successfully",
  //         });
  //       });
  //     });
  //   } else {
  //     updateCustomer(body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       createInvoice(body, (err, resp) => {
  //         if (err) {
  //           console.log(err);
  //           return res.status(500).json({
  //             success: 0,
  //             message: "Database connection errror",
  //           });
  //         }
  //         console.log("update");
  //         return res.status(200).json({
  //           success: 1,
  //           message: "Invoice Added Successfully",
  //         });
  //       });
  //     });
  //   }

  // },

  createInvoicesaa: async (req, res) => {
    const body = req.body;
    if (body.customer_id === 0) {
      create(body, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        const data = {
          invoice_date: body.invoice_date,
          customer_id: results,
          total_amount: body.total_amount,
          invoice_items: body.invoice_items,
        };
        createInvoice(data, (err, resp) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Error creating invoice",
            });
          }
          return res.status(200).json({
            success: 1,
            message: "Invoice Added Successfully",
          });
        });
      });
    }
    //  else {
    //   updateCustomer(body, (err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).json({
    //         success: 0,
    //         message: "Database connection error",
    //       });
    //     }
    //     createInvoice(body, (err, resp) => {
    //       if (err) {
    //         console.log(err);
    //         return res.status(500).json({
    //           success: 0,
    //           message: "Error creating invoice",
    //         });
    //       }
    //       console.log("update");
    //       return res.status(200).json({
    //         success: 1,
    //         message: "Invoice Added Successfully",
    //       });
    //     });
    //   });
    // }
  },

  //new
  createInvoiceses: async (req, res) => {
    const body = req.body;
    if (body.customer_id === 0) {
      create(body, function (error, results) {
        if (error) {
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        const invoiceData = {
          invoice_date: body.invoice_date,
          customer_id: results,
          total_amount: body.total_amount,
        };
        createInvoice(invoiceData, function (results) {
          const Invoice_Id = results;
          const itemData = {
            invoice_id: Invoice_Id,
            invoice_items: body.invoice_items,
          };
          // console.log(itemData);
          insertInvoiceItem(itemData, function (resp) {
            console.log(resp);
            return res.json({
              success: 1,
              message: resp.msg,
              // data: resp.msg,
            });
          });
        });
      });
    }

    updateCustomer(body, function (error, results) {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      const invoiceData = {
        invoice_date: body.invoice_date,
        customer_id: body.customer_id,
        total_amount: body.total_amount,
      };
      createInvoice(invoiceData, function (results) {
        const Invoice_Id = results;
        const itemData = {
          invoice_id: Invoice_Id,
          invoice_items: body.invoice_items,
        };
        // console.log(itemData);
        insertInvoiceItem(itemData, function (resp) {
          console.log(resp);
          return res.json({
            success: 1,
            message: resp.msg,
            // data: resp.msg,
          });
        });
      });
    });
  },
};
