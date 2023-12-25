import React, { useState, useEffect } from "react";
import { Box, Grid, Hidden, TextField, makeStyles } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as customerServices from "../../services/allServices";

import SendIcon from "@mui/icons-material/Send";

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

const initialFValues = {
  item_id: 0,
  item_name: "",
  purchase_rate: "",
  selling_rate: "",
  tax: "",
  stock_quantity: "",
};
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function ProductForm(props) {
  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props;
  const [status, setStatus] = useState(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setStatus(!status);
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="item_name"
            label="Item Name"
            value={values.item_name}
            onChange={handleInputChange}
            error={errors.item_name}
          />
          <Controls.Input
            name="purchase_rate"
            label="Purches Rate"
            value={values.purchase_rate}
            onChange={handleInputChange}
            error={errors.purchase_rate}
          />
          <Controls.Input
            label="Selling Rate"
            name="selling_rate"
            value={values.selling_rate}
            onChange={handleInputChange}
            error={errors.selling_rate}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Tax"
            name="tax"
            value={values.tax}
            onChange={handleInputChange}
            error={errors.tax}
          />
          <Controls.Input
            label="Stock Quantity"
            name="stock_quantity"
            value={values.stock_quantity}
            onChange={handleInputChange}
            error={errors.stock_quantity}
          />
          <div>
            {status ? (
              <Controls.Button type="submit" text="Submit" hidden={status} />
            ) : (
              <Controls.Button type="submit" text="Update" hidden={status} />
            )}
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
