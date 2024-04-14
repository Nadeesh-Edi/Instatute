import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

function QuestionsAnswerPanel(props) {
  const [answers, setAnswers] = useState([]);

  const handleRadio = (e, questionIndex) => {
    e.preventDefault();
    const current = answers;
    current[questionIndex] = e.target.value;
    setAnswers(current);
    props.updateChecked(questionIndex);
  };

  useEffect(() => {
    if (props.questionList.length) {
      const formattedAnswers = props.questionList.map((item) => null);
      setAnswers(formattedAnswers);
    }
  }, [props]);

  return (
    <MDBox>
      <Card mb={2} style={styles.card}>
        <MDBox px={2} py={2}>
          <MDTypography variant="h5" gutterBottom>
            {props.quizTitle}
          </MDTypography>
          <MDTypography variant="h7" gutterBottom>
            {props.description}
          </MDTypography>
        </MDBox>
      </Card>
      {props.questionList.map((element, questionIndex) => {
        return (
          <Card key={questionIndex} mb={2} style={styles.card}>
            <MDBox px={2} py={2}>
              <MDTypography variant="h7" gutterBottom mb={1}>
                {element.question}
              </MDTypography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(e) => handleRadio(e, questionIndex)}
              >
                {element.answers.map((item, index) => {
                  return (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={item} />
                  );
                })}
              </RadioGroup>
            </MDBox>
          </Card>
        );
      })}
    </MDBox>
  );
}

const styles = {
  card: {
    marginBottom: 20,
  },
};

export default QuestionsAnswerPanel;
