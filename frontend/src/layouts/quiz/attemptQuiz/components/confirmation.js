import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";

function AttemptQuizConfirm(props) {
  const handleClose = () => {
    props.setVisible(false);
  };

  const attemptQuiz = (e) => {
    e.preventDefault();
    props.attemptNow();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.visible}
      onClose={handleClose}
      style={styles.popup}
    >
      <Fade in={props.visible}>
        <MDBox mb={1.5} style={styles.popupContent} px={4} py={4}>
          <MDTypography variant="h4" color="dark">
            {props.quizTitle}
          </MDTypography>
          <MDTypography variant="h8" color="dark">
            {props.description}
          </MDTypography>
          <Divider variant="middle" component="li" />
          <MDTypography variant="h5" color="dark" mb={3}>
            Time given to attempt the quiz - {props.timePeriod}
          </MDTypography>
          <MDAlert color="warning" dismissible>
            <MDTypography variant="body2" color="white">
              Please note that the Quiz will be automatically submitted after the time period is
              reached.
            </MDTypography>
          </MDAlert>
          <Divider variant="middle" component="li" />
          <MDButton color="success" onClick={(e) => attemptQuiz(e)}>
            ATTEMPT NOW
          </MDButton>
        </MDBox>
      </Fade>
    </Modal>
  );
}

const styles = {
  popup: {
    position: "absolute",
    top: "25%",
    left: "25%",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  popupContent: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
};

export default AttemptQuizConfirm;
