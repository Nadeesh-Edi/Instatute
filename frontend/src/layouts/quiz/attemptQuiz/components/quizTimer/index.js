import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

function QuizTimer(props) {
  const [timerTime, setTimerTime] = useState(0);
  const completed = () => {
    props.timerFinished();
  };

  const onTimeChange = (e) => {
    // if (e.total < 60000) {
    //   setIsLAstMin(true);
    // }
  };

  useEffect(() => {
    console.log("period", props.period);
    setTimerTime(props.period);
  }, [props.period]);

  return (
    <MDBox>
      {timerTime != 0 && (
        <Card style={{ marginTop: 20 }}>
          <MDBox px={2} py={1} style={styles.timer}>
            <Countdown
              date={Date.now() + timerTime}
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

export default QuizTimer;
