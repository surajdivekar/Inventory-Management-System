import React, { useCallback, useEffect, useState } from "react";
import ProductForm from "./ProductForm";

import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Paper from "@mui/material/Paper";
import {
  Checkbox,
  Fade,
  IconButton,
  Tooltip,
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
}));

const headCells = [
  { id: "srno", label: "Sr. No." },
  { id: "id", label: "Item Id" },
  { id: "name", label: "Item Name " },
  { id: "purches_rate", label: "Purches Rate( \u20B9 ) " },
  { id: "selling_rate", label: "Sellig Rate( \u20B9 )" },
  { id: "tax", label: "Tax(%)" },
  { id: "stock_qnt", label: "Stock Quantity" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function ProductList() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);

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
    const data = await allServices.getAllProducts();
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
            x.item_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = async (productData, resetForm) => {
    if (productData.item_id === 0) {
      const res = await allServices.insertProduct(productData);
      setNotify({
        isOpen: true,
        // message: "Submitted Successfully",
        message: res,
        type: "success",
      });
    } else {
      const res = await allServices.updateProduct(productData);
      setNotify({
        isOpen: true,
        message: res,
        type: "success",
      });
    }
    delete selected[0];
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);

    FetchData();
  };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const res = await allServices.deleteProduct(id);
    FetchData();
    setNotify({
      isOpen: true,
      message: res,
      type: "error",
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        title="Product Section"
        subTitle="You want to ADD, UPDATE or DELETE Products"
        icon={<Inventory2Icon fontSize="large" />}
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
            label="Search Products"
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
                  // }}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={item.item_id}
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
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                    }}
                  >
                    {item.item_id}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                    }}
                  >
                    {item.item_name}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                    }}
                  >
                    {item.purchase_rate}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                    }}
                  >
                    {item.selling_rate}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                    }}
                  >
                    {item.tax}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      handleClick(event, item);
                    }}
                  >
                    {item.stock_quantity}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title="Edit Product"
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
                      title="Delete Product"
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
                                onDelete(item.item_id);
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
        title="Product Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
