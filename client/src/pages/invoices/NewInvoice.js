import React, { useState, useEffect } from "react";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
  TextField,
  TableHead,
  Toolbar,
} from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../../components/controls/Controls";
import Swal from "sweetalert2";
import { useForm, Form } from "../../components/useForm";
import * as allServices from "../../services/allServices";

import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import SendIcon from "@mui/icons-material/Send";
import PageHeader from "../../components/PageHeader";
import { Autocomplete, Box, Typography } from "@mui/material";
import useTable from "../../components/useTable";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
const initialFValues = {
  customer_id: 0,
  customer_name: "",
  email: "",
  mobile: "",
  city: "",
  item_id: "",
  item_name: "",

  purchase_rate: 0,
  selling_rate: 0,
  tax: 0,
  stock_quantity: 0,
  quantity: "",
  total: 0,
  finaltotal: 0,
  // invoice_date: new Date(),
  invoice_date: new Date().toISOString().substr(0, 10),
  // invoice_date: new Date("2015-03-25"),
};

const headCells = [
  { id: "srno", label: "Sr. No." },
  { id: "id", label: "Item Id" },
  { id: "name", label: "Item Name " },
  { id: "selling_rate", label: "Rate( \u20B9 )" },
  { id: "tax", label: "Tax ( % ) " },
  { id: "qnt", label: "Quantity" },
  { id: "total", label: "Total( \u20B9 )" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      // border: "1px solid ",
      borderColor: "grey.500",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  date: {
    marginTop: 2,
  },
}));

