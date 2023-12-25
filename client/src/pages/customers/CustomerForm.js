import React, { useState, useEffect } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
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
  customer_id: 0,
  customer_name: "",
  email: "",
  mobile: "",
  city: "",
  // gender: "male",
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function CustomerForm(props) {
  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props;
  const [status, setStatus] = useState(true);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("customer_name" in fieldValues)
      temp.customer_name = fieldValues.customer_name
        ? ""
        : "This field is required.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    // if ("departmentId" in fieldValues)
    //   temp.departmentId =
    //     fieldValues.departmentId.length != 0 ? "" : "This field is required.";
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
      // customerServices.insertCustomer(values);
      addOrEdit(values, resetForm);
      // console.log(values);
      // resetForm();
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
            name="customer_name"
            label="Full Name"
            value={values.customer_name}
            onChange={handleInputChange}
            error={errors.customer_name}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
          />
          {/* <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          /> */}

          {/* <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          /> */}
          {/* <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          /> */}
          {/* <Controls.Checkbox
            name="isPermanent"
            label="Term and Conditios *"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}

          <div>
            {status ? (
              <Controls.Button type="submit" text="Submit" hidden={status} />
            ) : (
              <Controls.Button type="submit" text="Update" hidden={status} />
            )}
            {/* <Controls.Button type="submit" text="Submit" hidden={status} />*/}

            <Controls.Button text="Reset" color="default" onClick={resetForm} />

            {/* <Button
              size="large"
              color="primary"
              variant="contained"
              sx={{
                ...(!status && { display: "none" }),
              }}
              classes={{ root: classes.root, label: classes.label }}
            >
              Submit
            </Button>

            <Button
              size="large"
              color="warning"
              variant="contained"
              sx={{
                ...(!status && { display: "none" }),
              }}
              classes={{ root: classes.root, label: classes.label }}
            >
              Update
            </Button> */}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export function CustomerSendMail(props) {
  const initialFValues = {
    id: 0,
    to: "",
    subject: "",
    text: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // if ("customer_name" in fieldValues)
    //   temp.customer_name = fieldValues.customer_name
    //     ? ""
    //     : "This field is required.";
    // if ("city" in fieldValues)
    //   temp.city = fieldValues.city ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const recordForSendMail = props.recordForSendMail;
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);
  };
  const [emailvalues, setEmailValues] = useState([]);
  useEffect(() => {
    if (recordForSendMail != null);
    setEmailValues(recordForSendMail);
    // setValues()
  }, [recordForSendMail]);
  return (
    <Form onSubmit={handleSubmit}>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="to"
              label="To"
              value={emailvalues}
              rows={4}
              disabled

              // onChange={handleInputChange}
              // error={errors.customer_name}
            />
            <Controls.Input
              label="Subject"
              name="subject"
              value={values.subject}
              onChange={handleInputChange}
              // error={errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="Text"
              name="text"
              value={values.text}
              onChange={handleInputChange}
              rows={4}
              // error={errors.mobile}
            />
            <Grid>
              <Box sx={{ m: 1 }}>
                <Controls.Button
                  type="submit"
                  text="Send"
                  startIcon={<SendIcon />}
                />

                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
}
