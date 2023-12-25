const pool = require("../../config/database");

module.exports = {
  getAllInvoices: (id, callBack) => {
    pool.query(
      `SELECT d.invoice_id, d.invoice_date, c.customer_id, c.customer_name,c.email,c.mobile,c.city, d.total_amount, COALESCE(SUM(p.payment_amount), 0) AS total_paid_amount, d.total_amount - COALESCE(SUM(p.payment_amount), 0) AS remaining_amount, CASE WHEN d.total_amount - COALESCE(SUM(p.payment_amount), 0) = 0 THEN 'Paid' WHEN COALESCE(SUM(p.payment_amount), 0) > 0 THEN 'Partially Paid' ELSE 'Unpaid' END AS status FROM tblinvoice_details AS d JOIN tblcustomers AS c ON c.customer_id = d.customer_id LEFT JOIN tblinvoice_payments AS p ON d.invoice_id = p.invoice_id WHERE c.flag = 0 AND c.user_id = ?  GROUP BY d.invoice_id, d.invoice_date, c.customer_id, c.customer_name, d.total_amount`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCustomerIdWiseInvoices: (id, callBack) => {
    pool.query(
      `SELECT d.invoice_id, d.invoice_date, c.customer_id, c.customer_name,c.email,c.mobile,c.city,d.total_amount, ROUND(COALESCE(SUM(p.payment_amount), 0),2) AS total_paid_amount, ROUND( d.total_amount - COALESCE(SUM(p.payment_amount), 0),2) AS remaining_amount, CASE WHEN d.total_amount - COALESCE(SUM(p.payment_amount), 0) = 0 THEN 'Paid' WHEN COALESCE(SUM(p.payment_amount), 0) > 0 THEN 'Partially Paid' ELSE 'Unpaid' END AS status FROM tblinvoice_details AS d JOIN tblcustomers AS c ON c.customer_id = d.customer_id LEFT JOIN tblinvoice_payments AS p ON d.invoice_id = p.invoice_id WHERE d.customer_id = ? GROUP BY d.invoice_id, d.invoice_date, c.customer_id, c.customer_name, d.total_amount;`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCustomerIdWiseInvoicesDetails: (id, callBack) => {
    pool.query(
      `WITH invoice_summary AS (
        SELECT
          d.invoice_id,
          d.invoice_date,
          c.customer_id,
          c.customer_name,
          c.email,
          c.mobile,
          c.city,
          d.total_amount,
          COALESCE(SUM(p.payment_amount), 0) AS total_paid_amount,
          d.total_amount - COALESCE(SUM(p.payment_amount), 0) AS remaining_amount,
          CASE
            WHEN d.total_amount - COALESCE(SUM(p.payment_amount), 0) = 0 THEN 'Paid'
            WHEN COALESCE(SUM(p.payment_amount), 0) > 0 THEN 'Partially Paid'
            ELSE 'Unpaid'
          END AS status
        FROM
          tblinvoice_details AS d
          JOIN tblcustomers AS c ON c.customer_id = d.customer_id
          LEFT JOIN tblinvoice_payments AS p ON d.invoice_id = p.invoice_id
        WHERE
          c.customer_id = ?
        GROUP BY
          d.invoice_id,
          d.invoice_date,
          c.customer_id,
          c.customer_name,
          d.total_amount
      )
      SELECT
       
        customer_id,
        customer_name,
        email,
        mobile,
        city,
        SUM(total_amount) AS total_amount,
        SUM(total_paid_amount) AS total_paid_amount,
        SUM(remaining_amount) AS remaining_amount
      
      FROM
        invoice_summary
      GROUP BY
        customer_id,
        customer_name`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllCustomerGroupWiseInvoices: (id, callBack) => {
    pool.query(
      `
      WITH invoice_summary AS (
        SELECT
          d.invoice_id,
          d.invoice_date,
          c.customer_id,
          c.customer_name,
          d.total_amount,
          COALESCE(SUM(p.payment_amount), 0) AS total_paid_amount,
          d.total_amount - COALESCE(SUM(p.payment_amount), 0) AS remaining_amount,
          CASE
            WHEN d.total_amount - COALESCE(SUM(p.payment_amount), 0) = 0 THEN 'Paid'
            WHEN COALESCE(SUM(p.payment_amount), 0) > 0 THEN 'Partially Paid'
            ELSE 'Unpaid'
          END AS status
        FROM
          tblinvoice_details AS d
          JOIN tblcustomers AS c ON c.customer_id = d.customer_id
          LEFT JOIN tblinvoice_payments AS p ON d.invoice_id = p.invoice_id
        WHERE
          c.user_id=? AND c.flag =0
        GROUP BY
          d.invoice_id,
          d.invoice_date,
          c.customer_id,
          c.customer_name,
          d.total_amount
      )
      SELECT
       
        customer_id,
        customer_name,
        SUM(total_amount) AS total_amount,
        SUM(ROUND(total_paid_amount,2)) AS total_paid_amount,
        SUM(ROUND(remaining_amount,2)) AS remaining_amount
      
      FROM
        invoice_summary
      GROUP BY
        customer_id,
        customer_name`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getInvoiceDetailsById: (id, callBack) => {
    pool.query(
      // `SELECT d.invoice_id, d.invoice_date, c.customer_id, c.customer_name,c.email,c.mobile,c.city, d.total_amount, COALESCE(SUM(p.payment_amount), 0) AS total_paid_amount, d.total_amount - COALESCE(SUM(p.payment_amount), 0) AS remaining_amount FROM tblinvoice_details AS d JOIN tblcustomers AS c ON c.customer_id = d.customer_id LEFT JOIN tblinvoice_payments AS p ON d.invoice_id = p.invoice_id WHERE d.invoice_id=? GROUP BY d.invoice_id, d.invoice_date, c.customer_id, c.customer_name, d.total_amount`,
      `SELECT d.invoice_id, d.invoice_date, c.customer_id, c.customer_name,c.email,c.mobile,c.city, d.total_amount, COALESCE(SUM(p.payment_amount), 0) AS total_paid_amount, d.total_amount - COALESCE(SUM(p.payment_amount), 0) AS remaining_amount, CASE WHEN d.total_amount - COALESCE(SUM(p.payment_amount), 0) = 0 THEN 'Paid' WHEN COALESCE(SUM(p.payment_amount), 0) > 0 THEN 'Partially Paid' ELSE 'Unpaid' END AS status FROM tblinvoice_details AS d JOIN tblcustomers AS c ON c.customer_id = d.customer_id LEFT JOIN tblinvoice_payments AS p ON d.invoice_id = p.invoice_id WHERE d.invoice_id=?  GROUP BY d.invoice_id, d.invoice_date, c.customer_id, c.customer_name, d.total_amount`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getInvoiceIdWiseItem: (id, callBack) => {
    pool.query(
      `select invoiceitem_id,invoice_id,quantity,i.item_id,item_name,selling_rate,tax from tblinvoice_items d join tblitems i on i.item_id=d.item_id where invoice_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getInvoiceIdWisePayments: (id, callBack) => {
    pool.query(
      `select * from tblinvoice_payments where invoice_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  // createInvoice: (data, callBack) => {
  //   // var custId = 0;
  //   if (data.customer_id == 0) {
  //     pool.query(
  //       `insert into tblcustomers(customer_name,email,mobile,city,user_id) values(?,?,?,?,?)`,
  //       [data.customer_name, data.email, data.mobile, data.city, data.user_id],
  //       (error, iresults, field) => {
  //         if (error) {
  //           return callBack(error);
  //         }
  //         pool.query(
  //           `select max(customer_id) customer_id from tblcustomers`,
  //           (error, res, fiel) => {
  //             if (error) {
  //               return callBack(error);
  //             }
  //             const custId = res[0].customer_id;
  //             pool.query(
  //               `insert into tblinvoice_details(invoice_date,customer_id,total_amount)values(?,?,?)`,
  //               [data.invoice_date, custId, data.total_amount],
  //               (error, iresults, field) => {
  //                 if (error) {
  //                   return callBack(error);
  //                 }
  //                 pool.query(
  //                   `select max(invoice_id) invoice_id from tblinvoice_details`,
  //                   (error, res, fiel) => {
  //                     if (error) {
  //                       return callBack(error);
  //                     }
  //                     const invoice_id = res[0].invoice_id;
  //                     data.invoice_items.forEach((d, i) => {
  //                       pool.query(
  //                         `insert into tblinvoice_items(invoice_id,item_id,quantity) values(?,?,?)`,
  //                         [invoice_id, d.item_id, d.quantity],
  //                         (error, iresults, field) => {
  //                           if (error) {
  //                             return callBack(error);
  //                           }
  //                           // return callBack("Invoice Added Successfully");
  //                           return callBack(iresults);
  //                         }
  //                       );
  //                     });
  //                   }
  //                 );
  //               }
  //             );
  //           }
  //         );
  //         // console.log(custId);
  //       }
  //     );
  //   } else {
  //     pool.query(
  //       `update tblcustomers set customer_name=?, email=?,  mobile=?, city=? where customer_id = ?`,
  //       [
  //         data.customer_name,
  //         data.email,
  //         data.mobile,
  //         data.city,
  //         data.customer_id,
  //       ],
  //       (error, results, fields) => {
  //         if (error) {
  //           return callBack(error);
  //         }
  //       }
  //     );
  //   }

  //   // console.log(custId);
  // },

  //   createInvoice: (data, callBack) => {

  //     var query =
  //       "insert into tblinvoice_details(invoice_date,customer_id,total_amount)values('" +
  //       data.invoice_date +
  //       "','" +
  //       data.customer_id +
  //       "','" +
  //       data.total_amount +
  //       "')";
  //    pool.query(query, function (err) {
  //       if (err) throw err;
  //       pool.query(
  //         "select max(invoice_id) invoice_id from tblinvoice_details",
  //         function (err, resp) {
  //           if (err) throw err;
  //           var sdata = resp;
  //           var invoice_id = sdata[0].invoice_id;
  //           //   console.log(invoice_id);
  //           data.invoice_items.forEach(function (d, i) {
  //             pool.query(
  //               "insert into tblinvoice_items(invoice_id,item_id,quantity) values(" +
  //               invoice_id +
  //               "," +
  //               d.item_id +
  //               "," +
  //               d.quantity +
  //               ")",
  //               function (err) {
  //                 if (err) throw err;
  //               }
  //             );
  //           });
  //         }
  //       );
  //       callBack({ msg: "Invoice Details Added Successfully" });
  //     });
  //   },
  // };

  //   pool.query(
  //     `insert into tblinvoice_details(invoice_date,customer_id,total_amount)values(?,?,?)`,
  //     [data.invoice_date, data.customer_id, data.total_amount],
  //     (error, result, field) => {
  //       if (error) {
  //         return callBack(error);
  //       }
  //       pool.query(
  //         `select max(invoice_id) invoice_id from tblinvoice_details`,
  //         (error, res, fiel) => {
  //           if (error) {
  //             return callBack(error);
  //           }
  //           const invoice_id = res[0].invoice_id;
  //           data.invoice_items.forEach((d, i) => {
  //             pool.query(
  //               `insert into tblinvoice_items(invoice_id,item_id,quantity) values(?,?,?)`,
  //               [invoice_id, d.item_id, d.quantity],
  //               (error, iresults, field) => {
  //                 if (error) {
  //                   return callBack(error);
  //                 }
  //                 //  return callBack("Invoice Added Successfully");
  //                 return callBack(iresults);
  //               }
  //             );
  //           });
  //         }
  //       );
  //     }
  //   );
  // },

  // createInvoice: (data, callBack) => {
  //   // var custId = 0;
  //   if (data.customer_id == 0) {
  //     pool.query(
  //       `insert into tblcustomers(customer_name,email,mobile,city,user_id) values(?,?,?,?,?)`,
  //       [data.customer_name, data.email, data.mobile, data.city, data.user_id],
  //       (error, iresults, field) => {
  //         if (error) {
  //           return callBack(error);
  //         }
  //         pool.query(
  //           `select max(customer_id) customer_id from tblcustomers`,
  //           (error, res, fiel) => {
  //             if (error) {
  //               return callBack(error);
  //             }
  //             const custId = res[0].customer_id;
  //             pool.query(
  //               `insert into tblinvoice_details(invoice_date,customer_id,total_amount)values(?,?,?)`,
  //               [data.invoice_date, custId, data.total_amount],
  //               (error, iresults, field) => {
  //                 if (error) {
  //                   return callBack(error);
  //                 }
  //                 pool.query(
  //                   `select max(invoice_id) invoice_id from tblinvoice_details`,
  //                   (error, res, fiel) => {
  //                     if (error) {
  //                       return callBack(error);
  //                     }
  //                     const invoice_id = res[0].invoice_id;
  //                     data.invoice_items.forEach((d, i) => {
  //                       pool.query(
  //                         `insert into tblinvoice_items(invoice_id,item_id,quantity) values(?,?,?)`,
  //                         [invoice_id, d.item_id, d.quantity],
  //                         (error, iresults, field) => {
  //                           if (error) {
  //                             return callBack(error);
  //                           }
  //                           // return callBack("Invoice Added Successfully");
  //                           return callBack(iresults);
  //                         }
  //                       );
  //                     });
  //                   }
  //                 );
  //               }
  //             );
  //           }
  //         );
  //         // console.log(custId);
  //       }
  //     );
  //   } else {
  //     pool.query(
  //       `update tblcustomers set customer_name=?, email=?,  mobile=?, city=? where customer_id = ?`,
  //       [
  //         data.customer_name,
  //         data.email,
  //         data.mobile,
  //         data.city,
  //         data.customer_id,
  //       ],
  //       (error, results, fields) => {
  //         if (error) {
  //           return callBack(error);
  //         }
  //       }
  //     );
  //   }

  //   // console.log(custId);
  // },

  // createInvoices: (data, callBack) => {
  //   // Validate input data
  //   if (
  //     !data ||
  //     !data.invoice_date ||
  //     !data.customer_id ||
  //     !data.total_amount ||
  //     !data.invoice_items
  //   ) {
  //     callBack({ error: "Invalid input data" });
  //     return;
  //   }

  //   var query =
  //     "INSERT INTO tblinvoice_details (invoice_date, customer_id, total_amount) VALUES (?, ?, ?)";
  //   var invoiceValues = [
  //     data.invoice_date,
  //     data.customer_id,
  //     data.total_amount,
  //   ];

  //   pool.query(query, invoiceValues, function (err, result) {
  //     if (err) {
  //       callBack({ error: "Error inserting invoice details" });
  //       return;
  //     }

  //     var invoiceId = result.insertId;

  //     var itemQuery =
  //       "INSERT INTO tblinvoice_items (invoice_id, item_id, quantity) VALUES (?, ?, ?)";

  //     var itemInsertions = data.invoice_items.map(function (item) {
  //       var itemValues = [invoiceId, item.item_id, item.quantity];
  //       return new Promise(function (resolve, reject) {
  //         pool.query(itemQuery, itemValues, function (err) {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve();
  //           }
  //         });
  //       });
  //     });

  //     Promise.all(itemInsertions)
  //       .then(function () {
  //         callBack({ msg: "Invoice Details Added Successfully" });
  //       })
  //       .catch(function (err) {
  //         callBack({ error: "Error inserting invoice items" });
  //       });
  //   });
  // },
  // };

  createInvoice: (data, callBack) => {
    // Validate input data
    if (
      !data ||
      !data.invoice_date ||
      !data.customer_id ||
      !data.total_amount
    ) {
      callBack({ error: "Invalid input data" });
      return;
    }

    var query =
      "INSERT INTO tblinvoice_details (invoice_date, customer_id, total_amount) VALUES (?, ?, ?)";
    var invoiceValues = [
      data.invoice_date,
      data.customer_id,
      data.total_amount,
    ];

    pool.query(query, invoiceValues, function (err, result) {
      if (err) {
        callBack({ error: "Error inserting invoice details" });
        return;
      }
      // callBack(result.insertId);
      const maxInvoiceIdQuery =
        "select max(invoice_id) invoice_id from tblinvoice_details";
      pool.query(maxInvoiceIdQuery, function (err, results) {
        if (err) {
          callBack({ error: "Error find max invoice id " });
          return;
        }
        console.log(results[0].invoice_id);
        callBack(results[0].invoice_id);
      });
    });
  },

  insertInvoiceItem: (data, callBack) => {
    // Validate input data
    if (!data || !data.invoice_id || !data.invoice_items) {
      callBack({ error: "Invalid input data" });
      return;
    }
    var itemQuery =
      "INSERT INTO tblinvoice_items (invoice_id, item_id, quantity) VALUES (?, ?, ?)";

    var itemInsertions = data.invoice_items.map(function (item) {
      var itemValues = [data.invoice_id, item.item_id, item.quantity];
      return new Promise(function (resolve, reject) {
        pool.query(itemQuery, itemValues, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    Promise.all(itemInsertions)
      .then(function () {
        callBack({ msg: "Invoice Added Successfully" });
      })
      .catch(function (err) {
        callBack({ error: "Error inserting invoice items" });
      });
  },
};
