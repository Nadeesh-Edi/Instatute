// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import quizTableData from "./data/newQuizData";
import AttemptQuizConfirm from "../attemptQuiz/components/confirmation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewQuizList() {
  const [showQuizConfirm, setShowQuizConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [row, setRow] = useState({});
  const navigate = useNavigate();

  const openQuiz = (row) => {
    setRow(row);
    setSelectedId(row._id);
    setShowQuizConfirm(true);
  };

  const attemptQuiz = () => {
    localStorage.setItem("selectedId", selectedId);
    navigate("/attemptQuiz");
  };

  const { columns, rows } = quizTableData({ openFunc: openQuiz });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  NEW QUIZ LIST
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Confirm to attempt the quiz */}
      <AttemptQuizConfirm
        visible={showQuizConfirm}
        setVisible={setShowQuizConfirm}
        quizTitle={row.title}
        description={row.description}
        timePeriod={row.timePeriod}
        attemptNow={attemptQuiz}
      />
    </DashboardLayout>
  );
}

export default NewQuizList;
