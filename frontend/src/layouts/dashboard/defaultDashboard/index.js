import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Images
import loginImg from "assets/images/bg-sign-in-basic.jpg";
import registerImg from "assets/images/signup-cover.jpg";
import webforums from "assets/images/bg-profile.jpeg";

import { useNavigate } from "react-router-dom";

function DefaultDashboard() {
  const navigate = useNavigate();

  // Login clicked
  const loginClicked = (e) => {
    e.preventDefault();
    navigate("/authentication/sign-in");
  };

  // Register clicked
  const registerClicked = (e) => {
    e.preventDefault();
    navigate("/authentication/sign-up");
  };

  return (
    <MDBox mb={3}>
      <MDBox my={1} mx={2}>
        <MDTypography variant="h3" fontWeight="regular">
          QUIZES
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={6}>
            <DefaultProjectCard
              image={loginImg}
              title="Sign-in"
              description="Sign-in to the system and use."
              action={{
                type: "internal",
                route: "/authentication/sign-in",
                color: "info",
                label: "View",
                click: loginClicked,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <DefaultProjectCard
              image={registerImg}
              title="Register"
              description="Register to the system either as a Student or Staff"
              action={{
                type: "internal",
                route: "/authentication/sign-up",
                color: "info",
                label: "view",
                click: registerClicked,
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default DefaultDashboard;
