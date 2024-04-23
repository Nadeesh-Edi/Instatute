/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { useAlert } from "react-alert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/signup-cover.jpg";
import { useState } from "react";
import { Grid } from "@mui/material";
import { register } from "network/networkCalls";

function Cover() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(null);
  const [role, setRole] = useState("");
  const [password, setPassowrd] = useState("");
  const [rePassword, setRepassowrd] = useState("");
  const [sex, setSex] = useState("");
  const [type, setType] = useState(null);

  const alert = useAlert();
  const navigate = useNavigate();

  const handleGender = (e) => {
    setSex(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const submit = (e) => {
    // e.preventDefault();
    if (name && email && age && role && password && rePassword && sex && type) {
      if (password !== rePassword) {
        e.preventDefault();
        alert.error("Password and Confirm password must be the same");
      } else {
        e.preventDefault();
        registerUser();
      }
    }
  };

  const registerUser = () => {
    const params = {
      name,
      email,
      password,
      role,
      age,
      sex,
      user_type: type,
    };
    register(params).then((res) => {
      alert.success("Successfully registered", {
        onClose: () => {
          navigate("/authentication/sign-in");
        },
      });
    });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ maxHeight: "70vh" }}>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            SIGN-UP
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} sx={{ overflowY: "auto" }}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Age"
                variant="standard"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Role"
                variant="standard"
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassowrd(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                value={rePassword}
                onChange={(e) => setRepassowrd(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2} sx={{ borderBottom: "1px solid #00000020" }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    Gender
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sex}
                    label="Gender"
                    onChange={handleGender}
                    sx={{ width: "100%", textAlign: "center" }}
                    required
                  >
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="O">Other</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mb={2} sx={{ borderBottom: "1px solid #00000020" }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    User Type
                  </MDTypography>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Gender"
                    onChange={handleType}
                    sx={{ width: "100%", textAlign: "center" }}
                    required
                  >
                    <MenuItem value={2}>Student</MenuItem>
                    <MenuItem value={1}>Staff</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </MDBox>
            {/* <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              orientation="horizontal"
              onChange={(e) => handleGender(e, questionIndex)}
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="O" control={<Radio />} label="Other" />
            </RadioGroup> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" onClick={submit} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
