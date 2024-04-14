import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { getQuizInfoById } from "network/networkCalls";
import QuestionsAnswerPanel from "./components/questionsAnswerPanel";
import QuestionsGrid from "./components/questionsGrid";
import { useEffect, useState } from "react";

function AttemptQuiz() {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answerState, setAnswerState] = useState([]);

  const showErrorAlert = (msg) => {
    alert(msg);
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
      })
      .catch((err) => {
        showErrorAlert(err);
      });
  };

  const updateCheckedList = (index) => {
    const curr = [...answerState];
    curr[index] = true;
    setAnswerState(curr);
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
                  <QuestionsGrid questions={answerState} />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AttemptQuiz;
