import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { getQuizInfoById } from "network/networkCalls";
import QuestionsAnswerPanel from "./components/questionsAnswerPanel";
import QuestionsGrid from "./components/questionsGrid";
import { ShowErrorAlert } from "network/errorAlert";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import QuizTimer from "./components/quizTimer";

function AttemptQuiz() {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answerState, setAnswerState] = useState([]);
  const [period, setPeriod] = useState(0);

  const timerRef = useRef(0);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const showError = (msg) => {
    ShowErrorAlert(msg);
  };

  // Get quiz info
  const getQuizData = () => {
    const quizId = localStorage.getItem("selectedId");
    getQuizInfoById(quizId)
      .then((res) => {
        setQuiz(res);
        setQuestions(res.questions);

        const answers = res.questions.map((item) => null);
        setAnswerState(answers);
        getPeriodInMilliseconds(res.timePeriod);
      })
      .catch((err) => {
        showError(err);
      });
  };

  // Get the timeperiod in milliseconds
  const getPeriodInMilliseconds = (period) => {
    const [hour, min] = period.split(":");
    const totMin = min * 60000;
    const totHour = hour * 3600000;

    // setPeriod(totMin + totHour);
    timerRef.current = totMin + totHour;
  };

  const updateCheckedList = (index) => {
    // const curr = [...answerState];
    // curr[index] = true;
    // setAnswerState(curr);
  };

  const timerFinished = () => {
    console.log("in finished");
    showError("Time is up. The quiz will automatically close now");
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                  <QuestionsAnswerPanel
                    quizTitle={quiz.title}
                    description={quiz.description}
                    questionList={questions}
                    updateChecked={updateCheckedList}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox>{/* <QuestionsGrid questions={answerState} /> */}</MDBox>
                  <MDBox>
                    {timerRef.current !== 0 && (
                      <QuizTimer period={timerRef.current} timerFinished={timerFinished} />
                    )}
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      {/* Error alert */}
      <Snackbar open={isError} autoHideDuration={6000} onClose={(e) => setIsError(false)}>
        <Alert
          onClose={(e) => setIsError(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default AttemptQuiz;
