import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Images
import questions from "assets/images/questions.jpg";
import answers from "assets/images/answers.jpg";
import webforums from "assets/images/bg-profile.jpeg";

import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  // Create quiz clicked
  const quizClicked = (e) => {
    e.preventDefault();
    navigate("/newQuizList");
  };

  // Attempted quizes clicked
  const attemptedQuizClicked = (e) => {
    e.preventDefault();
    navigate("/attemptedQuizList");
  };

  // Webforums clicked
  const webforumsClicked = (e) => {
    e.preventDefault();
    navigate("/allWebforums");
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
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={questions}
              title="New Quizes"
              description="All the active quizes that you have not yet attempted."
              action={{
                type: "internal",
                route: "/newQuizList",
                color: "info",
                label: "View",
                click: quizClicked,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={answers}
              title="Attempted Quizes"
              description="All the quizes that you have attempted with its details and your score."
              action={{
                type: "internal",
                route: "/attemptedQuizList",
                color: "info",
                label: "view",
                click: attemptedQuizClicked,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={webforums}
              title="Webforums"
              description="Webforums that you can read and get extra knowledge."
              action={{
                type: "internal",
                route: "/allWebforums",
                color: "info",
                label: "view",
                click: webforumsClicked,
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default StudentDashboard;
