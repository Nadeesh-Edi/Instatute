import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { getAttemptDetails } from "network/networkCalls";
import { useSelector, useDispatch } from "react-redux";
import MDTypography from "components/MDTypography";
import Loading from "network/loading";

function AttemptDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const selectedQuiz = localStorage.getItem("selectedId");

  const getDetails = () => {
    getAttemptDetails(selectedQuiz).then((res) => {
      setDetails(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card mb={2} style={loading ? styles.loading : styles.card}>
              {loading && <Loading />}
              {!loading && (
                <Grid container spacing={6}>
                  <Grid item sm={6}>
                    <MDBox pt={6} pb={3} px={5}>
                      <MDTypography variant="h3" gutterBottom>
                        {details.quiz.title}
                      </MDTypography>
                      <MDTypography variant="h3" gutterBottom>
                        {details.quiz.description}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item sm={6}>
                    <MDBox pt={6} pb={3} px={5} style={styles.score}>
                      <MDTypography variant="h3" gutterBottom>
                        SCORE :&nbsp;&nbsp;&nbsp;&nbsp;
                      </MDTypography>
                      <MDTypography variant="h1" color="error" gutterBottom>
                        {details.score} %
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

const styles = {
  card: {
    marginBottom: 20,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  score: {
    display: "flex",
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

export default AttemptDetails;
