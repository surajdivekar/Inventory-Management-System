const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into tbluser(owner_name, shop_name, email, mobile, shop_phone, address,password) 
                    values(?,?,?,?,?,?,?)`,
      [
        data.owner_name,
        data.shop_name,
        data.email,
        data.mobile,
        data.shop_phone,
        data.address,
        data.password,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(`select * from tbluser`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from tbluser where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select user_id,owner_name, shop_name, email, mobile, shop_phone, address from tbluser where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateUser: (data, callBack) => {
    pool.query(
      `update tbluser set owner_name=?, shop_name=?, email=?, mobile=?, shop_phone=?, address=?, password=? where user_id = ?`,
      [
        data.owner_name,
        data.shop_name,
        data.email,
        data.mobile,
        data.shop_phone,
        data.address,
        data.password,
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

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from tbluser where user_id = ?`,
      [data.user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
