import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:9090/api/";
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [show, setShow] = useState(true);
  const [btn, setBtn] = useState(true);

  const [verified, setVerified] = useState(true);

  const [name, setName] = useState("");
  const [shopname, setShopname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [shopphone, setShopphone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [tc, setTc] = useState(false);
  const [emailverifystatus, setEmailverifyStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const actualData = {
      name: name,
      shopname: shopname,
      email: email,
      mobile: mobile,
      shopphone: shopphone,
      address: address,
      password: password,
      password_confirmation: password_confirmation,
      tc: tc,
      emailverifystatus: emailverifystatus,
    };

    if (
      actualData.name &&
      actualData.shopname &&
      actualData.email &&
      actualData.mobile &&
      actualData.shopphone &&
      actualData.address &&
      actualData.password &&
      actualData.password_confirmation !== null &&
      actualData.tc !== false
    ) {
      if (actualData.password === actualData.password_confirmation) {
        if (actualData.emailverifystatus !== true) {
          setError({
            status: true,
            msg: "Please Verify Email",
            type: "error",
          });
        } else {
          axios.post(baseUrl + "loginreg", actualData).then((e) => {
            setError({
              status: true,
              msg: e.data,
              type: "success",
            });
            toast.success(e.data, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            // navigate("/login");

            // if (e.data === "Email Already Exist...") {
            //   setError({
            //     status: true,
            //     msg: e.data,
            //     type: "error",
            //   });
            // } else {
            //   document.getElementById("registration-form").reset();
            //   setError({
            //     status: true,
            //     msg: e.data,
            //     type: "success",
            //   });
            //   // navigate("/login");
            // }
          });
        }
      } else {
        setError({
          status: true,
          msg: "Password and Confirm Password Doesn't Match",
          type: "error",
        });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };

  const ChecKBtn = () => {
    var emailval = document.getElementById("email").value;
    if (emailval === "") {
      setBtn(true);
      setShow(true);
    } else {
      setBtn(false);
    }
  };

  const SendOtp = (e) => {
    var emailval = document.getElementById("email").value;
    var data = {
      email: emailval,
    };
    axios.post(baseUrl + "sendotp", data).then((e) => {
      var data = e.data;
      // alert(data.otp);
      if (data.otp !== "") {
        localStorage.setItem("otp", data.otp);
        toast.success(data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShow(false);
      } else {
        toast.error(data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  };

  const SuccessTost = () => {
    // toast.success("Registration Successfully", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
  };

  const Verify = (e) => {
    e.preventDefault();
    var verifyotp = document.getElementById("verifyotp").value;
    let verify = localStorage.getItem("otp");
    if (verifyotp === verify) {
      localStorage.removeItem("otp");
      setShow(true);
      setEmailverifyStatus(true);
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        // sx={{ mt: 1 }}
        sx={{
          "& .MuiTextField-root": { mt: 1, m: 1, width: "30ch" },
        }}
        id="registration-form"
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        <div>
          <TextField
            margin="normal"
            required
            // id="name"
            // name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
          <TextField
            margin="normal"
            required
            id="shopname"
            value={shopname}
            onChange={(e) => setShopname(e.target.value)}
            label="Shop Name"
          />
        </div>

        <div>
          <TextField
            margin="normal"
            required
            id="shop_phone"
            value={shopphone}
            onChange={(e) => setShopphone(e.target.value)}
            label="Shop Phone"
          />
          <TextField
            margin="normal"
            required
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
          />
        </div>
        <div>
          <TextField
            margin="normal"
            required
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            label="Mobile"
          />
          <TextField
            margin="normal"
            required
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              ChecKBtn();
            }}
            label="Email Address"
            // onChange={ChecKBtn}
          />
        </div>
        <Box textAlign="right">
          {/* <Button
            textAlign="right"
            // type="submit"
            variant="outlined"
            color="success"
            // variant="success"
            sx={{ mr: 4 }}
            hidden={btn}
            onClick={Verify}
          >
            Verify
          </Button> */}
          <Link
            hidden={btn}
            style={{ color: "blue", marginRight: "40px" }}
            onClick={SendOtp}
          >
            Send OTP
          </Link>

          {/* <Button
            textAlign="right"
            type="submit"
            variant="contained"
            color="success"
            sx={{ mr: 5 }}
            style={{
              height: 30,
              width: 120,
              fontSize: 12,
            }}
            hidden={verified}
          >
            &#10003; VERIFIED
          </Button> */}
        </Box>
        <div>
          <TextField
            margin="normal"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
          />

          <TextField
            margin="normal"
            required
            id="password_confirmation"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label="Confirm Password"
            type="password"
          />
        </div>
        <div hidden={show}>
          <TextField
            margin="normal"
            required
            id="verifyotp"
            name="verifyotp"
            label="Enter OTP"
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ ml: 2, mt: 3, mb: 2, px: 5 }}
            onClick={Verify}
          >
            Verify
          </Button>
        </div>

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={tc}
              onChange={(e) => setTc(e.target.checked)}
            />
          }
          label="I agree to term and condition.*"
        />
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
            onClick={handleSubmit}
          >
            Join
          </Button>
        </Box>
        {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""} */}
      </Box>
      <ToastContainer
      // position="top-right"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // theme="dark"
      />
    </>
  );
};

export default Registration;
