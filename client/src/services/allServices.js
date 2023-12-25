import axios from "axios";
const baseUrl = "http://localhost:9091/api/";

const arrayOfData = localStorage.getItem("LoginData");
const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
// console.log(d);
let user_id = d.user_id;

const auth = `bearer ${JSON.parse(localStorage.getItem("token"))}`;

//User Details

export const getUserDetails = async () => {
  // const arrayOfData = localStorage.getItem("LoginData");
  // const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
  // let user_id = d[0].user_id;
  if (!d) {
    return [];
  }
  return d;
};

//Customer Services
export const getAllCustomers = async () => {
  // const res = await axios.get(baseUrl + "customers/" + user_id, {
  const res = await axios.get(`${baseUrl}customers/${user_id}`, {
    headers: {
      authorization: auth,
    },
  });
  // console.log(res.data.data);
  if (!res.data.data) {
    return [];
  }
  return res.data.data;
};

export const insertCustomer = async (data) => {
  var insertData = {
    customer_name: data.customer_name,
    email: data.email,
    mobile: data.mobile,
    city: data.city,
    user_id: user_id,
  };
  const res = await axios.post(`${baseUrl}customers`, insertData, {
    headers: {
      authorization: auth,
    },
  });
  console.log(res.data);
  return res.data.message;
  // return "Inserted";
};

export const updateCustomer = async (data) => {
  const res = await axios.patch(`${baseUrl}customers`, data, {
    headers: {
      authorization: auth,
    },
  });
  return res.data.message;
};

export const deleteCustomer = async (id) => {
  // const res = await axios.delete(baseUrl + "customers?customer_id=" + data);
  const res = await axios.delete(`${baseUrl}customers/${id}`, {
    headers: {
      authorization: auth,
    },
  });
  return res.data.message;
};

//Product Services
export const getAllProducts = async () => {
  const res = await axios.get(`${baseUrl}products/${user_id}`, {
    headers: {
      authorization: auth,
    },
  });
  // console.log(res.data.data);

  return res.data.data;
};

export const getProductsById = async (id) => {
  const res = await axios.get(`${baseUrl}products/byid/${id}`, {
    headers: {
      authorization: auth,
    },
  });
  return res.data.data;
};

export const insertProduct = async (data) => {
  var insertData = {
    item_name: data.item_name,
    purchase_rate: data.purchase_rate,
    selling_rate: data.selling_rate,
    tax: data.tax,
    stock_quantity: data.stock_quantity,
    user_id: user_id,
  };
  const res = await axios.post(`${baseUrl}products`, insertData, {
    headers: {
      authorization: auth,
    },
  });

  return res.data.message;
};