export default function NewInvoice(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [invoice_item, setInvoice] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("item_name" in fieldValues)
      temp.item_name = fieldValues.item_name ? "" : "This field is required.";
    if ("purchase_rate" in fieldValues)
      temp.purchase_rate = fieldValues.purchase_rate
        ? ""
        : "This field is required.";
    if ("selling_rate" in fieldValues)
      temp.selling_rate = fieldValues.selling_rate
        ? ""
        : "This field is required.";
    if ("tax" in fieldValues)
      temp.tax = fieldValues.tax ? "" : "This field is required.";
    if ("stock_quantity" in fieldValues)
      temp.stock_quantity = fieldValues.stock_quantity
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      // console.log(values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const FetchData = async () => {
    const res = await allServices.getAllCustomers();
    setCustomerData(res);
    const pres = await allServices.getAllProducts();
    setProductData(pres);
  };

  const hadleProductChange = async (event) => {
    const itemid = event.target.value;
    if (event.target.value !== "") {
      const res = await allServices.getProductsById(itemid);
      setValues((prevValues) => ({
        ...prevValues,
        quantity: "",
        total: 0,
        item_id: res.item_id,
        item_name: res.item_name,
        selling_rate: res.selling_rate,
        tax: res.tax,
        stock_quantity: res.stock_quantity,
      }));
    }
    Calculate();
  };

  const Calculate = () => {
    const irate = values.selling_rate;
    const ttax = values.tax;
    const qnt = values.quantity;

    var totalamount =
      (Number(irate) + (Number(irate) * Number(ttax)) / 100) * qnt;

    setValues((prevValues) => ({
      ...prevValues,
      total: totalamount.toFixed(2),
    }));
  };

  // const Calculate = () => {
  //   // var irate = rate.current.value;
  //   // var ttax = taxs.current.value;
  //   // var qnt = quantity.current.value;

  //   const irate = values.selling_rate;
  //   const ttax = values.tax;
  //   const qnt = values.quantity;
  //   // const qnt = initialFValues.quantity;

  //   console.log(irate);
  //   console.log(ttax);
  //   console.log(qnt);
  //   // console.log(qnt);

  //   var totalamount =
  //     (Number(irate) + (Number(irate) * Number(ttax)) / 100) * qnt;
  //   // console.log(totalamount);
  //   // total.current.value = totalamount.toFixed(2);
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     total: totalamount.toFixed(2),
  //   }));
  // };

  const handleAddItem = () => {
    var item_id = values.item_id;
    var item_name = values.item_name;
    var irate = values.selling_rate;
    var ttax = values.tax;
    var qnt = values.quantity;
    var ttotal = values.total;
    var final1 = Number(values.finaltotal) + Number(ttotal);
    var final = final1.toFixed(2);

    if (Number(irate) === 0) {
      setNotify({
        isOpen: true,
        message: "Please Select Product",
        type: "error",
      });
    } else if (Number(qnt) === 0 || qnt === "") {
      setNotify({
        isOpen: true,
        message: "Please Enter Quantity ",
        type: "error",
      });
    } else {
      // setFinalTotal(final);
      setValues((prevValues) => ({
        ...prevValues,

        finaltotal: final,
      }));
      var data = {
        item_id: item_id,
        item_name: item_name,
        selling_rate: irate,
        tax: ttax,
        quantity: Number(qnt),
        total: Number(ttotal),
      };
      invoice_item.push(data);

      // console.log(i_data);
      // const iid = item_id;
      // const iname = item_name;
      // const ipur = i_data[0].purchase_rate;
      // const isell = irate;
      // const itaxx = ttax;
      // const current_stock = i_data[0].stock_quantity - qnt;

      // const data1 = {
      //   item_id: iid,
      //   item_name: iname,
      //   purchase_rate: ipur,
      //   selling_rate: isell,
      //   tax: itaxx,
      //   stock_quantity: current_stock,
      // };
      // axios.put(baseUrl + "/items", data1).then((e) => {
      //   FetchData();
      // });
      setValues((prevValues) => ({
        ...prevValues,
        quantity: "",
        total: 0,
        item_id: "",
        item_name: "",
        selling_rate: 0,
        tax: 0,
        stock_quantity: 0,
      }));
    }
  };

  const handleInputChanged = (event, fieldName, value) => {
    const fieldValue = value || event.target.value;
    // setValues({
    //   ...values,
    //   mobile: fieldValue,
    // });
    // If the field name is "mobile" and a value is selected

    if (fieldName === "mobile" && fieldValue) {
      // Find the customer with the selected mobile number
      const selectedCustomer = customerData.find(
        (customer) => customer.mobile === fieldValue
      );

      // console.log(selectedCustomer);
      // setValues({
      //   customer_name: selectedCustomer.customer_name,
      // });
      if (fieldValue !== "mobile" || "") {
        setValues({
          ...values,
          customer_id: 0,
          customer_name: "",
          email: "",
          mobile: fieldValue,
          // mobile: "",
          city: "",
        });
      }
      //If a customer is found, update the customer_name field in the form
      if (selectedCustomer) {
        setValues({
          ...values,
          customer_id: selectedCustomer.customer_id,
          customer_name: selectedCustomer.customer_name,
          email: selectedCustomer.email,
          mobile: selectedCustomer.mobile,
          city: selectedCustomer.city,
        });
      }
    }
  };

  const onDelete = async (key) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    const array = invoice_item[key];
    const item_name = array.item_name;
    const total = array.total;

    // axios.get(baseUrl + "/items/byid?item_id=" + item_id).then((e) => {
    //   const d = e.data;
    //   setSstock(d);
    //   console.log(d);
    // });

    // const current_stock = sstock.stock_quantity + Number(table_stock);
    // console.log("Data Stock=" + sstock);
    // console.log("Table Stock=" + table_stock);
    // console.log("Current Stock=" + current_stock);

    const afinal = Number(values.finaltotal) - total;
    const final = afinal.toFixed(2);
    // setFinalTotal(final);

    setValues((prevValues) => ({
      ...prevValues,

      finaltotal: final,
    }));
    // setSstock([]);
    // const newdata = {
    //   item_id: item_id,
    //   item_name: item_name,
    //   purchase_rate: purchase_rate,
    //   selling_rate: selling_rate,
    //   tax: tax,
    //   stock_quantity: current_stock,
    // };

    // console.log(newdata);

    // axios.put(baseUrl + "/items", newdata).then((e) => {});

    const index = key;

    invoice_item.splice(index, 1);
    setInvoice(invoice_item);
    // alert(item_name + " is Remove Successfully");
    setNotify({
      isOpen: true,
      message: item_name + " is Remove Successfully",
      type: "error",
    });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // setConfirmDialog({
    //   ...confirmDialog,
    //   isOpen: false,
    // });

    const data = {
      customer_id: values.customer_id,
      customer_name: values.customer_name,
      email: values.email,
      mobile: values.mobile,
      city: values.city,
      invoice_date: values.invoice_date,
      total_amount: values.finaltotal,
      invoice_items: invoice_item,
    };
    // console.log(data);
    if (!data) {
      setNotify({
        isOpen: true,
        message: "Invalid Data",
        type: "error",
      });
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: "Are you Sure to genrate Invvoice ?",
      subTitle: "You can't undo this operation",
      onConfirm: async () => {
        const res = await allServices.createInvoice(data);
        setNotify({
          isOpen: true,
          message: res,
          type: "success",
        });
        resetForm();
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        // navigate(-1);
      },
    });

    // const res = await allServices.createInvoice(data);
    // setNotify({
    //   isOpen: true,
    //   message: res,
    //   type: "success",
    // });
    // resetForm();
    // navigate(-1);

    // await Swal.fire({
    //   title: "Are you sure?",
    //   text: "You have Genrate Invoice !",
    //   // icon: "warning",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Genrate it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // const res = allServices.createInvoice(data);
    //     // Swal.fire("Genrated!", `${res}`, "success");
    //     Swal.fire("Genrated!", "Your Invoice has been Genrated.", "success");
    //   } else if (
    //     /* Read more about handling dismissals below */
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     Swal.fire("Cancelled!", "Your Invoice is Not Genrated...", "error");
    //   }
    // });
  };

  useEffect(() => {
    FetchData();
  }, [values]);
  return (
    <>
      <PageHeader
        title="Generate Invoice !!"
        subTitle="You can Generate Invoice new Invoice..."
        icon={<InventoryIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent} elevation={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
          }}
        >
          <Toolbar>
            <Button
              float="left"
              type="submit"
              text="Back"
              startIcon={<ArrowBackIosNewRoundedIcon />}
              variant="contained"
              onClick={() => navigate(-1)}
              color="inherit"
              size="large"
            >
              Back
            </Button>
          </Toolbar>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
              // width: "100%",
            }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Controls.DatePicker
              name="invoice_date"
              label="Invoice Date"
              value={values.invoice_date}
              onChange={handleInputChange}
              disabled={true}
            />
          </Toolbar>
        </Box>

        <TableContainer>
          <Table className={classes.table}>
            <TableHead></TableHead>

            <TableBody>
              {/* <TableRow>
                 <TableCell
                  colSpan={2}
                  style={{
                    float: "right",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Controls.DatePicker
                    name="invoice_date"
                    label="Invoice Date"
                    value={values.invoice_date}
                    onChange={handleInputChange}
                    disabled={true}
                  />
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={customerData.map((option) => `${option.mobile}`)}
                    onKeyUp={(event, value) =>
                      handleInputChanged(event, "mobile", value)
                    }
                    onChange={(event, value) =>
                      handleInputChanged(event, "mobile", value)
                    }
                    onClick={(event, value) =>
                      handleInputChanged(event, "mobile", value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <Controls.Input
                    name="customer_name"
                    label="Customer Name"
                    variant="standard"
                    value={values.customer_name}
                    onChange={handleInputChange}
                    error={errors.customer_name}
                    fullWidth
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <Controls.Input
                    name="email"
                    label="Email Address"
                    variant="standard"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    fullWidth
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <Controls.Input
                    name="city"
                    label="Address"
                    variant="standard"
                    value={values.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              {/* <TableBody> */}
              <TableRow>
                <TableCell>
                  <FormControl
                    variant="standard"
                    className={classes.formControl}
                    fullWidth
                    style={{ width: "140px" }}
                  >
                    <InputLabel>Select Product</InputLabel>
                    <Select
                      value={values.item_id}
                      onChange={hadleProductChange}
                      // defaultValue={0}
                      displayEmpty
                    >
                      <MenuItem value={"none"} disabled>
                        <em>None</em>
                      </MenuItem>
                      {productData.map((item, index) => (
                        <MenuItem value={item.item_id} key={index}>
                          {item.item_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Controls.Input
                    name="rate"
                    label="Rate"
                    variant="standard"
                    value={values.selling_rate}
                    onChange={handleInputChange}
                    error={errors.selling_rate}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Controls.Input
                    name="tax"
                    label="Tax"
                    variant="standard"
                    value={values.tax}
                    onChange={handleInputChange}
                    error={errors.tax}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Controls.Input
                    name="stock_quantity"
                    label="Stock Quantity"
                    variant="standard"
                    value={values.stock_quantity}
                    onChange={handleInputChange}
                    error={errors.stock_quantity}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell>
                  {/* <Controls.Input
                    name="quantity"
                    label="Quantity"
                    variant="standard"
                    value={values.quantity}
                    onChange={handleInputChange}
                    error={errors.quantity}
                    fullWidth
                  /> */}
                  <TextField
                    name="quantity"
                    label="Quantity"
                    variant="standard"
                    value={values.quantity}
                    onChange={handleInputChange}
                    onKeyUp={Calculate}
                    error={errors.quantity}
                    fullWidth
                    autoComplete="off"
                  />
                </TableCell>
                <TableCell>
                  <Controls.Input
                    name="total"
                    label="Total"
                    variant="standard"
                    value={values.total}
                    onChange={handleInputChange}
                    error={errors.total}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    text="Add"
                    variant="contained"
                    onClick={handleAddItem}
                    color="primary"
                    size="large"
                  >
                    ADD
                  </Button>
                </TableCell>
              </TableRow>
              {/* </TableBody> */}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headCells.map((item, index) => (
                  <TableCell key={index}>{item.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice_item.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.item_id}</TableCell>
                  <TableCell key={index}>{item.item_name}</TableCell>
                  <TableCell>{item.selling_rate}</TableCell>
                  <TableCell>{item.tax}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>
                    {/* <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton> */}
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(index);
                          },
                        });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6}></TableCell>
                <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
                  Total Amount ={values.finaltotal} &#8377;
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Toolbar
          sx={{
            p: 1,
            m: 1,
          }}
        >
          <Controls.Button type="submit" text="Submit" onClick={handleSubmit} />
        </Toolbar>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
