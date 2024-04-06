// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AddQuestion from "./components/addQuestion";
import { useEffect, useState } from "react";

function CreateQuiz() {
  const [addQuestion, setAddQuestion] = useState(false);
  const [questionsList, setFullQuestionList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [period, setPeriod] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const addNewQuestion = (question) => {
    const newList = [...questionsList, question];
    setFullQuestionList(newList);
    setAddQuestion(false);
  };

  const renderQuestion = (item, index) => {
    return (
      <ListItem key={index} style={style}>
        <ListItemText primary={`${index + 1}. ${item.question}`} />
      </ListItem>
    );
  };

  const submitQuiz = (e) => {
    e.preventDefault();
    const params = {
      title,
      description,
      deadline,
      timePeriod: period,
      questions: questionsList.map((item) => {
        return {
          question: item.question,
          answers: item.answers,
          correctAnswerIndex: item.correct,
        };
      }),
    };

    console.log("params", params);
  };

  useEffect(() => {
    setIsDisabled(!title || !description || !deadline || !period || questionsList.length < 1);
  }, [title, description, deadline, period, questionsList]);

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
                  Create New Quiz
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Quiz Title"
                      fullWidth
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Quiz Description"
                      fullWidth
                      multiline
                      onChange={(e) => setDiscription(e.target.value)}
                    />
                  </MDBox>

                  <Grid container spacing={6}>
                    <Grid item xs={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="date"
                          label="Quiz Deadline"
                          fullWidth
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="time"
                          label="Attemptable time"
                          fullWidth
                          onChange={(e) => setPeriod(e.target.value)}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                pt={2}
                px={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="dark">
                  Questions
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={() => setAddQuestion(true)}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new question
                </MDButton>
              </MDBox>
              <MDBox pt={2} px={3}>
                <List>
                  {questionsList.map((item, index) => {
                    return renderQuestion(item, index);
                  })}
                </List>
              </MDBox>
            </Card>
            <MDBox my={5}>
              <MDButton
                color="success"
                type="submit"
                disabled={isDisabled}
                onClick={(e) => submitQuiz(e)}
              >
                SAVE
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <AddQuestion visible={addQuestion} setVisible={setAddQuestion} addQuestion={addNewQuestion} />
    </DashboardLayout>
  );
}

const style = {
  backgroundColor: "#b1b1ff9c",
  borderRadius: "10px",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "7px",
  paddingBottom: "7px",
  cursor: "pointer",
  marginBottom: 15,
};

export default CreateQuiz;