export const updateProduct = async (data) => {
  const res = await axios.patch(`${baseUrl}products`, data, {
    headers: {
      authorization: auth,
    },
  });
  console.log(res.data.msg);
  return res.data.message;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${baseUrl}products/${id}`, {
    headers: {
      authorization: auth,
    },
  });
  return res.data.message;
};

//invoices Services

export const getAllInvoices = async () => {
  const invoiceData = [];

  const res = await axios.get(`${baseUrl}invoices/${user_id}`, {
    headers: {
      authorization: auth,
    },
  });
  if (!res.data.data) {
    return invoiceData;
  } else {
    res.data.data.forEach((data, i) => {
      var btnstatus = true;
      if (data.status === "Paid") {
        btnstatus = false;
      }

      var idata = {
        invoice_id: data.invoice_id,
        customer_id: data.customer_id,
        customer_name: data.customer_name,
        customer_email: data.email,
        customer_mobile: data.mobile,
        customer_city: data.city,
        invoice_date: data.invoice_date,
        total_amount: data.total_amount.toFixed(2),
        total_paid_amount: data.total_paid_amount.toFixed(2),
        remaining_amount: data.remaining_amount.toFixed(2),
        status: data.status,
        btnstatus: btnstatus,
      };
      invoiceData.push(idata);
    });

    return invoiceData;
  }
  // return invoiceData;
};

export const getCustomerIdWiseInvoices = async (customer_id) => {
  const invoiceData = [];

  const res = await axios.get(
    `${baseUrl}invoices/customeridwiseinvoices/${customer_id}`,
    {
      headers: {
        authorization: auth,
      },
    }
  );
  if (!res.data.data) {
    return invoiceData;
  } else {
    res.data.data.forEach((data, i) => {
      var btnstatus = true;
      if (data.status === "Paid") {
        btnstatus = false;
      }

      var idata = {
        invoice_id: data.invoice_id,
        customer_id: data.customer_id,
        customer_name: data.customer_name,
        customer_email: data.email,
        customer_mobile: data.mobile,
        customer_city: data.city,
        invoice_date: data.invoice_date,
        total_amount: data.total_amount.toFixed(2),
        total_paid_amount: data.total_paid_amount.toFixed(2),
        remaining_amount: data.remaining_amount.toFixed(2),
        status: data.status,
        btnstatus: btnstatus,
      };
      invoiceData.push(idata);
    });

    return invoiceData;
  }
  // return invoiceData;
};

export const getAllCustomerGroupWiseInvoices = async () => {
  const invoice_data = [];
  const res = await axios.get(
    `${baseUrl}invoices/customergroupwiseinvoices/${user_id}`,
    {
      headers: {
        authorization: auth,
      },
    }
  );
  var data = res.data.data;
  console.log(data);
  if (!res.data.data) {
    return invoice_data;
  } else {
    data.forEach((item, i) => {
      var idata = {
        customer_id: item.customer_id,
        customer_name: item.customer_name,
        total_amount: item.total_amount.toFixed(2),
        total_paid_amount: item.total_paid_amount.toFixed(2),
        remaining_amount: item.remaining_amount.toFixed(2),
      };
      invoice_data.push(idata);
    });
    return invoice_data;
  }
};

export const getCustomerIdWiseInvoicesDetails = async (customer_id) => {
  const invoice_data = [];
  const res = await axios.get(
    `${baseUrl}invoices/customeridwiseinvoicedetails/${customer_id}`,
    {
      headers: {
        authorization: auth,
      },
    }
  );

  var data = res.data.data;
  // console.log(data);
  if (!res.data.data) {
    return invoice_data;
  } else {
    // const data = res.data;
    var idata = {
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      email: data.email,
      mobile: data.mobile,
      city: data.city,
      total_amount: data.total_amount.toFixed(2),
      total_paid_amount: data.total_paid_amount.toFixed(2),
      remaining_amount: data.remaining_amount.toFixed(2),
    };
    invoice_data.push(idata);
    console.log(invoice_data);
  }
  return invoice_data[0];
};

export const getInvoiceDetailsById = async (invoice_id) => {
  const res = await axios.get(`${baseUrl}invoices/byid/${invoice_id}`, {
    // const res = await axios.get(`${baseUrl}invoices/byid/95`, {
    headers: {
      authorization: auth,
    },
  });
  // console.log(res.data.data);
  var data = res.data.data;
  console.log(data);

  const indata = {
    invoice_id: data.invoice_id,
    customer_id: data.customer_id,
    customer_name: data.customer_name,
    email: data.email,
    mobile: data.mobile,
    city: data.city,
    invoice_date: data.invoice_date,
    total_amount: data.total_amount.toFixed(2),
    total_paid_amount: data.total_paid_amount.toFixed(2),
    remaining_amount: data.remaining_amount.toFixed(2),
    status: data.status,
  };

  return indata;
};

export const getAllInvoiceItems = async (invoice_id) => {
  const res = await axios.get(`${baseUrl}invoices/byidwiseitem/${invoice_id}`, {
    // const res = await axios.get(`${baseUrl}invoices/byid/95`, {
    headers: {
      authorization: auth,
    },
  });
  // console.log(res);
  return res.data.data;
};
export const getInvoiceIdWisePayments = async (invoice_id) => {
  const res = await axios.get(
    `${baseUrl}invoices/byidwisepayment/${invoice_id}`,
    {
      // const res = await axios.get(`${baseUrl}invoices/byid/95`, {
      headers: {
        authorization: auth,
      },
    }
  );
  // console.log(res);
  return res.data.data;
};

export const createInvoice = async (data) => {
  var invoiceData = {
    customer_id: data.customer_id,
    customer_name: data.customer_name,
    email: data.email,
    mobile: data.mobile,
    city: data.city,
    invoice_date: data.invoice_date,
    // invoice_date: "2023-15-03",
    total_amount: Number(data.total_amount),
    invoice_items: data.invoice_items,
    user_id: user_id,
  };

  console.log(invoiceData);

  const res = await axios.post(`${baseUrl}invoices`, invoiceData, {
    headers: {
      authorization: auth,
    },
  });
  console.log(res);
  return res.data.message;
  // return "hiii";
};

export const getCustomerById = () => {};
export const sendEmails = () => {};
