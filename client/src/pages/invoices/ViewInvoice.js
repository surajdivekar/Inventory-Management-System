import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as customerServices from "../../services/allServices";
import PageHeader from "../../components/PageHeader";
import InventoryIcon from "@mui/icons-material/Inventory";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";

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
  Typography,
  Card,
  Grid,
  Tooltip,
  IconButton,
  Fade,
} from "@material-ui/core";

import InputAdornment from "@mui/material/InputAdornment";
import useTable from "../../components/useTable";
import * as allServices from "../../services/allServices";

import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import ViewPopup from "../../components/ViewPopup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReactToPrint from "react-to-print";
import { BsFillPrinterFill } from "react-icons/bs";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(0.5),
//   },
//   label: {
//     textTransform: "none",
//   },
// }));
const headCells = [
  { id: "srno", label: "Sr. No." },
  { id: "name", label: "Item Name" },
  { id: "rate", label: "Rate" },
  { id: "tax", label: "Tax (%)", disableSorting: true },
  { id: "quantity", label: "Quantity", disableSorting: true },
  { id: "total", label: "Total", disableSorting: true },
];

const transactionheadCells = [
  { id: "srno", label: "Sr. No." },
  { id: "date", label: "Payment Date" },
  { id: "mode", label: "Payment Mode" },
  { id: "des", label: "Payment Description" },
  { id: "payamt", label: "Payment Ammount", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
    margin: theme.spacing(0.5),
  },

  label: {
    textTransform: "none",
  },
  pageContent: {
    margin: theme.spacing(5),
    // padding: theme.spacing(2),
  },
  pageHeader: {
    padding: theme.spacing(4),
    // display: "flex",
    backgroundColor: "#f8f9fa",
    fontSize: 50,
    // marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    // justifyContent: "center",
    // justifyItems: "center",
    color: "#3c44b1",
  },
  pageTitle: {
    flexGrow: 1, // Add flexGrow property to allow the title to expand and push to the right
    textAlign: "right", // Align the title to the right side
    paddingLeft: theme.spacing(2),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
      fontSize: 20,
      textTransform: "uppercase",
    },
  },
  billinginfo: {
    // paddingLeft: theme.spacing(5),
    // padding: theme.spacing(3),
    margin: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
      fontSize: 15,
      textTransform: "uppercase",
    },
  },
  table: {
    marginTop: theme.spacing(2),

    "& thead th": {
      fontWeight: "600",
      // color: theme.palette.primary.main,
      color: "black",
      backgroundColor: theme.palette.primary.light,
      textAlign: "center",
    },
    "& tbody td": {
      fontWeight: "300",
      textAlign: "center",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      // cursor: "pointer",
    },
  },

  print: {
    display: "flex",
    justifyContent: "right",
    marginRight: 60,
    marginTop: 50,
    marginBottom: -30,
  },
  printer: {
    transition: "transform 0.3s", // Add a transition for smooth animation
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)", // Increase the scale on hover
    },
  },
}));
export default function ViewInvoice(props) {
  let { invoice_id } = useParams();
  // const { invoice_id } = props;
  const navigate = useNavigate();

  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const printRef = useRef();

  const {
    TblContainer,
    TblHead,
    TblPagination,
    TblEmptyRows,
    EnhancedTableToolbar,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells);

  const FetchData = useCallback(async () => {
    const res = await allServices.getUserDetails();
    setUserDetails(res);
    const invoiceres = await allServices.getInvoiceDetailsById(invoice_id);
    setInvoiceDetails(invoiceres);
    // console.log(invoiceres);
    const itemres = await allServices.getAllInvoiceItems(invoice_id);
    setItemDetails(itemres);
    const payres = await allServices.getInvoiceIdWisePayments(invoice_id);
    setTransactionDetails(payres);
  }, [invoice_id]);

  useEffect(() => {
    FetchData();
    // console.log(invoiceDetails);
  }, [FetchData, invoice_id]);

  return (
    <>
      <PageHeader
        title=" Invoice Section !!"
        subTitle="You can Generate Invoice new Invoice..."
        icon={<InventoryIcon fontSize="large" />}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          m: 1,
          mb: -5,
        }}
      >
        <Toolbar>
          <Button
            float="left"
            type="submit"
            text="Back"
            variant="contained"
            startIcon={<ArrowBackIosNewRoundedIcon />}
            onClick={() => navigate(-1)}
            color="inherit"
            size="large"
          >
            Back
          </Button>
        </Toolbar>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: 40,
          }}
        >
          <Controls.Button
            text="PAY"
            variant="outlined"
            startIcon={<PaymentRoundedIcon />}
            // onClick={() => navigate("sidebar/newinvoices")}
            // onClick={""}
          />

          <ReactToPrint
            trigger={() => (
              <Tooltip
                title="Print Invoice"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                arrow
                placement="top"
              >
                <IconButton>
                  <BsFillPrinterFill
                    size={35}
                    className={classes.printer}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}
                  />
                </IconButton>
              </Tooltip>
            )}
            content={() => printRef.current}
          ></ReactToPrint>
        </Toolbar>
      </Box>

      {/* <div className={classes.print}>
        <ReactToPrint
          trigger={() => (
            <Tooltip
              title="Print Invoice"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <IconButton>
                <BsFillPrinterFill
                  size={35}
                  className={classes.printer}
                  onMouseOver={({ target }) => (target.style.color = "blue")}
                  onMouseOut={({ target }) => (target.style.color = "black")}
                />
              </IconButton>
            </Tooltip>
          )}
          content={() => printRef.current}
        ></ReactToPrint>
      </div> */}

      {/* <div>
        <Button style={{ float: "right" }} className="zoom">
          <ReactToPrint
            trigger={() => (
              <BsFillPrinterFill
                size={25}
                onMouseOver={({ target }) => (target.style.color = "blue")}
                onMouseOut={({ target }) => (target.style.color = "black")}
              />
            )}
            content={() => printRef.current}
          ></ReactToPrint>
        </Button>
      </div> */}
      <Paper className={classes.pageContent} elevation={3}>
        <div id="dvprint" ref={printRef}>
          <div className={classes.pageHeader} style={{ display: "flex" }}>
            <Card className={classes.pageIcon}>Logo</Card>
            <div className={classes.pageTitle}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                style={{ textTransform: "uppercase" }}
                component="div"
              >
                <strong>{userDetails.shop_name}</strong>
              </Typography>
              <Typography variant="subtitle2" component="div">
                <CallIcon /> {userDetails.mobile} / {userDetails.shop_phone}
              </Typography>
              <Typography variant="subtitle2" component="div">
                <EmailIcon /> {userDetails.email}
              </Typography>
              <Typography variant="subtitle2" component="div">
                <LocationOnIcon /> {userDetails.address}
              </Typography>

              <Typography variant="subtitle2"> {userDetails.city}</Typography>
            </div>
          </div>

          <Grid
            container
            spacing={3}
            // style={{ marginLeft: 5 }}
            className={classes.billinginfo}
          >
            <Grid item xs={8}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                component="div"
              >
                <strong>BILLED TO</strong>
              </Typography>
              <Typography variant="subtitle2" component="div">
                {invoiceDetails.customer_name}
              </Typography>
              <Typography variant="subtitle2" component="div">
                <EmailIcon fontSize="small" /> {invoiceDetails.email}
              </Typography>
              <Typography variant="subtitle2" component="div">
                <CallIcon fontSize="small" /> {invoiceDetails.mobile}
              </Typography>
              <Typography variant="subtitle2" component="div">
                <LocationOnIcon fontSize="small" /> {invoiceDetails.city}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography> &nbsp;</Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                component="div"
              >
                <strong>INVOICE ID :</strong>{" "}
              </Typography>
              <Typography variant="subtitle2">
                {invoiceDetails.invoice_id}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                component="div"
              >
                <strong>INVOICE DATE :</strong>{" "}
              </Typography>
              <Typography variant="subtitle2">
                {new Date(invoiceDetails.invoice_date).toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </Typography>
            </Grid>
          </Grid>

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
                {itemDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.selling_rate}</TableCell>
                    <TableCell>{item.tax}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {(Number(item.selling_rate) +
                        (item.selling_rate * item.tax) / 100) *
                        item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {transactionheadCells.map((item, index) => (
                    <TableCell key={index}>{item.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    {/* <TableCell>{item.payment_date}</TableCell> */}
                    <TableCell>
                      {new Date(item.payment_date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{item.payment_mode}</TableCell>
                    <TableCell>{item.payment_description}</TableCell>
                    <TableCell>{item.payment_amount}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell
                    colSpan={2}
                    style={{ flexGrow: 1, textAlign: "right" }}
                  >
                    {invoiceDetails.status === "Paid" ? (
                      <Typography
                        variant="h4"
                        style={{ textTransform: "uppercase", color: "green" }}
                        component="div"
                      >
                        <strong>{invoiceDetails.status}</strong>
                      </Typography>
                    ) : (
                      <Typography
                        variant="h4"
                        style={{ textTransform: "uppercase", color: "red" }}
                        component="div"
                      >
                        <strong>{invoiceDetails.status}</strong>
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    style={{ flexGrow: 1, textAlign: "right", fontSize: 50 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                      component="div"
                    >
                      <strong>Total Amount :</strong>{" "}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                      component="div"
                    >
                      <strong>Paid Amount :</strong>{" "}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                      component="div"
                    >
                      <strong>Remaining Amount :</strong>{" "}
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    style={{ flexGrow: 1, textAlign: "left" }}
                  >
                    <Typography>
                      <span style={{ opacity: 0.8 }}>
                        <strong> {invoiceDetails.total_amount} &#8377;</strong>
                      </span>
                    </Typography>
                    <Typography>
                      <span style={{ opacity: 0.8 }}>
                        {invoiceDetails.total_paid_amount} &#8377;
                      </span>
                    </Typography>
                    <Typography>
                      <span style={{ opacity: 0.8 }}>
                        {invoiceDetails.remaining_amount} &#8377;
                      </span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </>
  );
}
