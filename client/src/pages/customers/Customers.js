import React, { useCallback, useEffect, useState } from "react";
import CustomerForm, { CustomerSendMail } from "../customers/CustomerForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  Fade,
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
import { CheckBox, Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@mui/icons-material/Send";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "70%",
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
  { id: "srno", label: "Sr. No." },
  { id: "id", label: "Customer Id" },
  { id: "name", label: "Customer Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "city", label: "City" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Customers() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  // const [recordForSendMail, setRecordForSendMail] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupsendMail, setopenPopupsendMail] = useState(false);
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
  const [selectAll, setSelectAll] = useState(false);

  const FetchData = useCallback(async () => {
    const data = await allServices.getAllCustomers();
    setRecords(data);
  }, []);

  useEffect(() => {
    FetchData();
  }, []);

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

  const addOrEdit = async (customer, resetForm) => {
    if (customer.customer_id === 0) {
      const res = await allServices.insertCustomer(customer);
      setNotify({
        isOpen: true,
        // message: "Submitted Successfully",
        message: res,
        type: "success",
      });
    } else {
      const res = await allServices.updateCustomer(customer);
      setNotify({
        isOpen: true,
        message: res,
        type: "success",
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // setRecords(customerServices.getAllCustomers());
    FetchData();
  };

  // const openInPopup = (item) => {
  //   setRecordForEdit(item);
  //   setOpenPopup(true);
  // };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const res = await allServices.deleteCustomer(id);

    FetchData();
    setNotify({
      isOpen: true,
      message: res,
      type: "error",
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //     setSelectedEmails([...selectedEmails, name]);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //     setSelectedEmails(selectedEmails.filter((email) => email !== name));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //     setSelectedEmails(selectedEmails.filter((email) => email !== name));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //     setSelectedEmails(selectedEmails.filter((email) => email !== name));
  //   }

  //   setSelected(newSelected);
  // };

  const handleClick = (event, name) => {
    // Handle "Select All"
    if (name === "all") {
      const newSelectedEmails = event.target.checked
        ? records.map((item) => item.email)
        : [];
      setSelectedEmails(newSelectedEmails);
      setSelectAll(event.target.checked);
      return;
    }

    // Handle individual customer selection
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      setSelectedEmails([...selectedEmails, name]);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      setSelectedEmails(selectedEmails.filter((email) => email !== name));
    }

    setSelected(newSelected);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const SetRecordForSendMail = (c) => {
    if (selectedEmails.indexOf(c) === -1) {
      setSelectedEmails([...selectedEmails, c]);
    } else {
      setSelectedEmails(selectedEmails.filter((email) => email !== c));
    }
  };

  const openInPopupsendMails = () => {
    if (selectedEmails.length > 0) {
      setopenPopupsendMail(true);
    } else {
      setNotify({
        isOpen: true,
        message: "Please Select EmailId",
        type: "error",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Customer Section"
        subTitle="You want to ADD, UPDATE or DELETE Customers"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      {/* <Controls.Button
        text="Check Selected"
        variant="outlined"
        startIcon={<AddIcon />}
        className={classes.newButton}
        onClick={checkSelected}
      /> */}
      <Paper className={classes.pageContent} elevation={3}>
        <Toolbar>
          <Controls.Input
            label="Search Customers"
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
            text="Send Mail"
            variant="contained"
            startIcon={<SendIcon />}
            className={classes.sendButton}
            onClick={() => {
              openInPopupsendMails();
            }}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>

        <EnhancedTableToolbar
          // tableTitle={"Customer Details"}
          numSelected={selected.length}
        />

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
                  hover
                  // onClick={(event) => {
                  //   handleClick(event, item);
                  //   SetRecordForSendMail(item.email);
                  // }}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={item.customer_name}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      // onClick={(event) => {
                      //   handleClick(event, item);
                      //   SetRecordForSendMail(item.email);
                      // }}
                      onClick={(event) => {
                        handleClick(event, item);
                        SetRecordForSendMail(item.email);
                      }}
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>

                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                      SetRecordForSendMail(item.email);
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                      SetRecordForSendMail(item.email);
                    }}
                  >
                    {item.customer_id}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                      SetRecordForSendMail(item.email);
                    }}
                  >
                    {item.customer_name}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                      SetRecordForSendMail(item.email);
                    }}
                  >
                    {item.email}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                      SetRecordForSendMail(item.email);
                    }}
                  >
                    {item.mobile}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                      SetRecordForSendMail(item.email);
                    }}
                  >
                    {item.city}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title="Edit Customer"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      arrow
                      placement="top"
                    >
                      <IconButton size="small">
                        <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            openInPopup(item);
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete Customer"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      arrow
                      placement="top"
                    >
                      <IconButton size="small">
                        <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this record?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDelete(item.customer_id);
                              },
                            });
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
            <TblEmptyRows rows={records} />
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Customer Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CustomerForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      {/* <Popup
        title="Send Mail"
        openPopup={openPopupsendMail}
        setOpenPopup={setopenPopupsendMail}
      >
        <CustomerSendMail recordForSendMail={recordForSendMail} />
      </Popup> */}

      <Popup
        title="Send Mail"
        openPopup={openPopupsendMail}
        setOpenPopup={setopenPopupsendMail}
      >
        <CustomerSendMail
          recordForSendMail={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
