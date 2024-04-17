import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";

function QuestionsGrid(props) {
  const [isLastMin, setIsLAstMin] = useState(false);

  const completed = () => {
    props.timerFinished();
  };

  const onTimeChange = (e) => {
    // if (e.total < 60000) {
    //   setIsLAstMin(true);
    // }
  };

  return (
    <MDBox>
      <Card>
        <MDBox px={2} py={2}>
          <Grid container spacing={3}>
            {props.questions.map((item, index) => {
              return (
                <Grid key={index} item xs={3} md={3} lg={3}>
                  <div style={item ? styles.numberAnswered : styles.numberUnAnswered}>{index}</div>
                </Grid>
              );
            })}
          </Grid>
        </MDBox>
      </Card>

      {props.period != 0 && (
        <Card style={{ marginTop: 20 }}>
          <MDBox px={2} py={1} style={styles.timer}>
            <Countdown
              date={Date.now() + props.period}
              onComplete={completed}
              onTick={onTimeChange}
              autoStart
            />
          </MDBox>
        </Card>
      )}
    </MDBox>
  );
}

const styles = {
  numberAnswered: {
    backgroundColor: "#0265b1",
    color: "#FFFFFF",
    textAlign: "center",
    borderRadius: 15,
    padding: "15px 5px",
  },
  numberUnAnswered: {
    backgroundColor: "#9fa6b7",
    color: "#000000",
    textAlign: "center",
    borderRadius: 15,
    padding: "15px 5px",
  },
  timer: {
    backgroundColor: "#da70d6",
    textAlign: "center",
    color: "#000000",
    borderRadius: 15,
  },
  timerLast: {
    backgroundColor: "#e12c2c",
    textAlign: "center",
    color: "#000000",
    borderRadius: 15,
  },
};

export default QuestionsGrid;
