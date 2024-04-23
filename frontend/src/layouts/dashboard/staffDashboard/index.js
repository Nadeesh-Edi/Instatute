import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Images
import questions from "assets/images/questions.jpg";
import answers from "assets/images/answers.jpg";

function StaffDashboard() {
  return (
    <MDBox mb={3}>
      <MDBox my={1} mx={2}>
        <MDTypography variant="h3" fontWeight="regular">
          QUIZES
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={questions}
              title="Create Quiz"
              description="Create a new quiz for the students to attempt."
              action={{
                type: "internal",
                route: "/createQuiz",
                color: "info",
                label: "create",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={answers}
              title="My Quizes"
              description="All the attempts and details on all the quizes that you created."
              action={{
                type: "internal",
                route: "/myQuizes",
                color: "info",
                label: "view",
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default StaffDashboard;
