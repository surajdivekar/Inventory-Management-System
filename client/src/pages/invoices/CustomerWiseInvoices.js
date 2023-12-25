import React, { useCallback, useEffect, useState } from "react";
import ViewInvoice from "../invoices/ViewInvoice";
import PageHeader from "../../components/PageHeader";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import InputAdornment from "@mui/material/InputAdornment";
import useTable from "../../components/useTable";
import * as allServices from "../../services/allServices";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import format from "date-fns/format";
// import { parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "80%",
  },
  // newButton: {
  //   position: "absolute",
  //   right: "10px",
  // },
  sendButton: {
    position: "absolute",
    right: "160px",
  },
  selectCount: {
    margin: theme.spacing(-20),
  },

  customerDetails: {
    // paddingLeft: theme.spacing(5),
    // padding: theme.spacing(3),
    margin: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
      fontSize: 15,
      textTransform: "uppercase",
    },
  },
}));

const headCells = [
  { id: "srno", label: "Sr. No." },
  { id: "id", label: "Invoice Id" },
  // { id: "name", label: "Customer Name" },
  { id: "email", label: "Invoice Date" },
  { id: "mobile", label: "Total (\u20B9)", disableSorting: true },
  { id: "paidamt", label: "Paid (\u20B9)", disableSorting: true },
  { id: "remamt", label: "Remaining (\u20B9)", disableSorting: true },
  { id: "status", label: "Status", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
  { id: "view", label: "View Invoice", disableSorting: true },
];

export default function CustomerWiseInvoices() {
  let { customer_id } = useParams();

  const classes = useStyles();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [customer_records, setCustRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const FetchData = useCallback(async () => {
    const data = await allServices.getCustomerIdWiseInvoices(customer_id);
    setRecords(data.reverse());
    const customerdata = await allServices.getCustomerIdWiseInvoicesDetails(
      customer_id
    );
    setCustRecords(customerdata);
  }, [customer_id]);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    TblEmptyRows,
    EnhancedTableToolbar,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.customer_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  // const navigate = useNavigate();
  const navigatePage = () => {
    navigate("/sidebar/newinvoices");
  };

  return (
    <>
      <PageHeader
        title="Customer All Invoices"
        subTitle="You can Generate Invoice, Pay Invoice or View Invoice"
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
              variant="contained"
              startIcon={<ArrowBackIosNewRoundedIcon />}
              onClick={() => navigate(-1)}
              color="inherit"
              size="large"
            >
              Back
            </Button>
          </Toolbar>
          <Toolbar style={{ float: "right" }}>
            <Controls.Button
              text="Add New Invoice"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              // onClick={() => navigate("sidebar/newinvoices")}
              onClick={navigatePage}
            />
          </Toolbar>
        </Box>
        {/* <Box sx={{ m: 5 }} className={classes.customerDetails}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
            component="div"
          >
            <strong>CUSTOMER NAME:</strong>{" "}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {customer_records.customer_name}
          </Typography>
        </Box> */}

        <Grid
          container
          spacing={3}
          // style={{ marginLeft: 5 }}
          className={classes.customerDetails}
        >
          <Grid item xs={8}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              component="div"
            >
              <strong>CUSTOMER DETAILS</strong>
            </Typography>

            <Typography variant="subtitle2" component="div">
              {customer_records.customer_name}
            </Typography>
            <Typography variant="subtitle2" component="div">
              <EmailIcon fontSize="small" /> {customer_records.email}
            </Typography>
            <Typography variant="subtitle2" component="div">
              <CallIcon fontSize="small" /> {customer_records.mobile}
            </Typography>
            <Typography variant="subtitle2" component="div">
              <LocationOnIcon fontSize="small" /> {customer_records.city}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              component="div"
            >
              {/* <strong>CUSTOMER DETAILS</strong> */}
            </Typography>
            <Typography> &nbsp;</Typography>
            <Typography> &nbsp;</Typography>
            <div style={{ display: "flex" }}>
              <Typography style={{ fontSize: 16 }}>
                <strong>TOTAL AMOUNT :&nbsp; </strong>
              </Typography>
              <Typography variant="subtitle2" component="div">
                {customer_records.total_amount}&nbsp;{"\u20B9"}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography style={{ fontSize: 16 }}>
                <strong>PAID AMOUNT :&nbsp; </strong>
              </Typography>
              <Typography variant="subtitle2" component="div">
                {customer_records.total_paid_amount}&nbsp;{"\u20B9"}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography style={{ fontSize: 16 }}>
                <strong>REMAINING AMOUNT :&nbsp; </strong>
              </Typography>
              <Typography variant="subtitle2" component="div">
                {customer_records.remaining_amount}&nbsp;{"\u20B9"}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Toolbar>
          <Controls.Input
            label="Search Invoice"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />

          {/* <Controls.Button
            text="Add New Invoice"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            // onClick={() => navigate("sidebar/newinvoices")}
            onClick={navigatePage}
          /> */}
        </Toolbar>

        <TblContainer>
          <TblHead rowCount={records.length} data={records} />

          <TableBody>
            {recordsAfterPagingAndSorting().map((item, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  // hover
                  // onClick={(event) => {
                  //   handleClick(event, item);
                  // }}
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      // onClick={(event) => {
                      //   handleClick(event, item);
                      //   SetRecordForSendMail(item.email);
                      // }}
                      checked={""}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.invoice_id}</TableCell>
                  {/* <TableCell key={index}>{item.customer_name}</TableCell> */}

                  <TableCell>
                    {new Date(item.invoice_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  {/* <TableCell>{item.invoice_date.substring(0, 10)}</TableCell> */}
                  {/* <TableCell>
                    {format(parseISO(item.invoice_date), "MMM/dd/yyyy")}
                  </TableCell> */}

                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.total_paid_amount}</TableCell>
                  <TableCell>{item.remaining_amount}</TableCell>
                  <TableCell>{item.status}</TableCell>

                  <TableCell>
                    {/* <span hidden={!item.btnstatus}>
                      <Link to={"/sidebar/payinvoice/" + item.invoice_id}>
                        Pay Bill
                      </Link>
                    </span>

                    <span hidden={item.btnstatus}>
                      <span
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        -
                      </span>
                    </span> */}

                    {item.btnstatus ? (
                      <Link to={"/sidebar/payinvoice/" + item.invoice_id}>
                        Pay Bill
                      </Link>
                    ) : (
                      <span
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Link to={"/sidebar/payinvoice/" + item.invoice_id}>
                          -
                        </Link>
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <NavLink
                      style={{
                        // textDecoration: "none",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      to={"/sidebar/viewinvoice/" + item.invoice_id}
                    >
                      {/* <span
                        style={{
                          // textDecoration: "none",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      > */}
                      <Tooltip
                        title="View Invoice"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        arrow
                        placement="top"
                      >
                        <IconButton size="medium" color="secondary">
                          {/* <Controls.ActionButton color="secondary"> */}
                          <VisibilityOutlinedIcon fontSize="small" />
                          {/* </Controls.ActionButton> */}
                        </IconButton>
                      </Tooltip>
                      {/* </span> */}
                    </NavLink>

                    {/* <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        openInPopup(item.invoice_id);
                      }}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </Controls.ActionButton> */}
                  </TableCell>
                </TableRow>
              );
            })}
            <TblEmptyRows rows={records} />
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
