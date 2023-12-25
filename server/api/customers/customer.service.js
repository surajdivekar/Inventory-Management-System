const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into tblcustomers(customer_name,email,mobile,city,user_id) values(?,?,?,?,?)`,
      [data.customer_name, data.email, data.mobile, data.city, data.user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        pool.query(
          `select max(customer_id) customer_id from tblcustomers`,
          (error, res, fiel) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, res[0].customer_id);
          }
        );
      }
    );
  },
  getCustomers: (id, callBack) => {
    pool.query(
      `select * from tblcustomers where flag=0 AND user_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCustomersByid: (id, callBack) => {
    pool.query(
      `select * from tblcustomers where customer_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateCustomer: (data, callBack) => {
    pool.query(
      `update tblcustomers set customer_name=?, email=?,  mobile=?, city=? where customer_id = ?`,
      [
        data.customer_name,
        data.email,
        data.mobile,
        data.city,
        data.customer_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },

  deleteCustomer: (id, callBack) => {
    pool.query(
      `update tblcustomers set flag=1 where customer_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },
};
