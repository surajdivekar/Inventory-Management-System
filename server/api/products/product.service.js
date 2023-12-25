const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into tblitems(item_name,purchase_rate,selling_rate,tax,stock_quantity,user_id) values(?,?,?,?,?,?)`,
      [
        data.item_name,
        data.purchase_rate,
        data.selling_rate,
        data.tax,
        data.stock_quantity,
        data.user_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProducts: (id, callBack) => {
    pool.query(
      `select * from tblitems where flag=0 AND user_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductByid: (id, callBack) => {
    pool.query(
      `select * from tblitems where item_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateProduct: (data, callBack) => {
    pool.query(
      `update tblitems set item_name=?, purchase_rate=?,  selling_rate=?, tax=?, stock_quantity=? where item_id = ?`,
      [
        data.item_name,
        data.purchase_rate,
        data.selling_rate,
        data.tax,
        data.stock_quantity,
        data.item_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },

  deleteProduct: (id, callBack) => {
    pool.query(
      `update tblitems set flag=1 where item_id = ?`,
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
