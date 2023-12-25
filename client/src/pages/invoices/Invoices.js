import React, { useCallback, useEffect, useState } from "react";
import ViewInvoice from "../invoices/ViewInvoice";
import PageHeader from "../../components/PageHeader";
import InventoryIcon from "@mui/icons-material/Inventory";

import Paper from "@mui/material/Paper";
import {
  Checkbox,
  Fade,
  IconButton,
  Link,
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
import ViewPopup from "../../components/ViewPopup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
  newButton: {
    position: "absolute",
    right: "10px",
  },
  sendButton: {
    position: "absolute",
    right: "160px",
  },
  selectCount: {
    margin: theme.spacing(-20),
  },
}));

const headCells = [
  //   { id: "srno", label: "Sr. No." },
  { id: "id", label: "Customer Id" },
  { id: "name", label: "Customer Name" },
  { id: "total_amt", label: "Total Amount (\u20B9)", disableSorting: true },
  { id: "paidamt", label: "Paid Amount(\u20B9)", disableSorting: true },
  { id: "remamt", label: "Remaining Amount(\u20B9)", disableSorting: true },
  // { id: "actions", label: "Actions", disableSorting: true },
  { id: "view", label: "View Invoices", disableSorting: true },
];

export default function Invoices() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [recordForView, setRecordForView] = useState(null);

  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [selected, setSelected] = React.useState([]);

  const FetchData = useCallback(async () => {
    const data = await allServices.getAllCustomerGroupWiseInvoices();
    setRecords(data.reverse());
  }, []);
  useEffect(() => {
    FetchData();
  }, [FetchData]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    TblEmptyRows,
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const navigate = useNavigate();
  const navigatePage = () => {
    navigate("/sidebar/newinvoices");
  };

  return (
    <>
      <PageHeader
        title="Invoice Section"
        subTitle="You can Generate Invoice, Customer Wise View Invoice Details"
        icon={<InventoryIcon fontSize="large" />}
      />

      <Paper className={classes.pageContent} elevation={3}>
        <Toolbar>
          <Controls.Input
            label="Search Customer"
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

          <Controls.Button
            text="Add New Invoice"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            // onClick={() => navigate("sidebar/newinvoices")}
            onClick={navigatePage}
          />
        </Toolbar>

        <TblContainer>
          <TblHead
            numSelected={selected.length}
            rowCount={records.length}
            data={records}
          />

          <TableBody>
            {recordsAfterPagingAndSorting().map((item, index) => {
              const isItemSelected = isSelected(item);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  // role="checkbox"
                  // aria-checked={isItemSelected}
                  // tabIndex={-1}
                  key={index}
                  // selected={isItemSelected}
                  // sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.customer_id}</TableCell>
                  <TableCell key={index}>{item.customer_name}</TableCell>
                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.total_paid_amount}</TableCell>
                  <TableCell>{item.remaining_amount}</TableCell>
                  <TableCell>
                    {/* <Link
                      to={"/sidebar/customerwiseinvoices/" + item.customer_id}
                    >
                      View Invoices
                    </Link> */}
                    <NavLink
                      style={{
                        // textDecoration: "none",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      to={"/sidebar/customerwiseinvoices/" + item.customer_id}
                    >
                      View Invoice
                    </NavLink>
                  </TableCell>
                </TableRow>
              );
            })}
            <TblEmptyRows rows={records} />
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <ViewPopup
        title="View Invoice"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ViewInvoice invoice_id={recordForView} />
      </ViewPopup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
