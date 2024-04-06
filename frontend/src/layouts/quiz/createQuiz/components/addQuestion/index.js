import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";

function AddQuestion(props) {
  const [questionList, setQuestionList] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [selectableOptions, setSelectableOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClose = () => {
    props.setVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setQuestionList([]);
    setQuestion("");
    setCorrectOption("");
  };

  const generateItem = (item, index) => {
    return (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={(e) => deleteItem(index)}>
            <DeleteIcon color="error" />
          </IconButton>
        }
      >
        <ListItemText primary={`${index + 1}. ${item}`} />
      </ListItem>
    );
  };

  const addNewItem = () => {
    setQuestionList([...questionList, newAnswer]);
    setNewAnswer("");
  };

  const deleteItem = (index) => {
    setQuestionList(
      questionList.slice(0, index).concat(questionList.slice(index + 1, questionList.length))
    );
  };

  const submitQuestion = (e) => {
    e.preventDefault();
    props.addQuestion({
      question: question,
      answers: questionList,
      correct: correctOption - 1,
    });
    resetForm();
  };

  useEffect(() => {
    setIsDisabled(!question || questionList.length < 1 || !correctOption);
  }, [question, questionList, correctOption]);

  useEffect(() => {
    const selectables = questionList.map((item, index) => index + 1);
    setSelectableOptions(selectables);
  }, [questionList]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.visible}
      onClose={handleClose}
      style={style}
    >
      <Fade in={props.visible}>
        <MDBox mx={2} py={3} px={2} variant="gradient" borderRadius="lg" coloredShadow="info">
          <MDTypography variant="h6" color="dark">
            New Question
          </MDTypography>
          <MDBox pt={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Question"
                  fullWidth
                  multiline
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <List>
                  {questionList.map((item, index) => {
                    return generateItem(item, index);
                  })}
                </List>
                <MDBox pt={2}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={10}>
                      <MDInput
                        type="text"
                        label="Answer"
                        fullWidth
                        multiline
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton edge="end" aria-label="add" onClick={(e) => addNewItem()}>
                        <AddCircleRoundedIcon color="success" fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox
                  pt={2}
                  px={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="subtitle2" fontWeight="medium">
                    Correct option
                  </MDTypography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={correctOption}
                    label="Age"
                    onChange={(e) => setCorrectOption(e.target.value)}
                  >
                    {selectableOptions.map((item) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </MDBox>
              </MDBox>
              <MDBox mb={2}>
                <MDButton
                  color="success"
                  type="submit"
                  disabled={isDisabled}
                  onClick={(e) => submitQuestion(e)}
                >
                  ADD
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Fade>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "25%",
  left: "25%",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AddQuestion;
