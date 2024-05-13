import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

import PropTypes from "prop-types";

// Images
import background1 from "assets/images/bg-profile.jpeg";
import background2 from "assets/images/bg-reset-cover.jpeg";
import background3 from "assets/images/bg-sign-up-cover.jpeg";
import background4 from "assets/images/answers.jpg";
import moment from "moment";

function Header(props) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [creator, setCreator] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [background, setBackground] = useState("");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(() => {
    switch (props.forum.uiType) {
      case 0:
        setBackground(background1);
        break;
      case 1:
        setBackground(background2);
        break;
      case 2:
        setBackground(background3);
        break;
      case 4:
        setBackground(background4);
        break;
      default:
        setBackground(background1);
        break;
    }
    if (props.forum.createdBy) {
      setCreator(props.forum.createdBy.name);
    }
    if (props.forum.createdAt) {
      setCreatedDate(moment(props.forum.createdAt).format("MMMM Do YYYY"));
    }
  }, [props]);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {props.forum && (
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {props.forum.title}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  {`By ${creator}`}
                </MDTypography>
              </MDBox>
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }} style={{ textAlign: "right" }}>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {`Created on ${createdDate}`}
            </MDTypography>
          </Grid>
        </Grid>
        {props.children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
