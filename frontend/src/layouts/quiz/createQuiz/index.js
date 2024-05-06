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
import { createQuiz } from "network/networkCalls";
import { ShowErrorAlert, ShowSuccessAlert } from "network/errorAlert";

import Alert from "@mui/material/Alert";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function CreateQuiz() {
  const [addQuestion, setAddQuestion] = useState(false);
  const [questionsList, setFullQuestionList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [period, setPeriod] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [hours, setHours] = useState(null);
  const [mins, setMins] = useState(null);
  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const navigate = useNavigate();

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
      timePeriod: `${hours ? hours.padStart(2, "0") : "00"}:${mins ? mins.padStart(2, "0") : "00"}`,
      questions: questionsList.map((item) => {
        return {
          question: item.question,
          answers: item.answers,
          correctAnswerIndex: item.correct,
        };
      }),
    };

    createQuiz(params)
      .then((res) => {
        alert.success("Successfully created", {
          onClose: () => {
            navigate("/myQuizes");
          },
        });
      })
      .catch((err) => {
        alert.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // const day = moment().format();
    const day = new Date();
    console.log(day);
    setDeadline(day);
  }, []);

  useEffect(() => {
    setIsDisabled(
      !title || !description || !deadline || questionsList.length < 1 || (!mins && !hours)
    );
  }, [title, description, deadline, hours, mins, questionsList]);

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
                    <Grid item sm={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="date"
                          label="Quiz Deadline"
                          fullWidth
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>

                  <MDBox mb={2}>
                    <Grid container spacing={6}>
                      <Grid item sm={4} xs={12}>
                        <MDTypography variant="body2" color="text">
                          Attemptable time&nbsp;&nbsp;&nbsp;&nbsp;:
                        </MDTypography>
                      </Grid>
                      <Grid item sm={4} xs={6}>
                        <MDInput
                          type="number"
                          label="Hours"
                          fullWidth
                          onChange={(e) => setHours(e.target.value)}
                        />
                      </Grid>
                      <Grid item sm={4} xs={6}>
                        <MDInput
                          type="number"
                          label="Minutes"
                          fullWidth
                          onChange={(e) => setMins(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
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
