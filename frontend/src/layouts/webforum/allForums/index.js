import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getAllForums } from "network/networkCalls";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import moment from "moment";

// Images
import background1 from "assets/images/bg-profile.jpeg";
import background2 from "assets/images/bg-reset-cover.jpeg";
import background3 from "assets/images/bg-sign-up-cover.jpeg";
import background4 from "assets/images/answers.jpg";

import { useNavigate } from "react-router-dom";

function AllForums() {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();

  //   Get the forum data
  const getForums = () => {
    getAllForums().then((res) => {
      setForums(res);
    });
  };

  //   Get the images for uiType
  const getBackgroundImage = (type) => {
    switch (type) {
      case 0:
        return background1;
      case 1:
        return background2;
      case 2:
        return background3;
      case 4:
        return background4;
      default:
        return background1;
    }
  };

  //   Open forum
  const openForum = (e, id) => {
    e.preventDefault();
    localStorage.setItem("forumId", id);
    navigate("/allWebforumDetails");
  };

  useEffect(() => {
    getForums();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDBox my={1} mx={2}>
            <MDTypography variant="h3" fontWeight="regular">
              WEBFORUMS
            </MDTypography>
          </MDBox>
          <MDBox p={2}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {forums.map((forum, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <DefaultProjectCard
                    image={getBackgroundImage(forum.uiType)}
                    title={forum.title}
                    description={forum.createdBy.name}
                    action={{
                      type: "internal",
                      route: "/attemptedQuizList",
                      color: "info",
                      label: "open",
                      click: (e) => openForum(e, forum._id),
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default AllForums;
