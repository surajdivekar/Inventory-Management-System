import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// import Customers from "./components/pages/Customers";
// import Items from "./components/pages/Items";
// import Invoices from "./components/pages/Invoices";
// import NewInvoices from "./components/pages/NewInvoices";
// import PayInvoice from "./components/pages/PayInvoice";
// import ViewInvoice from "./components/pages/ViewInvoice";

//This is route define
import LoginReg from "../components/loginPages/auth/LoginReg";
// import ResetPassword from "../components/loginPages/auth/ResetPassword";
// import SendPasswordResetEmail from "../components/loginPages/auth/SendPasswordResetEmail";
import Contact from "../components/loginPages/Contact";

import Home from "../components/loginPages/Home";
import Layout from "../components/loginPages/Layout";
// import { useEffect, useState } from "react";
// import SideDrawer from "../components/sidebar/SideDrawer";

import SideMenu from "../components/sidebar/SideMenu";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

import { CssBaseline, createMuiTheme, makeStyles } from "@material-ui/core";
import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import ProductList from "../pages/productlist/ProductList";
import Invoices from "../pages/invoices/Invoices";
import NewInvoice from "../pages/invoices/NewInvoice";
import ViewInvoice from "../pages/invoices/ViewInvoice";
import PayInvoice from "../pages/invoices/PayInvoice";
import CustomerWiseInvoices from "../pages/invoices/CustomerWiseInvoices";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#bc63ff",
      // main: "#f83245",
      // light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

// const theme = createTheme({
//   palette: {
//     background: {
//       default: "#f4f5fd",
//     },
//     text: {
//       default: "#000",
//     },
//     primary: {
//       main: "#333996",
//       light: "#3c44b126",
//     },
//     // secondary: {
//     //   main: "#f83245",
//     //   light: "#f8324526",
//     // },
//     props: {
//       MuiIconButton: {
//         disableRipple: true,
//       },
//     },
//   },
// });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginReg />} />
          {/* <Route
            path="sendpasswordresetemail"
            element={<SendPasswordResetEmail />}
          />
          <Route path="reset" element={<ResetPassword />} /> */}
        </Route>

        <Route path="sidebar" element={<SideMenu />}>
          {/* <Route path="*" element={<h1>Error 404 Page not found !!</h1>} /> */}
          <Route index element={<Dashboard />} />
          <Route index path="/sidebar/dashboard" element={<Dashboard />} />
          <Route path="/sidebar/customers" element={<Customers />} />
          <Route path="/sidebar/products" element={<ProductList />} />
          <Route path="/sidebar/invoices" element={<Invoices />} />
          <Route
            idex
            path="/sidebar/customerwiseinvoices/:customer_id"
            element={<CustomerWiseInvoices />}
          />
          <Route path="/sidebar/newinvoices" element={<NewInvoice />} />
          <Route path="viewinvoice/:invoice_id" element={<ViewInvoice />} />
          <Route path="payinvoice/:invoice_id" element={<PayInvoice />} />
        </Route>
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
